"use client";
import { useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useLeads } from "@/data/use-leads";
import { Lead } from "@/api/entities/lead";
import { InternalLeadsTableFilters } from "../dumb/internal/internal-leads-table-filters";
import { InternalLeadsTablePagination } from "../dumb/internal/internal-leads-table-pagination";
import { Button } from "../ui/button";
import { useMarkLeadReached } from "@/data/use-mark-lead-reached";

const columns = [
  { key: "name", title: "Name" },
  { key: "submitted", title: "Submitted" },
  { key: "status", title: "Status" },
  { key: "country", title: "Country" },
  { key: "actions", title: "Actions" },
];

const formatStatus = (status: Lead["status"] = "PENDING") => {
  return status.slice(0, 1) + status.slice(1).toLowerCase().replace("_", " ");
};

const formatCreatedAt = (createdAt: Lead["createdAt"]) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(String(createdAt)));
};

export const InternalLeadsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Lead["status"]>();

  const {
    data: leads,
    hasNextPage,
    hasPreviousPage,
    isPending,
  } = useLeads({ status, search });

  const { mutate: markLeadReached, isPending: isMarking } =
    useMarkLeadReached();

  return (
    <div>
      <InternalLeadsTableFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      <div className="border rounded-lg overflow-auto">
        <div className="grid grid-cols-5 border-b">
          {columns.map((column) => (
            <div key={column.key} className="p-4 font-medium flex items-center">
              {column.title}
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
          ))}
        </div>

        {isPending && <Loader2 className="w-8 h-8 animate-spin mx-auto my-4" />}

        {leads?.pages[currentPage - 1].leads.map((lead) => (
          <div
            key={lead.id}
            className="grid grid-cols-5 border-b overflow-auto"
          >
            <div className="p-4">
              {lead.firstName} {lead.lastName}
            </div>
            <div className="p-4">{formatCreatedAt(lead.createdAt)}</div>
            <div className="p-4">{formatStatus(lead.status)}</div>
            <div className="p-4">{lead.country}</div>
            <div className="p-4">
              <Button
                onClick={() => markLeadReached(lead.id)}
                disabled={lead.status === "REACHED_OUT" || isMarking}
              >
                Reached
              </Button>
            </div>
          </div>
        ))}

        <InternalLeadsTablePagination
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
