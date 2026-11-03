export default function SkeletonGrid({ n = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton h-40 w-full" />)}
    </div>
  );
}