'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const InternalSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-72 p-6 flex flex-col border-r border-gray-200 max-md:hidden">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">almă</h1>
      </div>
      <nav className="space-y-4 flex-1 flex flex-col">
        <Link
          href="/internal"
          className={cn(
            "font-medium text-lg",
            pathname === "/internal" && "font-bold"
          )}
        >
          Leads
        </Link>
        <Link href="#" className="font-medium text-lg">
          Settings
        </Link>
      </nav>
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="font-semibold">A</span>
        </div>
        <span className="font-semibold">Admin</span>
      </div>
    </div>
  );
};
