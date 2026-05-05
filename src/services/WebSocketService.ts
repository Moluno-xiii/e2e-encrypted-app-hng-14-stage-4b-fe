import endpoints from "@/constants/endpoints";
import authServiceInstance from "@/services/AuthService";
import type { MessagePayload, WSServerEvent } from "@/types/messages";

type ServerEventName = WSServerEvent["event"];
type EventListener<E extends ServerEventName> = (
  event: Extract<WSServerEvent, { event: E }>,
) => void;
type AnyListener = (event: WSServerEvent) => void;

const RECONNECT_BASE_MS = 1000;
const RECONNECT_MAX_MS = 30_000;
const NORMAL_CLOSURE = 1000;
const CLOSE_TOKEN_EXPIRED = 4001;
const CLOSE_TOKEN_INVALID = 4003;

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners = new Map<ServerEventName, Set<AnyListener>>();
  private reconnectAttempts = 0;
  private intentionalClose = false;
  private reconnectTimer: number | null = null;

  constructor() {}

  connect(token: string): void {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) return;
    this.intentionalClose = false;
    this.clearReconnectTimer();

    const url = `${endpoints.ws}?token=${encodeURIComponent(token)}`;
    const socket = new WebSocket(url);
    this.socket = socket;

    socket.onopen = () => {
      this.reconnectAttempts = 0;
    };
    socket.onmessage = (e) => this.handleMessage(e);
    socket.onclose = (e) => this.handleClose(socket, e);
    socket.onerror = (e) => console.error("WS error", e);
  }

  disconnect(): void {
    this.intentionalClose = true;
    this.clearReconnectTimer();
    if (this.socket) {
      this.socket.close(NORMAL_CLOSURE);
      this.socket = null;
    }
  }

  sendMessage(to: string, payload: MessagePayload): void {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket not connected");
    }
    this.socket.send(JSON.stringify({ event: "message.send", to, payload }));
  }

  on<E extends ServerEventName>(event: E, cb: EventListener<E>): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(cb as AnyListener);
  }

  off<E extends ServerEventName>(event: E, cb: EventListener<E>): void {
    this.listeners.get(event)?.delete(cb as AnyListener);
  }

  private handleMessage(e: MessageEvent): void {
    let parsed: WSServerEvent;
    try {
      parsed = JSON.parse(e.data) as WSServerEvent;
    } catch {
      console.error("WS bad frame", e.data);
      return;
    }
    const ls = this.listeners.get(parsed.event);
    if (!ls) return;
    for (const l of ls) l(parsed);
  }

  private async handleClose(socket: WebSocket, e: CloseEvent): Promise<void> {
    if (this.socket !== socket) return;
    this.socket = null;
    if (this.intentionalClose) return;

    if (e.code === CLOSE_TOKEN_EXPIRED) {
      const refresh = await authServiceInstance.refreshToken();
      if (!refresh.success || !refresh.data) {
        authServiceInstance.removeAuthTokens();
        return;
      }
      authServiceInstance.setAuthTokens({
        access_token: refresh.data.access_token,
        refresh_token: authServiceInstance.getTokens().refresh_token,
      });
      this.connect(refresh.data.access_token);
      return;
    }

    if (e.code === CLOSE_TOKEN_INVALID) {
      authServiceInstance.removeAuthTokens();
      return;
    }

    this.scheduleReconnect();
  }

  private scheduleReconnect(): void {
    const delay = Math.min(
      RECONNECT_BASE_MS * 2 ** this.reconnectAttempts,
      RECONNECT_MAX_MS,
    );
    this.reconnectAttempts += 1;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      const token = authServiceInstance.getTokens().access_token;
      if (!token) return;
      this.connect(token);
    }, delay);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

const webSocketServiceInstance = new WebSocketService();
export default webSocketServiceInstance;
