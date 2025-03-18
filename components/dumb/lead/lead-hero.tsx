import Image from "next/image";

export const LeadHero = () => (
  <div className="bg-[#D4DB95] py-32 relative overflow-hidden max-md:py-20 px-4">
    <Image
      className="absolute top-0 -left-[350px] z-0 h-full w-auto max-md:w-full max-md:h-auto"
      src="/flower.webp"
      width={1024}
      height={1024}
      alt="Alma"
    />

    <div className="mx-auto max-w-4xl z-10 relative">
      <div className="text-3xl font-semibold mb-8">almā</div>
      <h1 className="text-7xl max-md:text-5xl font-bold">
        Get An Assessment
        <br />
        Of Your Immigration Case
      </h1>
    </div>
  </div>
);
