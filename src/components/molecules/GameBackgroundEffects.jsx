const GameBackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0 bg-black"></div>

      <div className="absolute top-20 left-4 w-16 h-16 border-2 border-green-400/60 rotate-45 animate-pulse"></div>
      <div className="absolute top-40 right-4 w-12 h-12 border-2 border-blue-400/70 rotate-12 animate-bounce"></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-green-500/50 rotate-45 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 right-1/4 w-14 h-14 border-2 border-blue-500/60 rotate-12 animate-bounce delay-500"></div>
      <div className="absolute top-1/2 left-4 w-10 h-10 border-2 border-green-400/70 rotate-45 animate-pulse delay-2000"></div>

      <div className="absolute top-32 right-1/4 text-4xl text-green-400/30 font-bold rotate-12 animate-pulse">
        X
      </div>
      <div className="absolute bottom-40 left-1/3 text-3xl text-blue-400/35 font-bold -rotate-12 animate-bounce delay-1000">
        X
      </div>
      <div className="absolute top-1/3 right-4 text-2xl text-green-500/25 font-bold rotate-45 animate-pulse delay-1500">
        X
      </div>
      <div className="absolute bottom-1/4 right-1/2 text-3xl text-blue-500/20 font-bold -rotate-12 animate-bounce delay-3000">
        X
      </div>

      <div className="absolute top-1/4 left-1/4 w-24 h-0.5 bg-gradient-to-r from-green-400/50 to-transparent rotate-12"></div>
      <div className="absolute bottom-1/3 right-1/4 w-20 h-0.5 bg-gradient-to-l from-blue-400/50 to-transparent -rotate-12"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-0.5 bg-gradient-to-r from-green-500/40 to-transparent rotate-45"></div>

      <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-green-500 rounded-full animate-ping delay-2000"></div>
    </>
  );
};

export default GameBackgroundEffects;
