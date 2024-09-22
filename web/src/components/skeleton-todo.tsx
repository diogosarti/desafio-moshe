import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTodo() {
  return (
    <div className="mx-4 text-zinc-100 flex flex-col mt-10 gap-4 justify-center items-center">
      <div className="container max-w-3xl border border-zinc-600/10 rounded-lg p-5">
        <Skeleton className="h-5 w-20 mb-3 flex items-start" />
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
