import Image from "next/image";
import type { ServiceItem } from "./home-services.data";
import ServiceButton from "./ServiceButton";
import Link from "next/link";
import Button from "../common/Button";

type ServiceCardProps = {
  item: ServiceItem;
};

export default function ServiceCard({ item }: ServiceCardProps) {
  return (
    <div role="listitem" className="service-sticky w-dyn-item">
      <div
        data-wf--home-services_item--variant="base"
        className="home-services_item"
      >
        <div className="line-2 is-darker" />

        <div className="home-services_item-in">
          <div className="home-services_examples">
            <div className="home-services_item-head">
              <div className="home-services_number">
                <div>{item.number}</div>
              </div>

              <h2 className="home-services_title">{item.title}</h2>
            </div>

            <div className="home-services_services">
              <div className="tag-text w-richtext">
                {item.tags.map((tag) => (
                  <p key={tag.href}>
                    <Link href={tag.href} className="service-tag-link">
                      {tag.label}
                    </Link>
                  </p>
                ))}
              </div>
            </div>

            <div className="service-button_desktop">
              {item.href && (
                <Button
                  hlink={item.href}
                  text="Show more"
                  textColor="white"
                  borderColor="white"
                  hoverBgColor=""
                  hoverTextColor="hover:text-white"
                />
              )}
            </div>
          </div>

          <div className="home-services_desc">
            {/* Image + Video clickable area */}
            {item.href ? (
              <Link
                href={item.href}
                className="group relative block overflow-hidden"
                aria-label={`View ${item.title}`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="home-services_img"
                />

                {item.video && (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="metadata"
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      opacity-0
                      transition-opacity
                      duration-700
                      ease-in-out
                      group-hover:opacity-100
                    "
                  />
                )}
              </Link>
            ) : (
              <div className="group relative block overflow-hidden">
                <Image
                  width={1000}
                  height={1000}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="home-services_img"
                />

                {item.video && (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="metadata"
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      opacity-0
                      transition-opacity
                      duration-700
                      ease-in-out
                      group-hover:opacity-100
                    "
                  />
                )}
              </div>
            )}

            <div className="home-services_text-wrap">
              <p className="text-color-grey-300-2">{item.description}</p>
            </div>
          </div>

          <div className="service-button_mobile">
            {item.href && <ServiceButton href={item.href} mobile />}
          </div>
        </div>
      </div>
    </div>
  );
}
