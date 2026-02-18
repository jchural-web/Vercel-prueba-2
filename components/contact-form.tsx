"use client"

import { Phone, Mail, FileText, Copy, MessageSquare } from "lucide-react"

export default function ContactForm() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Información de contacto</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-4">
          {/* Celular 1 */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="bg-purple-100 p-1.5 rounded-full">
                <Phone className="h-4 w-4 text-purple-600" />
              </div>
              Celular 1
            </label>
            <div className="flex">
              <input
                type="text"
                defaultValue="+51922191058"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
              <div className="flex">
                <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-gray-100 transition-colors">
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
                <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Teléfono 1 */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <Phone className="h-4 w-4 text-gray-600" />
              </div>
              Teléfono 1
            </label>
            <div className="flex">
              <input
                type="text"
                defaultValue="Teléfono Principal"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
              <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Email 1 */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="bg-blue-100 p-1.5 rounded-full">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              Email 1
            </label>
            <div className="flex">
              <input
                type="email"
                defaultValue="PruebaAlvarez@gmail.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
              <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-blue-50 hover:text-blue-500 rounded-r-lg transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="space-y-4">
          {/* Celular 2 */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="bg-purple-100 p-1.5 rounded-full">
                <Phone className="h-4 w-4 text-purple-600" />
              </div>
              Celular 2
            </label>
            <div className="flex">
              <input
                type="text"
                defaultValue="+51"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
              <div className="flex">
                <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-gray-100 transition-colors">
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
                <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Teléfono 2 */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <Phone className="h-4 w-4 text-gray-600" />
              </div>
              Teléfono 2
            </label>
            <div className="flex">
              <input
                type="text"
                defaultValue="Teléfono Secundario"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
              <button className="bg-gray-50 border-t border-b border-r border-gray-300 p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Email 2 */}
          <div className="flex flex-col space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="bg-gray-100 p-1.5 rounded-full">
                <Mail className="h-4 w-4 text-gray-600" />
              </div>
              Email 2
            </label>
            <div className="flex">
              <input
                type="email"
                defaultValue="Email Secundario"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categoría */}
      <div className="mt-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <div className="bg-green-100 p-1.5 rounded-full">
            <FileText className="h-4 w-4 text-green-600" />
          </div>
          Categoría
        </label>
        <div className="flex">
          <input
            type="text"
            defaultValue="Llamada Oficina"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end mt-8 gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
