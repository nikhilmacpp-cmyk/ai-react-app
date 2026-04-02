import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

const handleSend = async () => {
  if (!input.trim()) return;

  const newMessages: Message[] = [
    ...messages,
    { role: "user", content: input }
  ];

  setMessages(newMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: input
      })
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      {
        role: "assistant",  // ✅ must match type
        content: data.data || data.res
      }
    ]);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Chat</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.role === "user"
                ? styles.userMessage
                : styles.botMessage)
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && <div style={styles.botMessage}>Typing...</div>}
      </div>

      <div style={styles.inputContainer}>
        <input
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={styles.input}
        />

        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial"
  },
  title: {
    textAlign: "center",
    padding: "15px",
    borderBottom: "1px solid #1e293b"
  },
  chatBox: {
    flex: 1,
    padding: "20px",
    overflowY: "auto"
  },
  message: {
    maxWidth: "70%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    lineHeight: "1.4"
  },
  userMessage: {
    background: "#3b82f6",
    alignSelf: "flex-end",
    marginLeft: "auto"
  },
  botMessage: {
    background: "#1e293b",
    alignSelf: "flex-start"
  },
  inputContainer: {
    display: "flex",
    padding: "15px",
    borderTop: "1px solid #1e293b",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px"
  },
  button: {
    padding: "12px 20px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  }
};