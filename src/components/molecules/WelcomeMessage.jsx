import { useState, useEffect } from "react";

const WelcomeMessage = () => {
  const [userData, setUserData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserData(user);
      setShowMessage(true);
      
      const timer = setTimeout(() => {
        setShowMessage(false);
        localStorage.removeItem("currentUser");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showMessage || !userData) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-fade-in-centered">
      <div className="bg-green-500/90 backdrop-blur-md border border-green-400/50 rounded-xl shadow-2xl shadow-green-400/20 p-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white font-[Orbitron]">
              ¡Bienvenido de vuelta!
            </h3>
            <p className="text-green-200 font-[Roboto] text-sm">
              Hola <span className="font-semibold text-green-300">{userData.fullName}</span>, 
              es genial verte de nuevo en Level-UP Gamers.
            </p>
          </div>
          <button
            onClick={() => {
              setShowMessage(false);
              localStorage.removeItem("currentUser");
            }}
            className="flex-shrink-0 text-green-400 hover:text-green-300 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
