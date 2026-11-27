interface Deliverable {
  title: string;
  description: string;
}

interface DeliverablesSectionProps {
  title: string;
  items: Deliverable[];
}

export default function DeliverablesSection({ title, items }: DeliverablesSectionProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-10 font-inter">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {items.map((item) => (
          <div key={item.title} className="border-t border-slate-200 pt-5">
            <h3 className="text-[17px] font-medium text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm md:text-base font-light text-slate-500 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
