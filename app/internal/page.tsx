import { InternalLeadsTable } from "@/components/widgets/internal-leads-table";

export default function Internal() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      <InternalLeadsTable />
    </div>
  );
}
