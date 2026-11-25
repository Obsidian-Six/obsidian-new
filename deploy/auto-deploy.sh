#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Obsidian Six auto-deploy
#
# Runs every 2 minutes from cron on the server. When the `main` branch on
# GitHub has a new commit, it pulls it, builds the new images, swaps the
# containers and checks the site is up. If the build or the health check
# fails, the previous version keeps running (or is restored).
#
# Manual run:   ./deploy/auto-deploy.sh            (deploy if there is a new commit)
#               ./deploy/auto-deploy.sh --force    (rebuild even without a new commit)
# Log:          /var/log/obsidian-deploy.log
# ---------------------------------------------------------------------------
set -uo pipefail

main() {

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-main}"
SITE_URL="${SITE_URL:-https://obsidiansix.com/}"
API_HEALTH_URL="${API_HEALTH_URL:-https://api.obsidiansix.com/api/health}"
FRONT_IMAGE="obsidian-app:v1"
BACK_IMAGE="obsidian-backend:v1"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

# Only one deploy at a time.
exec 9>/tmp/obsidian-deploy.lock
flock -n 9 || exit 0

cd "$REPO_DIR" || exit 1

git fetch --quiet origin "$BRANCH" || { log "ERROR: git fetch failed"; exit 1; }
OLD="$(git rev-parse HEAD)"
NEW="$(git rev-parse "origin/$BRANCH")"

if [ "$OLD" = "$NEW" ] && [ "${1:-}" != "--force" ]; then
  exit 0
fi

log "Deploying ${OLD:0:7} -> ${NEW:0:7} ($(git log -1 --format=%s "$NEW"))"

if ! git diff --quiet || ! git diff --cached --quiet; then
  log "ERROR: files were edited directly on the server. Not deploying. Run 'git status' in $REPO_DIR."
  exit 1
fi

CHANGED="$(git diff --name-only "$OLD" "$NEW")"
CHANGED_POSTS="$(echo "$CHANGED" | grep -E '^content/blogs/.+\.md$' || true)"

git checkout --quiet "$BRANCH" && git merge --quiet --ff-only "origin/$BRANCH" || {
  log "ERROR: could not fast-forward to origin/$BRANCH"; exit 1; }

sync_posts() {
  [ -z "$CHANGED_POSTS" ] && return 0
  local files=()
  while IFS= read -r f; do [ -f "$f" ] && files+=("$f"); done <<< "$CHANGED_POSTS"
  [ "${#files[@]}" -eq 0 ] && return 0
  if python3 deploy/sync-blogs.py "${files[@]}"; then
    log "OK: synced ${#files[@]} blog post(s) to the CMS."
  else
    log "ERROR: blog sync failed. See the lines above."
  fi
}

# Only blog content changed: no rebuild needed, just push the posts into the CMS.
if [ "${1:-}" != "--force" ] && [ -n "$CHANGED" ] && ! echo "$CHANGED" | grep -qv '^content/'; then
  sync_posts
  log "OK: ${NEW:0:7} content update applied (no rebuild)."
  exit 0
fi

export GIT_COMMIT="${NEW:0:7}"

# Keep the running images so we can roll back in seconds.
docker image inspect "$FRONT_IMAGE" >/dev/null 2>&1 && docker tag "$FRONT_IMAGE" obsidian-app:previous
docker image inspect "$BACK_IMAGE"  >/dev/null 2>&1 && docker tag "$BACK_IMAGE"  obsidian-backend:previous

# 1. Build. The old containers keep serving the site while this runs.
if ! docker compose build; then
  log "ERROR: build failed. The site is still running the previous version."
  git reset --quiet --hard "$OLD"
  exit 1
fi

# 2. Swap containers.
docker compose up -d --remove-orphans

# 3. Health check (up to ~2 minutes).
healthy=0
for _ in $(seq 1 24); do
  sleep 5
  if curl -fsS --max-time 10 -o /dev/null "$SITE_URL" && curl -fsS --max-time 10 -o /dev/null "$API_HEALTH_URL"; then
    healthy=1; break
  fi
done

if [ "$healthy" -ne 1 ]; then
  log "ERROR: health check failed after deploy. Rolling back to ${OLD:0:7}."
  docker image inspect obsidian-app:previous >/dev/null 2>&1 && docker tag obsidian-app:previous "$FRONT_IMAGE"
  docker image inspect obsidian-backend:previous >/dev/null 2>&1 && docker tag obsidian-backend:previous "$BACK_IMAGE"
  git reset --quiet --hard "$OLD"
  GIT_COMMIT="${OLD:0:7}" docker compose up -d --no-build --remove-orphans
  exit 1
fi

docker image prune -f >/dev/null 2>&1
log "OK: ${NEW:0:7} is live."
sync_posts
}

main "$@"
