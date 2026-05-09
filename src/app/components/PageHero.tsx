interface PageHeroProps {
  title: string;
  subtitle?: string;
  bottomColor?: string;
}

export default function PageHero({ title, subtitle, bottomColor = '#f3f4f6' }: PageHeroProps) {
  return (
    <section className="relative bg-[#21211f] pt-24 pb-40 px-8 md:px-16 text-center overflow-hidden">
      {/* Large faded background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.03] tracking-tighter whitespace-nowrap uppercase leading-none">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {subtitle && (
          <p className="text-orange-500 font-barlow font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider font-barlow uppercase text-white leading-none">
          {title}
        </h1>
        <div className="mt-6 mx-auto w-24 h-1 bg-orange-500 rounded-full" />
      </div>

      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none translate-y-[99%] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1440 100" preserveAspectRatio="none" className="block w-full h-[50px] md:h-[80px] lg:h-[100px]">
          <path fill={bottomColor} fillOpacity="1" d="M0,260L480,230L960,270L1440,240L1440,320L0,320Z" />
        </svg>
      </div>
    </section>
  );
}
