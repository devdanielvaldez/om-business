"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PreciosListProps {
  precios: any[]
}

export default function PreciosList({ precios }: PreciosListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-4"
    >
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-600">Precios Cotizados</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {precios.map((precio, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center bg-blue-100 p-2 rounded"
              >
                <span>{precio.descripcion}</span>
                <span className="font-bold">${precio.valor.toFixed(2)}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

