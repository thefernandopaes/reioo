import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Generate a random 4-character room code
  const generateRoomCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Create a new room and navigate to it
  const createRoom = () => {
    const roomId = generateRoomCode();
    navigate(`/room/${roomId}`);
  };

  // Join an existing room
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.length >= 4) {
      navigate(`/room/${roomCode.toLowerCase()}`);
    }
  };

  // Toggle background audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  // Random cryptic phrases
  const crypticPhrases = [
    "Onde o silêncio pesa mais que o texto.",
    "A conversa é temporária. O silêncio é permanente.",
    "Entre, fale, desapareça.",
    "Sem histórico. Sem rastros.",
    "Reioo não grava. Você também não deveria."
  ];

  const randomPhrase = crypticPhrases[Math.floor(Math.random() * crypticPhrases.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-reioo-dark text-white p-4">
      <header className="mb-12 text-center">
        <h1 className="text-6xl font-bold mb-2 glitch-text">REIOO</h1>
        <p className="text-reioo-gray">{randomPhrase}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl px-4">
        <div className="bg-reioo-darker rounded border border-reioo-purple/20 p-6 md:p-8 flex flex-col items-center">
          <h2 className="text-xl mb-4 md:mb-6 text-reioo-purple">CRIAR SALA</h2>
          <p className="text-reioo-gray text-sm mb-6 text-center">
            Sala expira em 1h. Máximo 5 pessoas. Sem histórico.
          </p>
          <button onClick={createRoom} className="btn-primary w-full md:w-auto">
            CRIAR SALA
          </button>
        </div>

        <div className="bg-reioo-darker rounded border border-reioo-purple/20 p-6 md:p-8">
          <h2 className="text-xl mb-4 md:mb-6 text-reioo-purple text-center">ENTRAR COM CÓDIGO</h2>
          {!isJoining ? (
            <button onClick={() => setIsJoining(true)} className="btn-secondary w-full">
              TENHO UM CÓDIGO
            </button>
          ) : (
            <form onSubmit={joinRoom} className="flex flex-col">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Digite o código"
                className="bg-reioo-dark border border-reioo-gray/30 p-3 rounded font-mono mb-4"
                maxLength={10}
                autoFocus
              />
              <button type="submit" className="btn-primary">
                ENTRAR
              </button>
              <button 
                type="button" 
                onClick={() => setIsJoining(false)} 
                className="text-reioo-gray text-xs mt-2 underline hover:text-reioo-purple"
              >
                Voltar
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={toggleAudio} 
          className="text-reioo-gray text-xs underline hover:text-reioo-purple transition-colors"
        >
          {audioEnabled ? "Desativar som ambiente" : "Ativar som ambiente"}
        </button>
      </div>

      <footer className="mt-16 text-reioo-gray/50 text-xs">
        <p>Sem login. Sem conta. Sem senha. Entrou, usou, sumiu.</p>
      </footer>
    </div>
  );
};

export default Index;
