import { LeadHero } from "@/components/dumb/lead/lead-hero";
import LeadForm from "@/components/widgets/lead-form";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-auto">
      <LeadHero />
      <LeadForm />
    </div>
  );
}
