
import { useState } from "react";

// This is a placeholder for the admin page
// In a real implementation, this would connect to Firebase/Supabase
// and display actual analytics data

type RoomStats = {
  date: string;
  roomsCreated: number;
  avgSessionTime: number;
  maxUsers: number;
};

const Admin = () => {
  const [stats] = useState<RoomStats[]>([
    {
      date: "2025-04-19",
      roomsCreated: 24,
      avgSessionTime: 32,
      maxUsers: 15,
    },
    {
      date: "2025-04-18",
      roomsCreated: 18,
      avgSessionTime: 28,
      maxUsers: 12,
    },
    {
      date: "2025-04-17",
      roomsCreated: 22,
      avgSessionTime: 35,
      maxUsers: 20,
    },
  ]);

  return (
    <div className="min-h-screen bg-reioo-dark text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 glitch-text">REIOO ADMIN</h1>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-reioo-darker p-4 rounded border border-reioo-gray/20">
            <h3 className="text-reioo-gray mb-2 text-sm">SALAS CRIADAS HOJE</h3>
            <p className="text-3xl font-bold text-reioo-purple">{stats[0].roomsCreated}</p>
          </div>
          <div className="bg-reioo-darker p-4 rounded border border-reioo-gray/20">
            <h3 className="text-reioo-gray mb-2 text-sm">TEMPO MÉDIO (MIN)</h3>
            <p className="text-3xl font-bold text-reioo-purple">{stats[0].avgSessionTime}</p>
          </div>
          <div className="bg-reioo-darker p-4 rounded border border-reioo-gray/20">
            <h3 className="text-reioo-gray mb-2 text-sm">USUÁRIOS SIMULTÂNEOS</h3>
            <p className="text-3xl font-bold text-reioo-purple">{stats[0].maxUsers}</p>
          </div>
        </div>

        <div className="bg-reioo-darker p-4 rounded border border-reioo-gray/20">
          <h2 className="text-xl mb-4">Histórico</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-reioo-gray/20">
                  <th className="text-left py-2 px-4">Data</th>
                  <th className="text-left py-2 px-4">Salas Criadas</th>
                  <th className="text-left py-2 px-4">Tempo Médio (min)</th>
                  <th className="text-left py-2 px-4">Máx. Usuários</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((day, i) => (
                  <tr key={i} className="border-b border-reioo-gray/10 hover:bg-reioo-dark/50">
                    <td className="py-2 px-4">{day.date}</td>
                    <td className="py-2 px-4">{day.roomsCreated}</td>
                    <td className="py-2 px-4">{day.avgSessionTime}</td>
                    <td className="py-2 px-4">{day.maxUsers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-center text-reioo-gray/50 text-sm">
          "Quem fala demais, trava."
        </p>
      </div>
    </div>
  );
};

export default Admin;
