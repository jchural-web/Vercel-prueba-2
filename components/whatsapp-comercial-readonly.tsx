"use client"

import { RefreshCw } from "lucide-react"

export default function WhatsAppComercialReadonly() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Contenedor principal del chat con ancho máximo y borde - Con padding añadido */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          {/* Cabecera del chat */}
          <div className="bg-[#00bc3a] text-white p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00bc3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="font-medium text-sm">Alvarez, Prueba</span>
            </div>
            <button className="p-1 hover:bg-[#0e6b5e] rounded-full">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Área de mensajes con altura fija - Aumentada en un 30% */}
          <div
            className="h-[24rem] overflow-y-auto p-2"
            style={{
              backgroundColor: "#f2eae4",
            }}
          >
            {/* Mensaje 1 */}
            <div className="max-w-[80%] ml-auto mb-3">
              <div className="bg-[#d4f1ff] p-2 rounded-lg shadow-sm text-gray-800">
                <p className="text-xs">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#2979FF] text-white border border-[#90CAF9] mr-1">
                    Automático
                  </span>
                  <span className="font-medium">Hola prueba, te saluda de BSG INSTITUTE</span> Te hemos enviado un
                  correo electrónico con la información del{" "}
                  <span className="font-medium">Programa Internacional en Gerencia de Proyectos</span> que nos
                  solicitaste vía Llamada Telefonica. Estoy a tu disposición para poder resolver todas tus dudas o
                  consultas. Coméntame en que horario podría llamarte por teléfono.
                </p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">2024/04/24 10:16 AM</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2979FF]"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                    <polyline points="20 12 9 23 4 18"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Mensaje 2 */}
            <div className="max-w-[80%] ml-auto mb-3">
              <div className="bg-[#dcffde] p-2 rounded-lg shadow-sm text-gray-800">
                <p className="text-xs">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#00bc3a] text-white border border-[#A5D6A7] mr-1">
                    Manual
                  </span>
                  <span className="font-medium">Paola Lozano</span>
                  <br />
                  <span className="font-medium">Hola prueba, te saluda Paola Lozano de BSG INSTITUTE</span> Te hemos
                  enviado un correo electrónico con la información del{" "}
                  <span className="font-medium">Programa Internacional en Gerencia de Proyectos</span> que nos
                  solicitaste vía Llamada Telefonica. Estoy a tu disposición para poder resolver todas tus dudas o
                  consultas. Coméntame en que horario podría llamarte por teléfono.
                </p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">2024/05/30 04:06 PM</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#00bc3a]"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                    <polyline points="20 12 9 23 4 18"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Mensaje 3 - Adicional para mostrar más historial */}
            <div className="max-w-[80%] ml-auto mb-3">
              <div className="bg-[#d4f1ff] p-2 rounded-lg shadow-sm text-gray-800">
                <p className="text-xs">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#2979FF] text-white border border-[#90CAF9] mr-1">
                    Automático
                  </span>
                  Gracias por tu interés en nuestros programas. ¿Te gustaría agendar una cita para conversar sobre las
                  opciones de financiamiento disponibles?
                </p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-xs text-gray-600">2024/06/15 02:30 PM</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#2979FF]"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                    <polyline points="20 12 9 23 4 18"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
