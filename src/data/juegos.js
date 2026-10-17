export const listaJuegos = [
  {
    id: 1,
    titulo: "Black Myth: Wukong",
    genero: "Acción / RPG",
    rating: 9.6,
    lanzamiento: 2024,
    desarrollador: "Game Science",
    imagen: "/public/img/Black Myth Wukong.jpg",
    resumenCorto: "Un RPG de acción enraizado en la mitología china donde encarnas al Predestinado.",
    biografia: "Black Myth: Wukong es un RPG de acción basado en la clásica novela china del siglo XVI 'Viaje al Oeste'. Como el Predestinado, te aventurarás a través de impresionantes paisajes orientales, enfrentando a colosales criaturas mitológicas mediante un sistema de combate ágil con bastón mágico, transformaciones espirituales y hechizos estratégicos. Destaca por su apartado técnico con Unreal Engine 5 y su exigente diseño de jefes.",
    requisitosPC: {
      cpu: "Intel Core i5-8400 / AMD Ryzen 5 1600",
      gpu: "NVIDIA GeForce RTX 2060 / RTX 4050 (Recomendado DLSS)",
      ram: "16 GB RAM",
      almacenamiento: "130 GB SSD"
    },
    fpsBase: 85,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/2358720/Black_Myth_Wukong/", precio: "$1,299 MXN" },
      { nombre: "Epic Games Store", url: "https://store.epicgames.com/es-ES/p/black-myth-wukong-87a72b", precio: "$1,299 MXN" }
    ]
  },
  {
    id: 2,
    titulo: "Hollow Knight: Silksong",
    genero: "Metroidvania",
    rating: 9.8,
    lanzamiento: 2025,
    desarrollador: "Team Cherry",
    imagen: "/public/img/Silksong.jpg",
    resumenCorto: "Asciende a la cima de un reino encantado gobernado por la seda y el canto como Hornet.",
    biografia: "Secuela del aclamado Hollow Knight. En esta entrega controlas a Hornet, la princesa protectora de Hallownest, quien es capturada y llevada al desconocido reino de Pharloom. A diferencia del Caballero original, Hornet posee un estilo de combate acrobático y veloz, utilizando herramientas artesanales, misiones de recolección y exploración vertical desde Bonebottom hasta la ciudadela brillante en la cima del reino.",
    requisitosPC: {
      cpu: "Intel Core i3-3240 / AMD FX-4300",
      gpu: "NVIDIA GeForce GTX 560 Ti / Integrada moderna",
      ram: "8 GB RAM",
      almacenamiento: "9 GB SSD"
    },
    fpsBase: 144,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/", precio: "$349 MXN" },
      { nombre: "GOG.com", url: "https://www.gog.com/en/game/hollow_knight_silksong", precio: "$349 MXN" },
      { nombre: "Xbox PC Store", url: "https://www.xbox.com/es-MX/games/store/hollow-knight-silksong/9n116v0599hb", precio: "Incluido en Game Pass" }
    ]
  },
  {
    id: 3,
    titulo: "Age of Mythology: Retold",
    genero: "Estrategia (RTS)",
    rating: 9.3,
    lanzamiento: 2024,
    desarrollador: "World's Edge / Forgotten Empires",
    imagen: "/public/img/AOM.jpg",
    resumenCorto: "De los creadores de Age of Empires, entra en una era donde dioses, monstruos y humanos chocan.",
    biografia: "Age of Mythology: Retold es la reconstrucción definitiva del clásico juego de estrategia en tiempo real lanzado originalmente en 2002. Acompaña al almirante atlante Arkantos en una extensa campaña a través de Grecia, Egipto y las tierras nórdicas para detener a Gargarensis. Esta edición moderniza los gráficos con trazado de rayos, permite reutilizar poderes divinos, mejora el control de escuadrones militares y soporta altas tasas de refresco.",
    requisitosPC: {
      cpu: "Intel Core i5-6400 / AMD Ryzen 5 1600",
      gpu: "NVIDIA GeForce GTX 970 / RTX serie 30 o 40",
      ram: "16 GB RAM",
      almacenamiento: "25 GB SSD"
    },
    fpsBase: 120,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1934680/Age_of_Mythology_Retold/", precio: "$599 MXN" },
      { nombre: "Microsoft Store PC", url: "https://www.xbox.com/es-MX/games/age-of-mythology-retold", precio: "$599 MXN" }
    ]
  },
  {
    id: 4,
    titulo: "Hollow Knight",
    genero: "Metroidvania",
    rating: 9.7,
    lanzamiento: 2017,
    desarrollador: "Team Cherry",
    imagen: "/public/img/HN.jpg",
    resumenCorto: "Forja tu propio camino en Hallownest, un vasto reino en ruinas de insectos y héroes.",
    biografia: "Una obra maestra del género Metroidvania en 2D dibujada a mano. Explora cavernas serpenteantes, ciudades antiguas y páramos mortales mientras combates criaturas corrompidas por la Infección. Personaliza tu estilo de juego combinando amuletos únicos, domina habilidades como las Alas de Monarca y el Aguijón Onírico, y pon a prueba tu destreza absoluta en los panteones del Hogar de Dioses.",
    requisitosPC: {
      cpu: "Intel Core i5",
      gpu: "GeForce GTX 560+",
      ram: "8 GB RAM",
      almacenamiento: "9 GB SSD"
    },
    fpsBase: 144,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/367520/Hollow_Knight/", precio: "$178.99 MXN" },
      { nombre: "GOG.com", url: "https://www.gog.com/en/game/hollow_knight", precio: "$178.99 MXN" }
    ]
  },
  {
    id: 5,
    titulo: "Elden Ring: Shadow of the Erdtree",
    genero: "Acción / RPG",
    rating: 9.8,
    lanzamiento: 2024,
    desarrollador: "FromSoftware",
    imagen: "/public/img/ER.jpg",
    resumenCorto: "Levántate, Sinluz, y déjate guiar por la gracia para esgrimir el poder del Círculo de Elden.",
    biografia: "Dirigido por Hidetaka Miyazaki con colaboración en la mitología de George R. R. Martin, Elden Ring redefinió los juegos de mundo abierto y dificultad exigente. Con su expansión Shadow of the Erdtree, los jugadores viajan a la Tierra Sombría tras los pasos de Miquella, descubriendo nuevas categorías de armas, mazmorras interconectadas y algunos de los combates más memorables en la historia de los videojuegos.",
    requisitosPC: {
      cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X",
      gpu: "NVIDIA GeForce GTX 1070 8GB / RTX 4050",
      ram: "16 GB RAM",
      almacenamiento: "60 GB SSD"
    },
    fpsBase: 60,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1245620/ELDEN_RING/", precio: "$1,199 MXN" },
      { nombre: "Bandai Namco Store", url: "https://es.bandainamcoent.eu/elden-ring/elden-ring", precio: "$1,199 MXN" }
    ]
  },
  {
    id: 6,
    titulo: "Cyberpunk 2077: Ultimate Edition",
    genero: "Acción / RPG",
    rating: 9.2,
    lanzamiento: 2023,
    desarrollador: "CD Projekt Red",
    imagen: "/public/img/CP.jpg",
    resumenCorto: "Conviértete en un mercenario ciberpunk en la megalópolis obsesionada con el poder de Night City.",
    biografia: "Tras la actualización 2.0 y la expansión de thriller de espionaje Phantom Liberty, Cyberpunk 2077 se consolidó como uno de los RPGs más inmersivos de la generación. Encarna a V en su lucha por la supervivencia junto al constructo digital de Johnny Silverhand (Keanu Reeves), personalizando implantes de ciberware, hackeos rápidos y vehículos en una ciudad futurista llena de historias profundas.",
    requisitosPC: {
      cpu: "Intel Core i7-12700 / Core i5 de 13a Gen",
      gpu: "NVIDIA GeForce RTX 2060 Super / RTX 4050 (con DLSS 3)",
      ram: "16 GB DDR5",
      almacenamiento: "70 GB NVMe SSD"
    },
    fpsBase: 90,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/", precio: "$1,299 MXN" },
      { nombre: "GOG.com", url: "https://www.gog.com/en/game/cyberpunk_2077", precio: "$1,299 MXN" },
      { nombre: "Epic Games Store", url: "https://store.epicgames.com/es-ES/p/cyberpunk-2077", precio: "$1,299 MXN" }
    ]
  },
  {
    id: 7,
    titulo: "Baldur's Gate 3",
    genero: "RPG / Estrategia",
    rating: 9.9,
    lanzamiento: 2023,
    desarrollador: "Larian Studios",
    imagen: "/public/img/BG.jpg",
    resumenCorto: "Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo y traición.",
    biografia: "Ganador de todos los premios principales a Juego del Año (GOTY). Basado en las reglas de Dungeons & Dragons 5ta Edición, Baldur's Gate 3 ofrece una libertad narrativa sin precedentes donde cada tirada de dados y cada decisión altera radicalmente el destino de Faerûn. Puedes jugarlo en solitario o en cooperativo en línea, desarrollando alianzas profundas con personajes inolvidables.",
    requisitosPC: {
      cpu: "Intel Core i5-8400 / AMD Ryzen 5 3600",
      gpu: "NVIDIA GeForce RTX 2060 Super o superior",
      ram: "16 GB RAM",
      almacenamiento: "150 GB SSD"
    },
    fpsBase: 95,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/", precio: "$999 MXN" },
      { nombre: "GOG.com", url: "https://www.gog.com/en/game/baldurs_gate_iii", precio: "$999 MXN" }
    ]
  },
  {
    id: 8,
    titulo: "Helldivers 2",
    genero: "Shooter Cooperativo",
    rating: 9.1,
    lanzamiento: 2024,
    desarrollador: "Arrowhead Game Studios",
    imagen: "/public/img/HD.jpg",
    resumenCorto: "La última línea de ataque de la galaxia. Alístate en los Helldivers y lucha por la Democracia.",
    biografia: "Un frenético shooter en tercera persona basado en escuadrones de hasta cuatro jugadores. Como soldado de élite de la Supertierra, te lanzas en cápsulas orbitales hacia planetas hostiles infestados de Termínidos gigantes y Autómatas implacables. Su mecánica estrella consiste en solicitar estratagemas aéreas y artillería pesada en tiempo real mientras gestionas el fuego amigo.",
    requisitosPC: {
      cpu: "Intel Core i7-9700K / Intel Core i5-12450H",
      gpu: "NVIDIA GeForce RTX 2060 / RTX 4050",
      ram: "16 GB RAM",
      almacenamiento: "100 GB SSD"
    },
    fpsBase: 95,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/553850/HELLDIVERS_2/", precio: "$799 MXN" }
    ]
  },
  {
    id: 9,
    titulo: "eFootball",
    genero: "Deportes / Simulación",
    rating: 8.6,
    lanzamiento: 2024,
    desarrollador: "Konami",
    imagen: "/public/img/EF.jpg",
    resumenCorto: "La evolución del fútbol digital de Konami con modo Dream Team y clubes licenciados.",
    biografia: "Sucesor de la histórica franquicia Pro Evolution Soccer (PES), eFootball ofrece una plataforma competitiva en constante actualización donde puedes crear tu propio 'Dream Team' fichando a estrellas actuales del fútbol mundial y leyendas históricas. Su motor enfocado en las físicas del balón y regates de precisión premia la lectura táctica de cada partido en línea.",
    requisitosPC: {
      cpu: "Intel Core i5-7600 / AMD Ryzen 5 1600",
      gpu: "NVIDIA GeForce GTX 1060 / RTX 4050",
      ram: "16 GB RAM",
      almacenamiento: "50 GB SSD"
    },
    fpsBase: 120,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1665460/eFootball/", precio: "Gratis (Free-to-Play)" },
      { nombre: "Microsoft Store PC", url: "https://www.xbox.com/es-MX/games/store/efootball/9nt1zbbv6wh6", precio: "Gratis (Free-to-Play)" }
    ]
  },
  {
    id: 10,
    titulo: "Red Dead Redemption 2",
    genero: "Acción / Mundo Abierto",
    rating: 9.8,
    lanzamiento: 2019,
    desarrollador: "Rockstar Games",
    imagen: "/public/img/RDR.jpg",
    resumenCorto: "La épica historia de Arthur Morgan y la banda de Van der Linde en el ocaso del Salvaje Oeste.",
    biografia: "Con más de 175 premios al Juego del Año, Red Dead Redemption 2 es un referente técnico y narrativo en PC. Ambientado en Estados Unidos en 1899, sigue a Arthur Morgan mientras la banda de forajidos de Dutch van der Linde huye de agentes federales y cazarrecompensas. Su mundo vivo ofrece un nivel de detalle incomparable en fauna, clima, duelos e interacción con NPCs.",
    requisitosPC: {
      cpu: "Intel Core i7-4770K / Intel Core i5 moderno",
      gpu: "NVIDIA GeForce GTX 1060 6GB / RTX 4050",
      ram: "16 GB RAM",
      almacenamiento: "150 GB SSD"
    },
    fpsBase: 90,
    tiendas: [
      { nombre: "Steam", url: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/", precio: "$1,299 MXN" },
      { nombre: "Epic Games Store", url: "https://store.epicgames.com/es-ES/p/red-dead-redemption-2", precio: "$1,299 MXN" },
      { nombre: "Rockstar Store", url: "https://store.rockstargames.com/es-419/game/buy-red-dead-redemption-2", precio: "$1,299 MXN" }
    ]
  }
];