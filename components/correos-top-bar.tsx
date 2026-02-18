"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw, Plus, Filter, MoreVertical } from "lucide-react"
import Link from "next/link"

export function CorreosTopBar() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2 w-full max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar correos..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" title="Actualizar">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Filtrar">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/correos/nuevo">
          <Button className="bg-[#1a56db] hover:bg-[#1e429f] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo correo
          </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
