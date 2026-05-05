import ProtectedRoute from "@/components/shared/ProtectedRoute";
import useReceiveMessages from "@/hooks/useReceiveMessages";
import useWebSocket from "@/hooks/useWebSocket";
import {
  createFileRoute,
  Outlet,
  useChildMatches,
} from "@tanstack/react-router";
import ChatUIWrapper from "./-components/ChatUIWrapper";
import { FiMessageSquare } from "react-icons/fi";

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
                <div className="border-line text-muted mx-auto mb-6 grid h-12 w-12 place-items-center rounded-md border">
                  <FiMessageSquare size={20} />
                </div>
                <p className="label-mono">whisperbox · idle</p>
                <h2 className="mt-3 text-xl font-medium tracking-[-0.015em]">
                  Pick a conversation.
                </h2>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  Choose someone from the list — or search to start a new
                  thread.
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
