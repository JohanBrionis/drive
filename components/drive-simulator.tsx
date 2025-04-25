"use client"

import { useState, useEffect, useRef } from "react"
import { Folder, File, ChevronLeft, ChevronRight, Home, Menu, X, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Sample data structure for our drive
const driveData = {
  name: "Mi Pack de Cursos",
  type: "folder",
  children: [
    {
      name: "NUEVO - HTML para crear paginas web",
      type: "folder",
      children: [{ name: "NUEVO - HTML para crear paginas web.rar", type: "file" }],
    },
    {
      name: "NUEVO - JavaScript nivel basico",
      type: "folder",
      children: [{ name: "NUEVO - JavaScript nivel basico.rar", type: "file" }],
    },
    {
      name: "NUEVO - CSS Basico",
      type: "folder",
      children: [{ name: "NUEVO - CSS Basico.rar", type: "file" }],
    },
    {
      name: "NUEVO - SQL nivel basico",
      type: "folder",
      children: [{ name: "NUEVO - SQL nivel basico.rar", type: "file" }],
    },
    {
      name: "Git & Github",
      type: "folder",
      children: [{ name: "Git & Github.rar", type: "file" }],
    },
    {
      name: "HTML Definitivo",
      type: "folder",
      children: [{ name: "HTML Definitivo.rar", type: "file" }],
    },
    {
      name: "Practico HTML y CSS",
      type: "folder",
      children: [{ name: "Practico HTML y CSS.rar", type: "file" }],
    },
    {
      name: "Diseño Responsivo",
      type: "folder",
      children: [{ name: "Diseño Responsivo.rar", type: "file" }],
    },
    {
      name: "NUEVO - Sistemas de diseños",
      type: "folder",
      children: [{ name: "NUEVO - Sistemas de diseños.rar", type: "file" }],
    },
    {
      name: "Grid Layout",
      type: "folder",
      children: [{ name: "Grid Layout.rar", type: "file" }],
    },
    {
      name: "Básico JavaScript",
      type: "folder",
      children: [{ name: "Básico JavaScript.rar", type: "file" }],
    },
    {
      name: "Angular – Pruebas Unitarias con Jest",
      type: "folder",
      children: [{ name: "Angular – Pruebas Unitarias con Jest.rar", type: "file" }],
    },
    {
      name: "API REST con PHP y MYSQL",
      type: "folder",
      children: [{ name: "API REST con PHP y MYSQL.rar", type: "file" }],
    },
    {
      name: "Aprende Laravel Desde Cero",
      type: "folder",
      children: [{ name: "Aprende Laravel Desde Cero.rar", type: "file" }],
    },
    {
      name: "Aprende Lenguaje C de CERO a EXPERTO",
      type: "folder",
      children: [{ name: "Aprende Lenguaje C de CERO a EXPERTO.rar", type: "file" }],
    },
    {
      name: "Aprende SQL desde Cero",
      type: "folder",
      children: [{ name: "Aprende SQL desde Cero.rar", type: "file" }],
    },
    {
      name: "Astro – El Framework para Sitios Web Orientados al Contenido",
      type: "folder",
      children: [{ name: "Astro – El Framework para Sitios Web Orientados al Contenido.rar", type: "file" }],
    },
    {
      name: "Cómo Crear una Página Web con WordPress y Elementor PRO 2024",
      type: "folder",
      children: [{ name: "Cómo Crear una Página Web con WordPress y Elementor PRO 2024.rar", type: "file" }],
    },
    {
      name: "Crea una Tienda Online con React",
      type: "folder",
      children: [{ name: "Crea una Tienda Online con React.rar", type: "file" }],
    },
    {
      name: "Curso de Angular",
      type: "folder",
      children: [{ name: "Curso de Angular.rar", type: "file" }],
    },
    {
      name: "Curso de Bootstrap",
      type: "folder",
      children: [{ name: "Curso de Bootstrap.rar", type: "file" }],
    },
    {
      name: "Curso de C# y Net Core Desde Cero a Nivel Avanzado",
      type: "folder",
      children: [{ name: "Curso de C# y Net Core Desde Cero a Nivel Avanzado.rar", type: "file" }],
    },
    {
      name: "Curso de Manipulación del DOM",
      type: "folder",
      children: [{ name: "Curso de Manipulación del DOM.rar", type: "file" }],
    },
    {
      name: "Curso de NodeJS",
      type: "folder",
      children: [{ name: "Curso de NodeJS.rar", type: "file" }],
    },
    {
      name: "Curso de Optimización Web",
      type: "folder",
      children: [{ name: "Curso de Optimización Web.rar", type: "file" }],
    },
    {
      name: "Curso de Preprocesadores CSS",
      type: "folder",
      children: [{ name: "Curso de Preprocesadores CSS.rar", type: "file" }],
    },
    {
      name: "Curso de React.js",
      type: "folder",
      children: [{ name: "Curso de React.js.rar", type: "file" }],
    },
    {
      name: "Curso de Responsive Design Maquetación Mobile First",
      type: "folder",
      children: [{ name: "Curso de Responsive Design Maquetación Mobile First.rar", type: "file" }],
    },
    {
      name: "Curso de Ruby on Rails",
      type: "folder",
      children: [{ name: "Curso de Ruby on Rails.rar", type: "file" }],
    },
    {
      name: "Curso de Svelte",
      type: "folder",
      children: [{ name: "Curso de Svelte.rar", type: "file" }],
    },
    {
      name: "Curso de TypeScript",
      type: "folder",
      children: [{ name: "Curso de TypeScript.rar", type: "file" }],
    },
    {
      name: "Curso de Web Components con JavaScript",
      type: "folder",
      children: [{ name: "Curso de Web Components con JavaScript.rar", type: "file" }],
    },
    {
      name: "Curso Diseño UXUI desde Cero",
      type: "folder",
      children: [{ name: "Curso Diseño UXUI desde Cero.rar", type: "file" }],
    },
    {
      name: "Curso Diseño Web en WordPress",
      type: "folder",
      children: [{ name: "Curso Diseño Web en WordPress.rar", type: "file" }],
    },
    {
      name: "Curso Frontend",
      type: "folder",
      children: [{ name: "Curso Frontend.rar", type: "file" }],
    },
    {
      name: "Curso Kotlin en Español para Android de Cero a Profesional",
      type: "folder",
      children: [{ name: "Curso Kotlin en Español para Android de Cero a Profesional.rar", type: "file" }],
    },
    {
      name: "Curso Práctico de Maquetación en CSS",
      type: "folder",
      children: [{ name: "Curso Práctico de Maquetación en CSS.rar", type: "file" }],
    },
    {
      name: "Curso Práctico de Node",
      type: "folder",
      children: [{ name: "Curso Práctico de Node.rar", type: "file" }],
    },
    {
      name: "Curso profesional de Angular",
      type: "folder",
      children: [{ name: "Curso profesional de Angular.rar", type: "file" }],
    },
    {
      name: "Desarrolla un Sistema de Pedidos con Laravel 11",
      type: "folder",
      children: [{ name: "Desarrolla un Sistema de Pedidos con Laravel 11.rar", type: "file" }],
    },
    {
      name: "Fundamentos de NodeJS",
      type: "folder",
      children: [{ name: "Fundamentos de NodeJS.rar", type: "file" }],
    },
    {
      name: "Inicia con Tailwind, Alpine, Laravel y Livewire",
      type: "folder",
      children: [{ name: "Inicia con Tailwind, Alpine, Laravel y Livewire.rar", type: "file" }],
    },
    {
      name: "Inteligencia Artificial",
      type: "folder",
      children: [{ name: "Inteligencia Artificial.rar", type: "file" }],
    },
    {
      name: "MasterClass Python de 0 a Experto",
      type: "folder",
      children: [{ name: "MasterClass Python de 0 a Experto.rar", type: "file" }],
    },
    {
      name: "Postman",
      type: "folder",
      children: [{ name: "Postman.rar", type: "file" }],
    },
    {
      name: "Power BI Desde Cero",
      type: "folder",
      children: [{ name: "Power BI Desde Cero.rar", type: "file" }],
    },
    {
      name: "Rasgos y Nociones Básicas de un(a) Programador(a)",
      type: "folder",
      children: [{ name: "Rasgos y Nociones Básicas de un(a) Programador(a).rar", type: "file" }],
    },
    {
      name: "React Pro lleva tus bases a otro nivel",
      type: "folder",
      children: [{ name: "React Pro lleva tus bases a otro nivel.rar", type: "file" }],
    },
    {
      name: "Router para Single Page App con JavaScript",
      type: "folder",
      children: [{ name: "Router para Single Page App con JavaScript.rar", type: "file" }],
    },
    {
      name: "Todo PHP y MySQL, de Básico a Experto Full",
      type: "folder",
      children: [{ name: "Todo PHP y MySQL, de Básico a Experto Full.rar", type: "file" }],
    },
    {
      name: "Tu Primer Sitio Web – Herramienta Clave para tus Proyectos",
      type: "folder",
      children: [{ name: "Tu Primer Sitio Web – Herramienta Clave para tus Proyectos.rar", type: "file" }],
    },
  ],
}

// Countdown timer component
function CountdownTimer() {
  const [hours, setHours] = useState(23)
  const [minutes, setMinutes] = useState(59)
  const [seconds, setSeconds] = useState(59)

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          if (hours > 0) {
            setHours(hours - 1)
            setMinutes(59)
            setSeconds(59)
          } else {
            // Reset timer when it reaches 0
            setHours(1)
            setMinutes(59)
            setSeconds(59)
          }
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [hours, minutes, seconds])

  return (
    <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 text-white px-2 py-1 rounded-md font-mono">{hours.toString().padStart(2, "0")}</div>
        <span className="text-xs mt-1">Horas</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 text-white px-2 py-1 rounded-md font-mono">
          {minutes.toString().padStart(2, "0")}
        </div>
        <span className="text-xs mt-1">Min</span>
      </div>
      <span className="text-xl font-bold">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 text-white px-2 py-1 rounded-md font-mono">
          {seconds.toString().padStart(2, "0")}
        </div>
        <span className="text-xs mt-1">Seg</span>
      </div>
    </div>
  )
}

// Client counter component
function ClientCounter() {
  const [clientCount, setClientCount] = useState(257)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Random interval between 15-30 seconds
    const getRandomInterval = () => Math.floor(Math.random() * (30000 - 15000 + 1) + 15000)

    const scheduleNextIncrement = () => {
      intervalRef.current = setTimeout(() => {
        setClientCount((prev) => prev + 1)
        scheduleNextIncrement()
      }, getRandomInterval())
    }

    scheduleNextIncrement()

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center space-x-2">
      <Users size={20} className="text-blue-600" />
      <span className="font-bold text-lg">{clientCount}</span>
      <span className="text-sm text-gray-600">clientes satisfechos</span>
    </div>
  )
}

export default function DriveSimulator() {
  // State to track navigation path
  const [path, setPath] = useState<any[]>([driveData])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  // Current folder is the last item in the path
  const currentFolder = path[path.length - 1]

  // Navigate into a folder
  const navigateToFolder = (folder: any) => {
    setPath([...path, folder])
    // Close sidebar on mobile when navigating
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Navigate back
  const navigateBack = () => {
    if (path.length > 1) {
      setPath(path.slice(0, path.length - 1))
    }
  }

  // Navigate to specific level in breadcrumb
  const navigateToBreadcrumb = (index: number) => {
    setPath(path.slice(0, index + 1))
  }

  // Navigate to home
  const navigateToHome = () => {
    setPath([driveData])
    // Close sidebar on mobile when navigating to home
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-2 sm:p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={sidebarOpen ? "Cerrar menú lateral" : "Abrir menú lateral"}
          >
            {sidebarOpen && isMobile ? <X size={20} /> : sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Cursos de Programación</h1>
        </div>
      </header>

      {/* Pricing Banner - Always visible */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 sm:p-4">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <span className="text-sm font-medium bg-yellow-400 text-blue-900 px-2 py-1 rounded-full">
              ¡OFERTA ESPECIAL!
            </span>
          </div>
          <div className="text-center mb-1">
            <span className="text-lg sm:text-xl font-bold">Pack Completo de Cursos</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl sm:text-3xl font-bold">$10.000</span>
            <span className="text-lg line-through opacity-75">$20.000</span>
          </div>
          <div className="text-sm text-center mb-2">La oferta termina en:</div>
          <CountdownTimer />
          <div className="mt-3 text-center">
            <ClientCounter />
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Overlay on mobile, side panel on desktop */}
        <aside
          className={cn(
            "transition-all duration-300 z-10",
            isMobile
              ? cn(
                  "fixed inset-0 bg-black bg-opacity-50",
                  sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
                )
              : "",
          )}
        >
          <div
            className={cn(
              "h-full bg-white border-r border-gray-200 transition-all duration-300 overflow-auto",
              isMobile
                ? cn("w-3/4 max-w-xs transform", sidebarOpen ? "translate-x-0" : "-translate-x-full")
                : cn(sidebarOpen ? "w-64" : "w-0"),
            )}
          >
            {sidebarOpen && (
              <div className="p-4">
                <div
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={navigateToHome}
                >
                  <Home size={18} className="text-blue-600 flex-shrink-0" />
                  <span className="font-medium truncate">Mi Drive</span>
                </div>

                {/* Highlight new courses */}
                <div className="mt-4 space-y-1">
                  <div className="p-2 font-medium text-sm text-gray-500">Nuevos Cursos</div>
                  {driveData.children
                    .filter((item) => item.name.startsWith("NUEVO"))
                    .map((folder, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 rounded-md bg-blue-50 hover:bg-blue-100 cursor-pointer mb-1"
                        onClick={() => navigateToFolder(folder)}
                      >
                        <Folder size={18} className="text-blue-600 flex-shrink-0" />
                        <span className="truncate font-medium text-blue-800">{folder.name}</span>
                      </div>
                    ))}
                </div>

                {/* Sidebar folders - mostrar algunos cursos destacados */}
                <div className="mt-4 space-y-1">
                  <div className="p-2 font-medium text-sm text-gray-500">Cursos Destacados</div>
                  {driveData.children
                    .filter(
                      (item) =>
                        [
                          "Git & Github",
                          "HTML Definitivo",
                          "Básico JavaScript",
                          "Curso de React.js",
                          "Inteligencia Artificial",
                          "MasterClass Python de 0 a Experto",
                          "SQL nivel basico",
                        ].includes(item.name) && !item.name.startsWith("NUEVO"),
                    )
                    .map((folder, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        onClick={() => navigateToFolder(folder)}
                      >
                        <Folder size={18} className="text-gray-500 flex-shrink-0" />
                        <span className="truncate">{folder.name}</span>
                      </div>
                    ))}
                  <div className="p-2 text-xs text-gray-400 italic">{driveData.children.length} cursos disponibles</div>
                </div>
              </div>
            )}
          </div>

          {/* Close sidebar when clicking outside on mobile */}
          {isMobile && sidebarOpen && (
            <div className="absolute inset-0 -z-10" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-white flex flex-col">
          {/* Breadcrumb navigation */}
          <div className="flex items-center p-2 sm:p-4 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={navigateBack}
              disabled={path.length <= 1}
              className={cn(
                "p-1 rounded-full mr-2 flex-shrink-0",
                path.length > 1 ? "hover:bg-gray-100 text-gray-700" : "text-gray-300",
              )}
              aria-label="Volver atrás"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center space-x-1 text-xs sm:text-sm whitespace-nowrap">
              {path.map((item, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronRight size={16} className="text-gray-400 mx-1 flex-shrink-0" />}
                  <span
                    className={cn(
                      "cursor-pointer hover:underline truncate max-w-[100px] sm:max-w-[150px] md:max-w-xs",
                      index === path.length - 1 ? "font-medium" : "",
                    )}
                    onClick={() => navigateToBreadcrumb(index)}
                    title={item.name}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Folder contents */}
          <div className="p-3 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 overflow-y-auto">
            {currentFolder.children?.map((item: any, index: number) => (
              <div
                key={index}
                className={cn(
                  "p-2 sm:p-4 rounded-lg border border-gray-200 flex flex-col items-center cursor-pointer transition-all hover:shadow-md",
                  item.type === "folder"
                    ? item.name.startsWith("NUEVO")
                      ? "hover:bg-blue-50 border-blue-200 bg-blue-50"
                      : "hover:bg-blue-50"
                    : "hover:bg-gray-50",
                )}
                onClick={() => (item.type === "folder" ? navigateToFolder(item) : null)}
              >
                {item.type === "folder" ? (
                  <Folder
                    size={32}
                    className={item.name.startsWith("NUEVO") ? "text-blue-600 mb-2" : "text-blue-500 mb-2"}
                  />
                ) : (
                  <File size={32} className="text-gray-500 mb-2" />
                )}
                <span
                  className={cn(
                    "text-center font-medium text-xs sm:text-sm truncate w-full",
                    item.name.startsWith("NUEVO") ? "text-blue-800" : "",
                  )}
                  title={item.name}
                >
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {item.type === "folder" ? "Carpeta" : "Archivo .rar"}
                </span>
                {item.name.startsWith("NUEVO") && (
                  <span className="bg-yellow-400 text-xs text-blue-900 px-1 py-0.5 rounded mt-1 font-medium">
                    NUEVO
                  </span>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
