import Modal from "@/components/shared/Modal";
import { threads } from "@/components/threads";
import useAuth from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PiGearFine, PiSignOut } from "react-icons/pi";
import ConversationListSkeleton from "./ConversationListSkeleton";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

type Props = {
  hasOpenThread: boolean;
};

const ChatUIWrapper = ({ hasOpenThread }: Props) => {
  const { logout, user, isLoading } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoadingThreads(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside
      className={`border-line bg-surface flex flex-col border-r ${
        hasOpenThread ? "hidden lg:flex" : "flex"
      }`}
    >
      <header className="flex items-center justify-between px-4 pt-5 pb-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-ink h-7 w-7 rounded-full" aria-hidden />
          <span className="text-base font-semibold tracking-tight">Sealed</span>
        </Link>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="hover:bg-soft text-muted hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
          aria-label="Logout"
        >
          <PiSignOut color="red" />
        </button>
      </header>

      <div className="px-4 pb-3">
        <div className="bg-soft flex items-center gap-2 rounded-lg px-3 py-2">
          <CiSearch />
          <input
            type="search"
            placeholder="Search"
            className="placeholder:text-faint w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {isLoadingThreads ? (
        <ConversationListSkeleton />
      ) : (
        <ul className="flex-1 overflow-y-auto px-2 pb-4">
          {threads.map((t) => (
            <li key={t.id}>
            <Link
              to="/chat/$friend_id"
              params={{ friend_id: t.id }}
              activeProps={{ className: "bg-soft" }}
              inactiveProps={{ className: "hover:bg-soft" }}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors"
            >
              <div className="relative shrink-0">
                <div className="bg-soft-2 grid h-10 w-10 place-items-center rounded-full">
                  <span className="text-ink text-sm font-medium">
                    {initials(t.name)}
                  </span>
                </div>
                {t.online && (
                  <span
                    className="bg-online border-surface absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2"
                    aria-label="online"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-ink truncate text-[15px] font-medium tracking-tight">
                    {t.name}
                  </h3>
                  <span className="text-faint shrink-0 text-xs">{t.time}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p
                    className={`truncate text-sm ${
                      t.unread > 0 ? "text-ink font-medium" : "text-muted"
                    }`}
                  >
                    {t.excerpt}
                  </p>
                  {t.unread > 0 && (
                    <span className="bg-ink text-page inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1.5 text-[11px] font-medium">
                      {t.unread}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
        </ul>
      )}

      <footer className="border-line flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-soft-2 grid h-8 w-8 place-items-center rounded-full">
            <span className="text-ink text-xs font-medium">
              {initials(user!.display_name)}
            </span>
          </div>
          <span className="text-ink text-sm font-medium">{user?.username}</span>
        </div>
        <button
          className="hover:bg-soft text-muted hover:text-ink grid h-8 w-8 place-items-center rounded-full transition-colors"
          aria-label="Settings"
          title="Settings"
        >
          <PiGearFine />
        </button>
      </footer>
      <Modal
        isLoading={isLoading === "logout"}
        isOpen={isLogoutModalOpen}
        confirmCb={async () => await logout()}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Are you sure you want to logout"
      />
    </aside>
  );
};

export default ChatUIWrapper;
