import { Skeleton } from "@/components/ui/skeleton"

export const SessionItemSkeleton = () => {
  return (
    <li className="overflow-hidden rounded-md border odd:border-l-4 odd:border-l-primary odd:bg-white even:bg-gray-50">
      <div className="flex h-full w-full flex-col p-2">
        {/* Top Section */}
        <div className="flex flex-row items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" /> {/* title */}
            <Skeleton className="h-4 w-28" /> {/* date */}
          </div>
          <Skeleton className="h-6 w-20" /> {/* total */}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-row">
          <div className="mt-2 flex items-center gap-2 rounded bg-gray-200 px-2 py-1">
            <Skeleton className="h-3 w-3 rounded-full" /> {/* icon */}
            <Skeleton className="h-3 w-24" /> {/* text */}
          </div>
        </div>
      </div>
    </li>
  )
}
