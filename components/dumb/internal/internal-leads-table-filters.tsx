"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Lead } from "@/api/entities/lead";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface InternalLeadsTableFiltersProps {
  search?: string;
  status?: Lead["status"];
  onSearchChange?: (search: string) => void;
  onStatusChange?: (status: Lead["status"] | undefined) => void;
}

export const InternalLeadsTableFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: InternalLeadsTableFiltersProps) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearch !== search) {
        onSearchChange?.(debouncedSearch || "");
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearch, search, onSearchChange]);

  return (
    <div className="flex gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10 w-auto"
          defaultValue={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
        />
      </div>
      <Select
        defaultValue="ALL"
        value={status}
        onValueChange={(value) =>
          onStatusChange?.(
            value !== "ALL" ? (value as Lead["status"]) : undefined
          )
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="REACHED_OUT">Reached Out</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
