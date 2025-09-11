import GameBackgroundEffects from "../visualeffects/GameBackgroundEffects";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "CASO CURIOSO #1",
      description:
        "Descubre cómo un gamer chileno logró alcanzar el top 1 mundial en Valorant usando solo un mouse de $15.000 pesos. Su historia de superación y dedicación te inspirará a seguir tus sueños gaming.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop&crop=center",
      category: "Gaming",
      date: "15 Dic 2024",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "CASO CURIOSO #2",
      description:
        "Un estudio revela que los gamers que juegan en horario nocturno tienen un 40% mejor rendimiento académico. Te contamos los secretos de la cronobiología gaming y cómo optimizar tu tiempo de estudio.",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&crop=center",
      category: "Estudios",
      date: "12 Dic 2024",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "CASO CURIOSO #3",
      description:
        "La nueva tecnología de refrigeración líquida personalizada está revolucionando el gaming en Chile. Conoce los casos de éxito de estudiantes DUOC que han optimizado sus setups.",
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&h=400&fit=crop&crop=center",
      category: "Tecnología",
      date: "10 Dic 2024",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "CASO CURIOSO #4",
      description:
        "Un grupo de estudiantes de DUOC creó un videojuego indie que ya tiene más de 100,000 descargas. Descubre cómo lograron financiar su proyecto y los consejos para desarrolladores novatos.",
      image:
        "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&h=400&fit=crop&crop=center",
      category: "Desarrollo",
      date: "8 Dic 2024",
      readTime: "8 min",
    },
  ];

  return (
    <main
      className="min-h-screen bg-black font-[Roboto] relative overflow-hidden"
      id="blog"
    >
      <GameBackgroundEffects />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 pt-20">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-green-400 font-[Orbitron] mb-4">
            NOTICIAS IMPORTANTES
          </h1>
          <p className="text-white/80 text-lg font-[Roboto]">
            Mantente al día con las últimas novedades del mundo gaming
          </p>
        </header>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-2xl shadow-2xl shadow-green-400/20 overflow-hidden hover:border-green-400/60 transition-all duration-300 group"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold font-[Orbitron]">
                        {post.category}
                      </span>
                      <span className="text-white/60 text-sm font-[Roboto]">
                        {post.date}
                      </span>
                      <span className="text-blue-400/80 text-sm font-[Roboto]">
                        {post.readTime} lectura
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white font-[Orbitron] mb-4 group-hover:text-green-400 transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-white/80 text-base font-[Roboto] leading-relaxed mb-6">
                      {post.description}
                    </p>

                    <button className="bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-6 py-3 rounded-lg hover:from-green-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 font-[Roboto] group/btn">
                      <span className="flex items-center gap-2">
                        VER CASO
                        <svg
                          className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div className="md:w-80 md:flex-shrink-0">
                    <div className="relative overflow-hidden rounded-lg group/img">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-64 object-cover group-hover/img:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-48 md:h-64 bg-gradient-to-br from-green-400/20 to-blue-400/20 items-center justify-center"
                        style={{ display: "none" }}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-400/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <svg
                              className="w-8 h-8 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-white/60 text-sm font-[Roboto]">
                            Imagen no disponible
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-400 to-green-400 text-black font-bold px-8 py-4 rounded-full hover:from-blue-500 hover:to-green-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-400/25 text-lg font-[Roboto] group">
            <span className="flex items-center gap-2">
              VER TODAS LAS NOTICIAS
              <span
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Blog;
