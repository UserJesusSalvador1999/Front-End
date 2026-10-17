<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { listaJuegos } from './data/juegos.js'

// --- ESTADO DE NAVEGACIÓN ---
const moduloActivo = ref('inicio') // 'inicio', 'top', 'biografia', 'simulador', 'favoritos', 'comunidad'
const juegoSeleccionado = ref(listaJuegos[0])

// --- ESTADO DEL CARRUSEL (10 JUEGOS) ---
const indiceCarrusel = ref(0)
let intervaloCarrusel = null

const siguienteSlide = () => {
  indiceCarrusel.value = (indiceCarrusel.value + 1) % listaJuegos.length
}

const anteriorSlide = () => {
  indiceCarrusel.value = (indiceCarrusel.value - 1 + listaJuegos.length) % listaJuegos.length
}

const irASlide = (index) => {
  indiceCarrusel.value = index
}

onMounted(() => {
  intervaloCarrusel = setInterval(siguienteSlide, 5000)
  const guardados = localStorage.getItem('favoritos_gamer')
  if (guardados) {
    favoritosIds.value = JSON.parse(guardados)
  }
})

onUnmounted(() => {
  clearInterval(intervaloCarrusel)
})

// --- ESTADO DE FILTROS Y BÚSQUEDA (TOP JUEGOS) ---
const busqueda = ref('')
const generoFiltro = ref('Todos')
const ordenFiltro = ref('rating')

const generosDisponibles = computed(() => {
  const generos = listaJuegos.map(j => j.genero)
  return ['Todos', ...new Set(generos)]
})

const juegosFiltrados = computed(() => {
  let resultado = listaJuegos.filter(juego => {
    const coincideTexto = juego.titulo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
                          juego.desarrollador.toLowerCase().includes(busqueda.value.toLowerCase())
    const coincideGenero = generoFiltro.value === 'Todos' || juego.genero === generoFiltro.value
    return coincideTexto && coincideGenero
  })

  if (ordenFiltro.value === 'rating') {
    resultado.sort((a, b) => b.rating - a.rating)
  } else if (ordenFiltro.value === 'recientes') {
    resultado.sort((a, b) => b.lanzamiento - a.lanzamiento)
  } else if (ordenFiltro.value === 'nombre') {
    resultado.sort((a, b) => a.titulo.localeCompare(b.titulo))
  }
  return resultado
})

// --- NAVEGAR A BIOGRAFÍA Y SITIOS OFICIALES ---
const verBiografia = (juego) => {
  juegoSeleccionado.value = juego
  moduloActivo.value = 'biografia'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- MÓDULO DE FAVORITOS (WISHLIST) ---
const favoritosIds = ref([2, 3, 4])

const toggleFavorito = (id) => {
  const index = favoritosIds.value.indexOf(id)
  if (index === -1) {
    favoritosIds.value.push(id)
  } else {
    favoritosIds.value.splice(index, 1)
  }
}

const esFavorito = (id) => favoritosIds.value.includes(id)

const listaFavoritos = computed(() => {
  return listaJuegos.filter(j => favoritosIds.value.includes(j.id))
})

watch(favoritosIds, (nuevos) => {
  localStorage.setItem('favoritos_gamer', JSON.stringify(nuevos))
}, { deep: true })

// --- MÓDULO SIMULADOR DE RENDIMIENTO PC ---
const gpuSeleccionada = ref('rtx4050')
const ramSeleccionada = ref('16')
const calidadGrafica = ref('alta')

const multiplicadorHardware = computed(() => {
  let mult = 1.0
  if (gpuSeleccionada.value === 'gtx1650') mult *= 0.55
  if (gpuSeleccionada.value === 'rtx3050') mult *= 0.8
  if (gpuSeleccionada.value === 'rtx4050') mult *= 1.05
  if (gpuSeleccionada.value === 'rtx4070') mult *= 1.45

  if (ramSeleccionada.value === '8') mult *= 0.82
  if (ramSeleccionada.value === '16') mult *= 1.0
  if (ramSeleccionada.value === '32') mult *= 1.08

  if (calidadGrafica.value === 'media') mult *= 1.25
  if (calidadGrafica.value === 'alta') mult *= 1.0
  if (calidadGrafica.value === 'ultra') mult *= 0.78

  return mult
})

const calcularFPS = (fpsBase) => {
  return Math.min(144, Math.round(fpsBase * multiplicadorHardware.value))
}

// --- MÓDULO DE COMUNIDAD Y RESEÑAS ---
const nuevaResena = ref({
  autor: '',
  juegoTitulo: listaJuegos[1].titulo,
  puntuacion: 10,
  comentario: ''
})

const resenasComunidad = ref([
  {
    id: 101,
    autor: 'MapacheGamer_99',
    juegoTitulo: 'Hollow Knight: Silksong',
    puntuacion: 10,
    comentario: 'El diseño de niveles en Pharloom y la agilidad de Hornet superaron todas mis expectativas.',
    fecha: 'Hace 2 horas'
  },
  {
    id: 102,
    autor: 'Luis_69',
    juegoTitulo: 'Age of Mythology: Retold',
    puntuacion: 9.5,
    comentario: 'Correrlo a 120 FPS estables con los poderes divinos recargables le da una vida nueva al clásico.',
    fecha: 'Ayer'
  }
])

const publicarResena = () => {
  if (!nuevaResena.value.autor.trim() || !nuevaResena.value.comentario.trim()) return
  resenasComunidad.value.unshift({
    id: Date.now(),
    autor: nuevaResena.value.autor,
    juegoTitulo: nuevaResena.value.juegoTitulo,
    puntuacion: nuevaResena.value.puntuacion,
    comentario: nuevaResena.value.comentario,
    fecha: 'Justo ahora'
  })
  nuevaResena.value.autor = ''
  nuevaResena.value.comentario = ''
}
</script>

<template>
  <div class="app-wrapper">
    <!-- NAVBAR DINÁMICO -->
    <header class="navbar">
      <div class="nav-brand" @click="moduloActivo = 'inicio'">
        <span class="brand-icon">🦝</span>
        <div>
          <span class="brand-title">MAPACHE<span class="neon-text">GAMER</span></span>
          <span class="brand-sub">Portal Gaming</span>
        </div>
      </div>

      <nav class="nav-links">
        <button :class="{ active: moduloActivo === 'inicio' }" @click="moduloActivo = 'inicio'">
          🏠 Inicio
        </button>
        <button :class="{ active: moduloActivo === 'top' }" @click="moduloActivo = 'top'">
          🏆 Top Juegos ({{ listaJuegos.length }})
        </button>
        <button :class="{ active: moduloActivo === 'biografia' }" @click="moduloActivo = 'biografia'">
          📖 Biografía y Tiendas
        </button>
        <button :class="{ active: moduloActivo === 'simulador' }" @click="moduloActivo = 'simulador'">
          ⚡ Laboratorio PC
        </button>
        <button :class="{ active: moduloActivo === 'comunidad' }" @click="moduloActivo = 'comunidad'">
          💬 Comunidad
        </button>
        <button class="wishlist-btn" :class="{ active: moduloActivo === 'favoritos' }" @click="moduloActivo = 'favoritos'">
          ❤️ Favoritos <span class="badge">{{ favoritosIds.length }}</span>
        </button>
      </nav>
    </header>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="main-container">

      <!-- ================= MÓDULO 1: INICIO Y CARRUSEL DE 10 JUEGOS ================= -->
      <section v-if="moduloActivo === 'inicio'" class="fade-in">
        <div class="section-header">
          <h1>Destacados del Momento en PC</h1>
          <p>Explora nuestro carrusel interactivo con los 10 títulos imprescindibles de la temporada.</p>
        </div>

        <!-- CARRUSEL DE 10 JUEGOS -->
        <div class="carousel-container">
          <div class="carousel-slide">
            <img :src="listaJuegos[indiceCarrusel].imagen" :alt="listaJuegos[indiceCarrusel].titulo" class="carousel-img" />
            <div class="carousel-overlay">
              <div class="carousel-badges">
                <span class="tag-genre">{{ listaJuegos[indiceCarrusel].genero }}</span>
                <span class="tag-rating">⭐ {{ listaJuegos[indiceCarrusel].rating }} / 10</span>
                <span class="tag-counter">Juego {{ indiceCarrusel + 1 }} de {{ listaJuegos.length }}</span>
              </div>
              <h2>{{ listaJuegos[indiceCarrusel].titulo }}</h2>
              <p>{{ listaJuegos[indiceCarrusel].resumenCorto }}</p>
              <div class="carousel-actions">
                <button class="btn-primary" @click="verBiografia(listaJuegos[indiceCarrusel])">
                  🔍 Ver Biografía y Dónde Comprar en PC
                </button>
                <button class="btn-secondary" @click="toggleFavorito(listaJuegos[indiceCarrusel].id)">
                  {{ esFavorito(listaJuegos[indiceCarrusel].id) ? '❤️ En Favoritos' : '🤍 Guardar en Favoritos' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Controles del Carrusel -->
          <button class="carousel-arrow left" @click="anteriorSlide">❮</button>
          <button class="carousel-arrow right" @click="siguienteSlide">❯</button>

          <!-- Indicadores de los 10 juegos -->
          <div class="carousel-dots">
            <button
              v-for="(juego, idx) in listaJuegos"
              :key="juego.id"
              :class="['dot', { active: idx === indiceCarrusel }]"
              @click="irASlide(idx)"
              :title="juego.titulo"
            >
              {{ idx + 1 }}
            </button>
          </div>
        </div>

        <!-- Resumen Rápido de Módulos -->
        <div class="quick-features">
          <div class="feature-card" @click="moduloActivo = 'top'">
            <h3>🏆 Ranking & Top 10</h3>
            <p>Filtra por género, busca en tiempo real y accede a la ficha histórica de cada título.</p>
          </div>
          <div class="feature-card" @click="moduloActivo = 'simulador'">
            <h3>💻 ¿Corre en mi Laptop/PC?</h3>
            <p>Simula los FPS estimados en pantallas de hasta 144 Hz según tu tarjeta gráfica y RAM.</p>
          </div>
          <div class="feature-card" @click="moduloActivo = 'comunidad'">
            <h3>💬 Reseñas de Jugadores</h3>
            <p>Comparte tus análisis, calificaciones y recomendaciones con la comunidad.</p>
          </div>
        </div>

        <!-- Vista previa rápida de los 10 juegos -->
        <h2 class="sub-heading">Explora la Colección Completa (Haz clic para ver Biografía y Tiendas)</h2>
        <div class="games-grid">
          <article v-for="juego in listaJuegos" :key="juego.id" class="game-card">
            <div class="card-img-wrapper" @click="verBiografia(juego)">
              <img :src="juego.imagen" :alt="juego.titulo" />
              <span class="card-score">⭐ {{ juego.rating }}</span>
            </div>
            <div class="card-body">
              <span class="card-genre">{{ juego.genero }} • {{ juego.lanzamiento }}</span>
              <h3>{{ juego.titulo }}</h3>
              <p>{{ juego.resumenCorto }}</p>
              <div class="card-footer">
                <button class="btn-primary btn-sm" @click="verBiografia(juego)">
                  Biografía y Comprar PC
                </button>
                <button class="btn-icon" @click="toggleFavorito(juego.id)" title="Agregar a Favoritos">
                  {{ esFavorito(juego.id) ? '❤️' : '🤍' }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ================= MÓDULO 2: TOP JUEGOS (CON BUSCADOR Y FILTROS) ================= -->
      <section v-if="moduloActivo === 'top'" class="fade-in">
        <div class="section-header">
          <h1>🏆 Top Videojuegos para PC</h1>
          <p>Haz clic en cualquier videojuego para abrir su biografía completa, requisitos y tiendas oficiales.</p>
        </div>

        <!-- Barra de herramientas reactiva -->
        <div class="filter-bar">
          <input
            v-model="busqueda"
            type="text"
            placeholder="🔍 Buscar juego o estudio (ej. Hollow Knight, Konami, FromSoftware)..."
            class="search-input"
          />

          <select v-model="generoFiltro" class="select-input">
            <option v-for="gen in generosDisponibles" :key="gen" :value="gen">
              Género: {{ gen }}
            </option>
          </select>

          <select v-model="ordenFiltro" class="select-input">
            <option value="rating">Ordenar por: Mejor Calificación</option>
            <option value="recientes">Ordenar por: Año de Lanzamiento</option>
            <option value="nombre">Ordenar por: Orden Alfabético (A-Z)</option>
          </select>
        </div>

        <!-- Lista tipo Ranking -->
        <div class="ranking-list">
          <div
            v-for="(juego, index) in juegosFiltrados"
            :key="juego.id"
            class="ranking-item"
          >
            <div class="rank-number">#{{ index + 1 }}</div>
            <img :src="juego.imagen" :alt="juego.titulo" class="rank-thumb" @click="verBiografia(juego)" />
            <div class="rank-info" @click="verBiografia(juego)">
              <div class="rank-tags">
                <span class="tag-genre">{{ juego.genero }}</span>
                <span class="tag-dev">🛠️ {{ juego.desarrollador }}</span>
                <span class="tag-year">📅 {{ juego.lanzamiento }}</span>
              </div>
              <h3>{{ juego.titulo }}</h3>
              <p>{{ juego.resumenCorto }}</p>
            </div>
            <div class="rank-actions">
              <div class="rank-score">⭐ {{ juego.rating }}</div>
              <button class="btn-primary" @click="verBiografia(juego)">
                📖 Ver Biografía y Tiendas PC
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= MÓDULO 3: BIOGRAFÍA Y SITIOS OFICIALES DE COMPRA PC ================= -->
      <section v-if="moduloActivo === 'biografia'" class="fade-in">
        <div class="bio-nav">
          <button class="btn-secondary" @click="moduloActivo = 'top'">
            ⬅ Volver al Top Juegos
          </button>
          <div class="bio-selector">
            <span>Cambiar de juego rápidamente: </span>
            <select v-model="juegoSeleccionado" class="select-input">
              <option v-for="j in listaJuegos" :key="j.id" :value="j">
                {{ j.titulo }}
              </option>
            </select>
          </div>
        </div>

        <div class="bio-card">
          <div class="bio-header">
            <img :src="juegoSeleccionado.imagen" :alt="juegoSeleccionado.titulo" class="bio-banner" />
            <div class="bio-title-box">
              <span class="tag-genre">{{ juegoSeleccionado.genero }}</span>
              <h1>{{ juegoSeleccionado.titulo }}</h1>
              <p class="bio-meta">
                Desarrollado por <strong>{{ juegoSeleccionado.desarrollador }}</strong> •
                Lanzamiento: <strong>{{ juegoSeleccionado.lanzamiento }}</strong> •
                Calificación: <strong>⭐ {{ juegoSeleccionado.rating }}/10</strong>
              </p>
              <button class="btn-secondary" @click="toggleFavorito(juegoSeleccionado.id)">
                {{ esFavorito(juegoSeleccionado.id) ? '❤️ Quitar de mis Favoritos' : '🤍 Añadir a mis Favoritos' }}
              </button>
            </div>
          </div>

          <div class="bio-content-grid">
            <!-- Biografía e Historia del Juego -->
            <div class="bio-story">
              <h2>📜 Biografía e Historia del Videojuego</h2>
              <p class="bio-text">{{ juegoSeleccionado.biografia }}</p>

              <h3>💻 Requisitos Recomendados para PC</h3>
              <ul class="specs-list">
                <li><strong>Procesador (CPU):</strong> {{ juegoSeleccionado.requisitosPC.cpu }}</li>
                <li><strong>Tarjeta Gráfica (GPU):</strong> {{ juegoSeleccionado.requisitosPC.gpu }}</li>
                <li><strong>Memoria RAM:</strong> {{ juegoSeleccionado.requisitosPC.ram }}</li>
                <li><strong>Almacenamiento:</strong> {{ juegoSeleccionado.requisitosPC.almacenamiento }}</li>
              </ul>
            </div>

            <!-- Sitios Oficiales para Comprar en PC -->
            <div class="bio-stores">
              <h2>🛒 Sitios Oficiales para Comprar en PC</h2>
              <p>Adquiere tu licencia digital segura en las tiendas oficiales verificadas:</p>

              <div class="store-list">
                <a
                  v-for="tienda in juegoSeleccionado.tiendas"
                  :key="tienda.nombre"
                  :href="tienda.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="store-button"
                >
                  <div class="store-name">
                    <span>🔗 {{ tienda.nombre }}</span>
                    <small>Sitio Oficial PC ↗</small>
                  </div>
                  <span class="store-price">{{ tienda.precio }}</span>
                </a>
              </div>

              <div class="pc-guarantee">
                <h4>⚡ Optimización en PC</h4>
                <p>Compatible con mando y teclado/ratón, monitores de 144 Hz y tecnologías de escalado como NVIDIA DLSS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= MÓDULO 4: SIMULADOR DE RENDIMIENTO PC ================= -->
      <section v-if="moduloActivo === 'simulador'" class="fade-in">
        <div class="section-header">
          <h1>⚡ Laboratorio PC: Simulador de FPS</h1>
          <p>Selecciona las especificaciones de tu equipo para estimar a cuántos cuadros por segundo (FPS) correrán los 10 juegos en resolución 1080p.</p>
        </div>

        <div class="sim-controls">
          <div class="control-group">
            <label>Tarjeta Gráfica (GPU):</label>
            <select v-model="gpuSeleccionada" class="select-input">
              <option value="gtx1650">NVIDIA GTX 1650 (4 GB)</option>
              <option value="rtx3050">NVIDIA RTX 3050 (6 GB)</option>
              <option value="rtx4050">NVIDIA GeForce RTX 4050 (Laptop / Desktop)</option>
              <option value="rtx4070">NVIDIA GeForce RTX 4070 Super</option>
            </select>
          </div>

          <div class="control-group">
            <label>Memoria RAM:</label>
            <select v-model="ramSeleccionada" class="select-input">
              <option value="8">8 GB DDR4</option>
              <option value="16">16 GB DDR5 (Dual Channel)</option>
              <option value="32">32 GB DDR5</option>
            </select>
          </div>

          <div class="control-group">
            <label>Calidad Gráfica:</label>
            <select v-model="calidadGrafica" class="select-input">
              <option value="media">Media (Competitivo / Alto Rendimiento)</option>
              <option value="alta">Alta + DLSS Equilibrado</option>
              <option value="ultra">Ultra / Ray Tracing</option>
            </select>
          </div>
        </div>

        <div class="fps-grid">
          <div v-for="juego in listaJuegos" :key="juego.id" class="fps-card">
            <div class="fps-header">
              <strong>{{ juego.titulo }}</strong>
              <span class="fps-badge" :class="{ high: calcularFPS(juego.fpsBase) >= 90 }">
                {{ calcularFPS(juego.fpsBase) }} FPS
              </span>
            </div>
            <div class="fps-bar-bg">
              <div
                class="fps-bar-fill"
                :style="{ width: (calcularFPS(juego.fpsBase) / 144 * 100) + '%' }"
              ></div>
            </div>
            <small>Fluidez en pantalla de 144 Hz: {{ calcularFPS(juego.fpsBase) >= 100 ? 'Excelente (Ultra Fluido)' : 'Óptima (Estable)' }}</small>
          </div>
        </div>
      </section>

      <!-- ================= MÓDULO 5: FAVORITOS (WISHLIST) ================= -->
      <section v-if="moduloActivo === 'favoritos'" class="fade-in">
        <div class="section-header">
          <h1>❤️ Mi Lista de Deseos (Wishlist)</h1>
          <p>Juegos guardados en tu navegador listos para consultar o comprar.</p>
        </div>

        <div v-if="listaFavoritos.length === 0" class="empty-state">
          <p>Aún no tienes videojuegos en tu lista de favoritos.</p>
          <button class="btn-primary" @click="moduloActivo = 'top'">Explorar Top Juegos</button>
        </div>

        <div v-else class="games-grid">
          <article v-for="juego in listaFavoritos" :key="juego.id" class="game-card">
            <img :src="juego.imagen" :alt="juego.titulo" @click="verBiografia(juego)" />
            <div class="card-body">
              <h3>{{ juego.titulo }}</h3>
              <p>{{ juego.resumenCorto }}</p>
              <div class="card-footer">
                <button class="btn-primary btn-sm" @click="verBiografia(juego)">Ir a Tiendas PC</button>
                <button class="btn-secondary btn-sm" @click="toggleFavorito(juego.id)">Quitar ❌</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ================= MÓDULO 6: COMUNIDAD Y RESEÑAS ================= -->
      <section v-if="moduloActivo === 'comunidad'" class="fade-in">
        <div class="section-header">
          <h1>💬 Comunidad y Reseñas</h1>
          <p>Publica tu reseña sobre cualquiera de los títulos del catálogo.</p>
        </div>

        <div class="community-layout">
          <form class="review-form" @submit.prevent="publicarResena">
            <h3>Escribir una Reseña</h3>
            <label>Tu Nickname / Nombre:</label>
            <input v-model="nuevaResena.autor" type="text" placeholder="Ej. Salvador_Gamer" required class="search-input" />

            <label>Selecciona el Videojuego:</label>
            <select v-model="nuevaResena.juegoTitulo" class="select-input">
              <option v-for="j in listaJuegos" :key="j.id" :value="j.titulo">{{ j.titulo }}</option>
            </select>

            <label>Calificación ({{ nuevaResena.puntuacion }} / 10):</label>
            <input v-model="nuevaResena.puntuacion" type="range" min="1" max="10" step="0.5" />

            <label>Tu Opinión:</label>
            <textarea v-model="nuevaResena.comentario" rows="4" placeholder="¿Qué te pareció el rendimiento y la historia?" required class="search-input"></textarea>

            <button type="submit" class="btn-primary">Publicar Reseña</button>
          </form>

          <div class="reviews-feed">
            <div v-for="res in resenasComunidad" :key="res.id" class="review-card">
              <div class="review-top">
                <strong>👤 {{ res.autor }}</strong>
                <span class="tag-rating">⭐ {{ res.puntuacion }} / 10</span>
              </div>
              <div class="review-game">Juego: <strong>{{ res.juegoTitulo }}</strong> • <small>{{ res.fecha }}</small></div>
              <p>{{ res.comentario }}</p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <p>🚀 Programación web <strong>Programa elaborado con Framework Vue.js 3</strong> • Catálogo Interactivo de Videojuegos para PC</p>
    </footer>
  </div>
</template>

<style>
:root {
  --bg-dark: #0b0f19;
  --bg-card: #151c2c;
  --bg-card-hover: #1e2942;
  --accent: #00f2fe;
  --accent-purple: #7c3aed;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-main);
  line-height: 1.6;
}

/* NAVBAR */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(11, 15, 25, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.9rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.brand-icon {
  font-size: 2rem;
}

.brand-title {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 1px;
  display: block;
  line-height: 1.1;
}

.neon-text {
  color: var(--accent);
}

.brand-sub {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-links button {
  background: transparent;
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.55rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s ease;
}

.nav-links button:hover,
.nav-links button.active {
  background: linear-gradient(135deg, var(--accent-purple), #2563eb);
  border-color: var(--accent);
  box-shadow: 0 0 12px rgba(0, 242, 254, 0.35);
}

.badge {
  background: var(--accent);
  color: #000;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 800;
}

/* CONTENEDOR PRINCIPAL */
.main-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 82vh;
}

.section-header {
  margin-bottom: 1.8rem;
}

.section-header h1 {
  font-size: 2.1rem;
  margin-bottom: 0.3rem;
}

.section-header p {
  color: var(--text-muted);
}

/* CARRUSEL */
.carousel-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  margin-bottom: 2.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.carousel-slide {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 360px;
}

.carousel-img {
  width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin: auto;
}




.carousel-overlay {
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, #151c2c 0%, #0f172a 100%);
}

.carousel-badges {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.tag-genre {
  background: rgba(124, 58, 237, 0.25);
  color: #c4b5fd;
  border: 1px solid #7c3aed;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.tag-rating {
  background: rgba(234, 179, 8, 0.2);
  color: #fde047;
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}

.tag-counter {
  background: rgba(0, 242, 254, 0.15);
  color: var(--accent);
  padding: 0.2rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
}

.carousel-overlay h2 {
  font-size: 2rem;
  line-height: 1.2;
}

.carousel-actions {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.carousel-arrow {
  position: absolute;
  top: 45%;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}

.carousel-arrow.left { left: 12px; }
.carousel-arrow.right { right: 12px; }

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem;
  background: #0d1322;
  flex-wrap: wrap;
}

.dot {
  background: #1e293b;
  color: var(--text-muted);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
}

.dot.active {
  background: var(--accent);
  color: #000;
}

/* BOTONES GENERALES */
.btn-primary {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  color: #08101a;
  font-weight: 700;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}

.btn-sm {
  padding: 0.45rem 0.85rem;
  font-size: 0.85rem;
}

.btn-icon {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  cursor: pointer;
}

/* TARJETAS DE ACCESO RÁPIDO */
.quick-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2.5rem;
}

.feature-card {
  background: var(--bg-card);
  padding: 1.4rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.25s;
}

.feature-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}

/* GRID DE JUEGOS */
.sub-heading {
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
}

.game-card {
  background: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s;
}

.game-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
}

.card-img-wrapper {
  position: relative;
  cursor: pointer;
}

.game-card img {
  width: 100%;
  height: 155px;
  object-fit: cover;
}

.card-score {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
}

.card-body {
  padding: 1.1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
}

.card-genre {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
}

.card-body p {
  font-size: 0.88rem;
  color: var(--text-muted);
  flex: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.6rem;
}

/* TOP JUEGOS & FILTROS */
.filter-bar {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.8rem;
}

.search-input, .select-input {
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  width: 100%;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ranking-item {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 50px 210px 1fr auto;
  align-items: center;
  gap: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.rank-number {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--accent);
  text-align: center;
}

.rank-thumb {
  width: 210px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
}

.rank-info {
  cursor: pointer;
}

.rank-tags {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.rank-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.rank-score {
  font-size: 1.2rem;
  font-weight: 800;
  color: #fde047;
}

/* MÓDULO BIOGRAFÍA Y TIENDAS */
.bio-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.bio-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.bio-card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bio-header {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2rem;
  align-items: center;
  padding-bottom: 1.8rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.bio-banner {
  width: 100%;
  border-radius: 12px;
}

.bio-meta {
  color: var(--text-muted);
  margin: 0.6rem 0 1.2rem;
}

.bio-content-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2rem;
  margin-top: 1.8rem;
}

.bio-text {
  margin: 1rem 0 1.8rem;
  font-size: 1.02rem;
  color: #e2e8f0;
}

.specs-list {
  list-style: none;
  background: #0d1322;
  padding: 1.2rem;
  border-radius: 10px;
  margin-top: 0.8rem;
}

.specs-list li {
  margin-bottom: 0.5rem;
}

.store-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 1.2rem 0;
}

.store-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e2942;
  color: white;
  text-decoration: none;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 242, 254, 0.3);
  transition: all 0.2s;
}

.store-button:hover {
  background: #2563eb;
  transform: translateX(4px);
}

.store-name {
  display: flex;
  flex-direction: column;
  font-weight: 700;
}

.store-name small {
  color: var(--accent);
  font-weight: 400;
}

.store-price {
  background: var(--accent);
  color: #000;
  font-weight: 800;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
}

.pc-guarantee {
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid #7c3aed;
  padding: 1rem;
  border-radius: 10px;
}

/* SIMULADOR DE FPS */
.sim-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.fps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.2rem;
}

.fps-card {
  background: var(--bg-card);
  padding: 1.2rem;
  border-radius: 10px;
}

.fps-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

.fps-badge {
  background: #eab308;
  color: #000;
  font-weight: 800;
  padding: 0.15rem 0.6rem;
  border-radius: 6px;
}

.fps-badge.high {
  background: #22c55e;
}

.fps-bar-bg {
  height: 10px;
  background: #0b0f19;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.fps-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #00f2fe);
}

/* COMUNIDAD */
.community-layout {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
}

.review-form {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.reviews-feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-card {
  background: var(--bg-card);
  padding: 1.2rem;
  border-radius: 12px;
  border-left: 4px solid var(--accent);
}

.review-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.review-game {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.6rem;
}

.footer {
  text-align: center;
  padding: 1.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
}

@media (max-width: 860px) {
  .carousel-slide,
  .bio-header,
  .bio-content-grid,
  .community-layout,
  .filter-bar {
    grid-template-columns: 1fr;
  }
  .ranking-item {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .rank-thumb {
    width: 100%;
    height: 160px;
  }
  .rank-actions {
    align-items: center;
  }
}
</style>