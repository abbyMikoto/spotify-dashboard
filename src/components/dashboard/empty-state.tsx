export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
