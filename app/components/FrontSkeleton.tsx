export function FrontSkeleton() {
  return (
    <div className="flex flex-col gap-5 w-screen min-h-screen items-center dark:bg-black animate-pulse">
      <div className="w-full flex items-center justify-between px-8 py-4">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded-md" />
        <div className="flex gap-6">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
        <div className="h-9 w-9 bg-gray-200 dark:bg-gray-800 rounded-full" />
      </div>
      <div className="w-full px-8">
        <div className="h-64 w-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>

      <div className="flex flex-col gap-25 w-full px-8">
        <Section
          label="Coming Soon"
          cardHeight="h-52"
          cardWidth="w-36"
          count={6}
        />
        <Section label="Popular" cardHeight="h-64" cardWidth="w-44" count={5} />
        <Section
          label="Top Rated"
          cardHeight="h-52"
          cardWidth="w-36"
          count={6}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-3 py-8 mt-auto">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="flex gap-4">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );
}
function Section({
  label,
  cardHeight,
  cardWidth,
  count,
}: {
  label: string;
  cardHeight: string;
  cardWidth: string;
  count: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-6 w-36 bg-gray-200 dark:bg-gray-800 rounded" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`shrink-0 ${cardWidth} flex flex-col gap-2`}>
            <div
              className={`${cardHeight} ${cardWidth} bg-gray-200 dark:bg-gray-800 rounded-lg`}
            />
            <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-3 w-3/5 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
