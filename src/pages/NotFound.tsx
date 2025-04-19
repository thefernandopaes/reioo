import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCrypticPhrase } from "@/utils/generateIdentity";

const NotFound = () => {
  const location = useLocation();
  const crypticPhrase = getCrypticPhrase();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-reioo-dark text-white p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4 glitch-text">404</h1>
        <p className="text-xl text-reioo-purple mb-8">Essa sala não existe.</p>
        <p className="text-reioo-gray/60 mb-8 text-sm max-w-sm mx-auto">
          "{crypticPhrase}"
        </p>
        <Link to="/" className="btn-primary inline-block">
          VOLTAR
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
