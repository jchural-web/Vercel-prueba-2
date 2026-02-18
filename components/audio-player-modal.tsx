"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface AudioPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  audioUrl: string
  callInfo: {
    fecha: string
    hora: string
    duracion: string
    contacto: string
  }
}

export function AudioPlayerModal({ isOpen, onClose, audioUrl, callInfo }: AudioPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reproducir Grabación</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Fecha:</span> {callInfo?.fecha}
            </div>
            <div>
              <span className="text-gray-600">Hora:</span> {callInfo?.hora}
            </div>
            <div>
              <span className="text-gray-600">Duración:</span> {callInfo?.duracion}
            </div>
            <div>
              <span className="text-gray-600">Contacto:</span> {callInfo?.contacto}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={togglePlay} size="icon" variant="outline">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{formatTime(currentTime)}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{formatTime(duration)}</span>
              </div>
            </div>
            <Volume2 className="h-4 w-4 text-gray-600" />
          </div>

          <audio ref={audioRef} src={audioUrl} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
