import { Metadata } from "next"
import CotizacionForm from "@/components/cotizacion-form"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Cotización de Envío",
  description: "Formulario animado para cotizar envíos",
}

export default function CotizacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Image
          src="/placeholder.svg?height=60&width=200"
          alt="Logo de la empresa"
          width={200}
          height={60}
          className="mx-auto"
        />
      </div>
      <CotizacionForm />
    </div>
  )
}

