
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import RoomTimer from "@/components/RoomTimer";
import UserAvatar from "@/components/UserAvatar";
import ChatMessage from "@/components/ChatMessage";
import { generateIdentity, getCrypticPhrase } from "@/utils/generateIdentity";

interface Message {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: number;
}

interface Participant {
  id: string;
  username: string;
  avatar: string;
  speaking: boolean;
}

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [identity, setIdentity] = useState(() => generateIdentity());
  const [micActive, setMicActive] = useState(false);
  const [crypticPhrase] = useState(() => getCrypticPhrase());

  // Initialize the room
  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }

    // Show welcome toast
    toast({
      title: "Sala temporária",
      description: "Esta sala expira em 1 hora. Sem histórico. Sem rastros.",
    });

    // Simulate some initial participants (will be replaced with actual WebRTC connections)
    const initialParticipants = [
      {
        id: "system",
        username: "Sistema",
        avatar: "🔒🔍🌐",
        speaking: false
      },
      {
        id: "user",
        username: identity.username,
        avatar: identity.avatar,
        speaking: false
      },
    ];
    setParticipants(initialParticipants);

    // Add system welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      username: "Sistema",
      avatar: "🔒🔍🌐",
      message: `Sala criada. ${crypticPhrase}`,
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);

    // Simulate random speaking patterns (for demo)
    const speakingInterval = setInterval(() => {
      if (participants.length > 1) {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setParticipants(prev => 
          prev.map((p, i) => ({
            ...p,
            speaking: i === randomIndex && Math.random() > 0.7
          }))
        );
      }
    }, 2000);

    return () => {
      clearInterval(speakingInterval);
    };
  }, [roomId, navigate, toast, identity, crypticPhrase]);

  // Handle message sending
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      username: identity.username,
      avatar: identity.avatar,
      message: message.trim(),
      timestamp: Date.now(),
    };

    // Add to messages, but limit to 30 most recent
    setMessages(prev => [...prev, newMessage].slice(-30));
    setMessage("");
  };

  const toggleMicrophone = () => {
    setMicActive(!micActive);
    
    // Update local participant's speaking state
    setParticipants(prev =>
      prev.map(p => 
        p.id === "user" ? { ...p, speaking: !micActive } : p
      )
    );
  };

  const exitRoom = () => {
    if (window.confirm("Sair da sala? Você não poderá retornar com o mesmo avatar.")) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-reioo-dark text-white p-4 flex flex-col">
      {/* Room header */}
      <div className="flex justify-between items-center mb-6 border-b border-reioo-gray/20 pb-4">
        <div>
          <h1 className="text-xl font-bold glitch-text">SALA: {roomId}</h1>
          <RoomTimer expiryTime={3600} onExpire={() => navigate("/")} />
        </div>
        <button onClick={exitRoom} className="btn-danger">
          SAIR
        </button>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 gap-4 h-[calc(100vh-160px)] flex-col md:flex-row">
        {/* Chat section */}
        <div className="w-full md:w-1/2 chat-area overflow-y-auto flex flex-col">
          <h2 className="text-sm uppercase tracking-wider text-reioo-gray mb-4">CHAT</h2>
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {messages.map((msg) => (
              <ChatMessage 
                key={msg.id} 
                avatar={msg.avatar} 
                username={msg.username} 
                message={msg.message} 
                timestamp={msg.timestamp}
              />
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-reioo-gray/20">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite e pressione Enter..."
                className="flex-1 bg-reioo-darker border border-reioo-gray/30 p-2 rounded-l font-mono text-sm"
                maxLength={100}
              />
              <button 
                type="submit" 
                className="bg-reioo-purple px-4 rounded-r border border-reioo-purple"
              >
                ENVIAR
              </button>
            </form>
          </div>
        </div>

        {/* Voice section */}
        <div className="w-full md:w-1/2 voice-area flex flex-col">
          <h2 className="text-sm uppercase tracking-wider text-reioo-gray mb-4">VOZ</h2>
          <div className="flex-1 flex flex-wrap gap-6 items-center justify-center">
            {participants.map((participant) => (
              <UserAvatar 
                key={participant.id}
                avatar={participant.avatar}
                username={participant.username}
                speaking={participant.speaking}
                size="lg"
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <button 
              onClick={toggleMicrophone} 
              className={micActive ? "btn-danger" : "btn-primary"}
            >
              {micActive ? "DESATIVAR MICROFONE" : "ATIVAR MICROFONE"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-reioo-gray italic">
        "{crypticPhrase}"
      </div>
    </div>
  );
};

export default Room;
