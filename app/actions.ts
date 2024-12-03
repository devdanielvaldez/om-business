"use server"

interface CotizacionData {
  puertoEmbarque: string
  puertoDesembarque: string
  tipo: string
  cantidad: number
}

export async function cotizar(data: CotizacionData) {
  // Simular una llamada a un servicio externo
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generar precios de ejemplo
  const precios = [
    { descripcion: "Tarifa básica", valor: Math.random() * 1000 + 500 },
    { descripcion: "Seguro", valor: Math.random() * 200 + 100 },
    { descripcion: "Impuestos", valor: Math.random() * 300 + 150 },
  ]

  return precios
}

