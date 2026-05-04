type ConversationListSkeletonProps = {
  count?: number;
};

const ConversationListSkeleton = ({
  count = 6,
}: ConversationListSkeletonProps) => (
  <ul
    className="flex-1 animate-pulse overflow-y-auto px-2 pb-4"
    aria-busy="true"
    aria-label="Loading conversations"
  >
    {Array.from({ length: count }).map((_, i) => (
      <li
        key={i}
        className="flex items-center gap-3 rounded-lg px-2.5 py-2.5"
      >
        <div className="bg-soft-2 h-10 w-10 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="bg-soft-2 h-3 w-2/5 rounded" />
            <div className="bg-soft h-2.5 w-10 rounded" />
          </div>
          <div className="bg-soft h-3 w-3/4 rounded" />
        </div>
      </li>
    ))}
  </ul>
);

export default ConversationListSkeleton;
