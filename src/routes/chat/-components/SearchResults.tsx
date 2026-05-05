import { initials } from "@/lib/utils";
import type { UserSearchResult } from "@/types/messages";

type Props = {
  openThread: (result: UserSearchResult) => void;
  searchResults: UserSearchResult[];
};

const SearchResults = ({ openThread, searchResults }: Props) => (
  <ul className="flex-1 overflow-y-auto px-2 py-2">
    {searchResults.map((r) => (
      <li key={r.id}>
        <button
          type="button"
          onClick={() => openThread(r)}
          className="hover:bg-soft flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition-colors"
        >
          <div className="bg-soft-2 grid h-9 w-9 shrink-0 place-items-center rounded-full">
            <span className="text-ink text-[11px] font-medium tracking-wide">
              {initials(r.display_name)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-ink truncate text-[14.5px] font-medium tracking-tight">
              {r.display_name}
            </h3>
            <p className="text-muted mt-0.5 truncate text-xs">@{r.username}</p>
          </div>
        </button>
      </li>
    ))}
  </ul>
);

export default SearchResults;
