export default function PageHeader({
  title,
  subtitle,
  pill,
}: {
  title: string;
  subtitle?: string;
  pill?: string;
}) {
  return (
    <section className="bg-[#f3f4f5] pt-16 md:pt-20 pb-12 md:pb-16 font-['Manrope']">
      <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-left">
        {pill && (
          <span className="inline-block px-4 py-1 bg-[#006b5d] text-white rounded-full text-sm font-semibold mb-4">
            {pill}
          </span>
        )}
        <h1 className="text-4xl md:text-[48px] leading-[1.15] font-extrabold text-[#191c1d] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-[#434655] mt-4 max-w-2xl">{subtitle}</p>
        )}
        <div className="w-16 h-1 bg-[#0045bc] mt-6 rounded-full" />
      </div>
    </section>
  );
}
