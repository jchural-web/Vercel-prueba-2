"use client"

import { X, AlertCircle, HelpCircle, Download, Printer } from "lucide-react"
import { useState } from "react"

interface HistorialCrediticioModalProps {
  isOpen: boolean
  onClose: () => void
  data: any // En un caso real, definiríamos una interfaz más específica
}

export function HistorialCrediticioModal({ isOpen, onClose, data }: HistorialCrediticioModalProps) {
  const [activeTab, setActiveTab] = useState("resumen")

  if (!isOpen) return null

  // Función para renderizar el semáforo
  const renderSemaforo = (valor: number) => {
    if (valor === 0) return <div className="w-4 h-4 rounded-full bg-gray-300"></div>
    if (valor === 1) return <div className="w-4 h-4 rounded-full bg-red-500"></div>
    if (valor === 2) return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
    if (valor === 3) return <div className="w-4 h-4 rounded-full bg-blue-500"></div>
    return <div className="w-4 h-4 rounded-full bg-green-500"></div>
  }

  // Función para renderizar el indicador de calificación
  const renderCalificacion = (valor: number) => {
    if (valor === 0) return <span className="text-gray-500">Sin calificación</span>
    if (valor === 1) return <span className="text-red-500 font-medium">Deficiente</span>
    if (valor === 2) return <span className="text-orange-500 font-medium">Dudoso</span>
    if (valor === 3) return <span className="text-yellow-500 font-medium">CPP</span>
    if (valor === 4) return <span className="text-green-500 font-medium">Normal</span>
    return <span className="text-gray-500">Desconocido</span>
  }

  // Datos de ejemplo para el historial crediticio
  const documentosData = {
    fechaProceso: "24/03/2025",
    tipoDoc: "D",
    nDoc: "77137267",
    nombreRazon: "QUISPE MAMANI GILMER",
    score: "0.0000",
    deudaTotal: "3601.21",
    actual: 4,
    previo: 4,
    m12: "",
  }

  const semaforoData = Array(24).fill(4) // Semáforo con todos los meses en verde (4)

  const deudaSBSData = [
    { entidad: "BCP", calificacion: "NOR", monto: "2601.21", diasVencidos: "0", fechaReporte: "28/02/2025" },
    {
      entidad: "BCO FALABELLA PERÚ",
      calificacion: "NOR",
      monto: "1000",
      diasVencidos: "0",
      fechaReporte: "28/02/2025",
    },
  ]

  const datosGenerales = {
    fechaNacimiento: "01/06/1995",
    genero: "Masculino",
    digitoVerificador: "",
    digitoVerificadorAnterior: "",
  }

  const datosPrincipales = {
    ruc: "",
    razonSocial: "",
    nombreComercial: "",
    tipoContribuyente: "",
    estadoContribuyente: "",
    condicionContribuyente: "",
    dependencia: "",
    ciiu: "",
    inicioActividad: "31/12/1969",
    carnetPatronal: "",
    folio: "",
    asiento: "",
    telefono1: "",
    telefono2: "",
    telefono3: "",
  }

  const posicionHistorica = [
    {
      fecha: "24/03/2025",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "3601.21",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "24/02/2025",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "3904.99",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "22/01/2025",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "4616.13",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "20/12/2024",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "8332.08",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "22/11/2024",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "2153.71",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "21/10/2024",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "714.85",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "20/09/2024",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "3760.34",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
    {
      fecha: "22/08/2024",
      semaforo: 4,
      score: 0,
      numEntidades: 2,
      deudaTotal: "1590.25",
      porcentajeCalificacionNormal: 100,
      peorCalificacion: 1,
      deudaVencida: "",
      protestos: 0,
      docsProtestados: 0,
      deudaCastigada: 0,
      deudaJudicial: "",
      ctaCorriente: 0,
      tarjetaCredito: 0,
      otros: 0,
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#f0ebff]">
          <div className="flex items-center gap-3">
            <div className="bg-[#6419e6] text-white p-1.5 rounded-full">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#6419e6]">
              Historial Crediticio - {documentosData.nombreRazon}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500" title="Descargar reporte">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500" title="Imprimir reporte">
              <Printer className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500" title="Cerrar">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "resumen"
                ? "text-[#6419e6] border-b-2 border-[#6419e6]"
                : "text-gray-600 hover:text-[#6419e6]"
            }`}
            onClick={() => setActiveTab("resumen")}
          >
            Resumen
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "detalles"
                ? "text-[#6419e6] border-b-2 border-[#6419e6]"
                : "text-gray-600 hover:text-[#6419e6]"
            }`}
            onClick={() => setActiveTab("detalles")}
          >
            Detalles
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "historico"
                ? "text-[#6419e6] border-b-2 border-[#6419e6]"
                : "text-gray-600 hover:text-[#6419e6]"
            }`}
            onClick={() => setActiveTab("historico")}
          >
            Histórico
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "datos"
                ? "text-[#6419e6] border-b-2 border-[#6419e6]"
                : "text-gray-600 hover:text-[#6419e6]"
            }`}
            onClick={() => setActiveTab("datos")}
          >
            Datos Personales
          </button>
        </div>

        {/* Contenido del modal */}
        <div className="overflow-y-auto flex-1 p-4">
          {activeTab === "resumen" && (
            <div className="space-y-6">
              {/* Resumen principal */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Resumen Crediticio</div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Calificación Actual</h4>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-[#6419e6]">
                          {renderCalificacion(documentosData.actual)}
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {documentosData.actual === documentosData.previo
                            ? "Sin cambios"
                            : documentosData.actual > documentosData.previo
                              ? "Mejoró"
                              : "Empeoró"}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Deuda Total</h4>
                      <div className="text-2xl font-bold text-[#6419e6]">S/ {documentosData.deudaTotal}</div>
                      <div className="text-xs text-gray-500 mt-1">Actualizado al {documentosData.fechaProceso}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Entidades Financieras</h4>
                      <div className="text-2xl font-bold text-[#6419e6]">{deudaSBSData.length}</div>
                      <div className="text-xs text-gray-500 mt-1">Con deuda reportada</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Semáforo de los últimos 4 meses */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Semáforo de los últimos 4 meses</div>
                <div className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    {semaforoData.slice(0, 24).map((valor, index) => (
                      <div key={index} className="flex flex-col items-center">
                        {renderSemaforo(valor)}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Normal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>CPP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Dudoso</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Deficiente</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span>Sin información</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalle de la deuda SBS/Microfinanzas */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Detalle de la deuda SBS/Microfinanzas</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Entidad</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Calificación</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Monto</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Días Vencidos</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Fecha Reporte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deudaSBSData.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="py-3 px-4">{item.entidad}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {item.calificacion}
                            </span>
                          </td>
                          <td className="py-3 px-4">S/ {item.monto}</td>
                          <td className="py-3 px-4">{item.diasVencidos}</td>
                          <td className="py-3 px-4">{item.fechaReporte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Documento de Identidad Consultado */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Documento de Identidad Consultado</div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Tipo de Documento:</span>
                      <span className="ml-2">{documentosData.tipoDoc}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Número de Documento:</span>
                      <span className="ml-2">{documentosData.nDoc}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Nombre/Razón Social:</span>
                      <span className="ml-2">{documentosData.nombreRazon}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Fecha de Consulta:</span>
                      <span className="ml-2">{documentosData.fechaProceso}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "detalles" && (
            <div className="space-y-6">
              {/* Detalle de la deuda SBS/Microfinanzas */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Detalle de la deuda SBS/Microfinanzas</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Entidad</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Calificación</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Monto</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Días Vencidos</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Fecha Reporte</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deudaSBSData.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="py-3 px-4">{item.entidad}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {item.calificacion}
                            </span>
                          </td>
                          <td className="py-3 px-4">S/ {item.monto}</td>
                          <td className="py-3 px-4">{item.diasVencidos}</td>
                          <td className="py-3 px-4">{item.fechaReporte}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detalle Vencidos */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Detalle Vencidos</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Entidad</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Cantidad Docs</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Fuente</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Monto</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Días Vencidos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          No records available.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Utilización de Líneas de Crédito */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Utilización de Líneas de Crédito</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Entidad</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Tipo Cuenta</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Línea Aprobada</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Línea No Utilizada</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Línea Utilizada</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-gray-500">
                          No records available.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Otros Documentos de Identidad Relacionados */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">
                  Otros Documentos de Identidad Relacionados
                </div>
                <div className="p-4">
                  <div className="text-center text-gray-500 py-4">No se encontraron documentos relacionados.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "historico" && (
            <div className="space-y-6">
              {/* Posición Histórica */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Posición Histórica</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Fecha</th>
                        <th className="py-2 px-4 text-center font-medium text-gray-700">Semáforo</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Score</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Num. Entidades</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Deuda Total</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">% Cal. Normal</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Peor Calificación</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Deuda Vencida</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posicionHistorica.map((item, index) => (
                        <tr key={index} className={`border-t border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                          <td className="py-3 px-4">{item.fecha}</td>
                          <td className="py-3 px-4 text-center">{renderSemaforo(item.semaforo)}</td>
                          <td className="py-3 px-4">{item.score}</td>
                          <td className="py-3 px-4">{item.numEntidades}</td>
                          <td className="py-3 px-4">S/ {item.deudaTotal}</td>
                          <td className="py-3 px-4">{item.porcentajeCalificacionNormal}%</td>
                          <td className="py-3 px-4">{renderCalificacion(item.peorCalificacion)}</td>
                          <td className="py-3 px-4">{item.deudaVencida || "0"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gráfico de evolución de deuda */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Evolución de Deuda Total</div>
                <div className="p-4 h-64 flex items-center justify-center">
                  <div className="text-gray-500 text-sm">
                    Gráfico de evolución de deuda (Componente de gráfico se implementaría aquí)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "datos" && (
            <div className="space-y-6">
              {/* Datos Generales */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Datos Generales</div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Fecha de Nacimiento:</span>
                      <span className="ml-2">{datosGenerales.fechaNacimiento}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Género:</span>
                      <span className="ml-2">{datosGenerales.genero}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Dígito Verificador:</span>
                      <span className="ml-2">{datosGenerales.digitoVerificador || "No disponible"}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Dígito Verificador Anterior:</span>
                      <span className="ml-2">{datosGenerales.digitoVerificadorAnterior || "No disponible"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Datos Principales */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Datos Principales</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Ruc</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Razón Social</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Nombre Comercial</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Tipo de Contribuyente</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Estado de Contribuyente</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Condición Contribuyente</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Dependencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="py-3 px-4">{datosPrincipales.ruc || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.razonSocial || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.nombreComercial || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.tipoContribuyente || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.estadoContribuyente || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.condicionContribuyente || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.dependencia || "No disponible"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">CIIU</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Inicio de Actividad</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Carnet Patronal</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Folio</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Asiento</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Teléfono 1</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Teléfono 2</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Teléfono 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="py-3 px-4">{datosPrincipales.ciiu || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.inicioActividad}</td>
                        <td className="py-3 px-4">{datosPrincipales.carnetPatronal || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.folio || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.asiento || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.telefono1 || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.telefono2 || "No disponible"}</td>
                        <td className="py-3 px-4">{datosPrincipales.telefono3 || "No disponible"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Direcciones Registradas */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-[#f0ebff] p-3 font-medium text-[#6419e6]">Direcciones Registradas</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Dirección</th>
                        <th className="py-2 px-4 text-left font-medium text-gray-700">Fuente</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2} className="py-4 text-center text-gray-500">
                          No se encontraron direcciones registradas.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pie del modal */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <HelpCircle className="h-4 w-4" />
            <span>La información mostrada corresponde a la última actualización disponible.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#6419e6] hover:bg-[#5315c1] text-white rounded-md text-sm font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
