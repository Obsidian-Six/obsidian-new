#!/usr/bin/env bash
# One-time setup on the server. Run from the project folder:
#   bash deploy/install-auto-deploy.sh
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT="$REPO_DIR/deploy/auto-deploy.sh"
LOG=/var/log/obsidian-deploy.log

chmod +x "$SCRIPT"
touch "$LOG"

# Make sure the server follows the main branch.
cd "$REPO_DIR"
git fetch --quiet origin main
git checkout --quiet main

# Blog automation key: created on the server, never shown in chat or stored in git.
if [ -f Backend/.env ] && ! grep -q '^BLOG_API_KEY=' Backend/.env; then
  echo "BLOG_API_KEY=$(openssl rand -hex 32)" >> Backend/.env
  echo "Added BLOG_API_KEY to Backend/.env"
fi

# Run every 2 minutes. Replaces any older line for this script.
# (crontab -l fails when root has no crontab yet, so ignore its exit code.)
EXISTING="$(crontab -l 2>/dev/null | grep -v 'deploy/auto-deploy.sh' || true)"
printf '%s\n%s\n' "$EXISTING" "*/2 * * * * $SCRIPT >> $LOG 2>&1" | sed '/^$/d' | crontab -

# Keep the log small.
if [ -d /etc/logrotate.d ] && [ -w /etc/logrotate.d ]; then
  cat > /etc/logrotate.d/obsidian-deploy <<ROT
$LOG {
  weekly
  rotate 4
  compress
  missingok
  notifempty
}
ROT
fi

echo "Auto-deploy installed. Cron entry:"
crontab -l | grep auto-deploy
echo "Run a first deploy now with: $SCRIPT --force"
