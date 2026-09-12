export function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      {action}
    </div>
  );
}