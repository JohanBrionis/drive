"use client"

import { useState, useEffect } from "react"
import { Folder, File, ChevronLeft, ChevronRight, Home, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Sample data structure for our drive
const driveData = {
  name: "Mi Pack de Cursos",
  type: "folder",
  children: [
    {
      name: "Desarrollo Web",
      type: "folder",
      children: [
        { name: "HTML y CSS Básico.rar", type: "file" },
        { name: "JavaScript Fundamentals.rar", type: "file" },
        { name: "React desde Cero.rar", type: "file" },
      ],
    },
    {
      name: "Diseño Gráfico",
      type: "folder",
      children: [
        { name: "Photoshop Avanzado.rar", type: "file" },
        { name: "Illustrator para Principiantes.rar", type: "file" },
        {
          name: "Recursos",
          type: "folder",
          children: [
            { name: "Brushes Premium.rar", type: "file" },
            { name: "Templates PSD.rar", type: "file" },
          ],
        },
      ],
    },
    {
      name: "Marketing Digital",
      type: "folder",
      children: [
        { name: "SEO Completo.rar", type: "file" },
        { name: "Google Ads.rar", type: "file" },
        { name: "Social Media Marketing.rar", type: "file" },
      ],
    },
    { name: "Bonus - Recursos Exclusivos.rar", type: "file" },
  ],
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
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Mi Drive Simulator</h1>
        </div>
      </header>

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

                {/* Sidebar folders */}
                <div className="mt-4 space-y-1">
                  {driveData.children
                    .filter((item) => item.type === "folder")
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
                  item.type === "folder" ? "hover:bg-blue-50" : "hover:bg-gray-50",
                )}
                onClick={() => (item.type === "folder" ? navigateToFolder(item) : null)}
              >
                {item.type === "folder" ? (
                  <Folder size={32} className="text-blue-600 mb-2" />
                ) : (
                  <File size={32} className="text-gray-500 mb-2" />
                )}
                <span className="text-center font-medium text-xs sm:text-sm truncate w-full" title={item.name}>
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {item.type === "folder" ? "Carpeta" : "Archivo .rar"}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
