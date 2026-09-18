import type {
  ServiceItem,
  TabType,
} from "./home-services.data";

import ServiceCard from "./ServiceCard";

type ServicesListProps = {
  items: ServiceItem[];
  type: TabType;
};

export default function ServicesList({
  items,
  type,
}: ServicesListProps) {
  return (
    <div className="relative w-dyn-list">
      <div
        data-items={type}
        role="list"
        className="home-services_items w-dyn-items"
      >
        {items.map((item) => (
          <ServiceCard
            key={`${type}-${item.id}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}