export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-black text-white py-16 text-center">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm md:text-base text-gray-400">{subtitle}</p>}
        <div className="w-12 h-0.5 bg-white mx-auto mt-6" />
      </div>
    </section>
  );
}
