import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SERVICE_BUTTON_CLASSES = {
  desktop: {
    button: "button w-inline-block",
    inner: "button-in",
    texts: "button_texts",
    text: "button_text",
  },

  mobile: {
    button:
      "button w-variant-9cb96ae5-a355-784d-c2ef-0196f705ac57 w-inline-block",

    inner:
      "button-in w-variant-9cb96ae5-a355-784d-c2ef-0196f705ac57",

    texts:
      "button_texts w-variant-9cb96ae5-a355-784d-c2ef-0196f705ac57",

    text:
      "button_text w-variant-9cb96ae5-a355-784d-c2ef-0196f705ac57",
  },
} as const;

type ServiceButtonProps = {
  href: string;
  mobile?: boolean;
};

export default function ServiceButton({
  href,
  mobile = false,
}: ServiceButtonProps) {
  const classes = mobile
    ? SERVICE_BUTTON_CLASSES.mobile
    : SERVICE_BUTTON_CLASSES.desktop;

  return (
    <Link
      href={href}
      className={`
        ${classes.button}
        group
      `}
      data-wf--button--variant={
        mobile ? "medium-light" : "small-light"
      }
    >
      <div className={classes.inner}>
        <div className={classes.texts}>
          <div className={`${classes.text} _1`}>
            Show more
          </div>

          <div
            aria-hidden="true"
            className={`${classes.text} _2`}
          >
            Show more
          </div>
        </div>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="
            ml-3
            flex
           
            shrink-0
            items-center
            justify-center
            overflow-hidden
            
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:translate-x-1
            group-hover:rotate-[-8deg]
          "
        >
          <ArrowUpRight
            size={24}
            strokeWidth={2}
            className="
              transition-transform
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:translate-x-[2px]
              group-hover:-translate-y-[2px]
            "
          />
        </span>

        <div className="button_glow-wrap">
          <div className="button_glow" />
        </div>
      </div>
    </Link>
  );
}