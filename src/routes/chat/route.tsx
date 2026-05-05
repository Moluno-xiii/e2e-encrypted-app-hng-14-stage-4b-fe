import ProtectedRoute from "@/components/shared/ProtectedRoute";
import useReceiveMessages from "@/hooks/useReceiveMessages";
import useWebSocket from "@/hooks/useWebSocket";
import {
  createFileRoute,
  Outlet,
  useChildMatches,
} from "@tanstack/react-router";
import ChatUIWrapper from "./-components/ChatUIWrapper";

const RouteComponent = () => {
  const childMatches = useChildMatches();
  const hasOpenThread: boolean = childMatches.length > 0;
  useWebSocket();
  useReceiveMessages();

  return (
    <ProtectedRoute>
      <div className="bg-page text-ink grid h-dvh w-full grid-cols-1 grid-rows-[1fr] overflow-hidden lg:grid-cols-[340px_minmax(0,1fr)]">
        <ChatUIWrapper hasOpenThread={hasOpenThread} />
        <section
          className={`flex min-h-0 min-w-0 flex-col ${
            hasOpenThread ? "flex" : "hidden lg:flex"
          }`}
        >
          {hasOpenThread ? (
            <Outlet />
          ) : (
            <div className="flex flex-1 items-center justify-center px-6">
              <div className="max-w-sm text-center">
                <div className="bg-soft mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Select a conversation
                </h2>
                <p className="text-muted mt-1.5 text-sm leading-relaxed">
                  Choose someone from the list, or start a new chat to begin.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
};

export const Route = createFileRoute("/chat")({
  component: RouteComponent,
});
