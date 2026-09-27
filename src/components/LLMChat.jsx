import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import config from "../config";

const LLM_API_URL = config.llmApiUrl || 'http://127.0.0.1:8000/api/chat/';

const getResponseText = (payload) => {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return "";

  const directKeys = ["message", "reply", "response", "answer", "text"];
  for (const key of directKeys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  if (Array.isArray(payload.messages)) {
    return payload.messages
      .map((entry) => {
        if (typeof entry === "string") return entry;
        if (entry && typeof entry === "object") {
          return getResponseText(entry);
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  }

  if (payload.data && typeof payload.data === "object") {
    return getResponseText(payload.data) || JSON.stringify(payload.data);
  }

  return JSON.stringify(payload);
};

const formatBotText = (text) =>
  String(text || "").replace(/<br\s*\/?>(\s*)/gi, "\n");

const LLMChat = forwardRef(function LLMChat(_, ref) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const submitMessage = useCallback(
    async (text) => {
      const trimmed = String(text || "").trim();
      if (!trimmed || isSending) return;

      const userMessage = { sender: "user", text: trimmed };
      setChatLog((prev) => [...prev, userMessage]);
      setMessage("");
      setError("");
      setIsSending(true);

      try {
        const response = await axios.post(
          LLM_API_URL,
          {
            message: trimmed,
            website_urls: config.CHAT_WEBSITE_REF_URLS,
          },
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        const replyText =
          getResponseText(response?.data) || "No response received yet.";

        setChatLog((prev) => [...prev, { sender: "bot", text: replyText }]);
      } catch (err) {
        const serverMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Something went wrong while sending the message.";

        setError(serverMessage);
        setChatLog((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I couldn't get a response." },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [isSending],
  );

  const submitPrompt = useCallback(
    async (text) => {
      const trimmed = String(text || "").trim();
      if (!trimmed) return;

      setMessage(trimmed);
      inputRef.current?.focus();
      await submitMessage(trimmed);
    },
    [submitMessage],
  );

  useImperativeHandle(
    ref,
    () => ({
      submitPrompt,
      focusInput: () => inputRef.current?.focus(),
      setDraft: (nextValue) => setMessage(String(nextValue || "")),
    }),
    [submitPrompt],
  );

  const sendMessage = async (event) => {
    event.preventDefault();
    void submitMessage(message);
  };

  return (
    <div className="frm quote llm-chat">
      <div id="llm-chat" className="llm-chat__log" aria-live="polite">
        {chatLog.length === 0 && (
          <div className="llm-chat__empty">Ask anything about me</div>
        )}

        {chatLog.map((entry, index) => (
          <div key={`${entry.sender}-${index}`}>
            <div
              className={`llm-chat__bubble llm-chat__bubble--${entry.sender}`}
            >
              {entry.sender === "bot" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formatBotText(entry.text)}
                </ReactMarkdown>
              ) : (
                entry.text
              )}
            </div>
            {entry.sender === "bot" && (
              <hr className="llm-chat__divider" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <form className="rw" onSubmit={sendMessage}>
        <div className="input-row">
          <i className="icon-ai-chat animate-rotation" aria-hidden="true"></i>
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            name="hello"
            id="llm-chat-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ask anything..."
          />
        </div>
      </form>

      {error && <div className="llm-chat__error">{error}</div>}
    </div>
  );
});

export default LLMChat;
