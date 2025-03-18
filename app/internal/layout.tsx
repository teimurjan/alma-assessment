import { InternalSidebar } from "@/components/widgets/internal-sidebar";

export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen overflow-hidden relative">
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,0,0.6), transparent 60%)",
        }}
      />

      <InternalSidebar />
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
}
