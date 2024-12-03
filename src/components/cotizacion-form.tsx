"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { cotizar } from "@/app/actions"
import PreciosList from "@/components/precios-list"

const formSchema = z.object({
  puertoEmbarque: z.string().min(1, "El puerto de embarque es requerido"),
  puertoDesembarque: z.string().min(1, "El puerto de desembarque es requerido"),
  tipo: z.enum(["Opción 1", "Opción 2", "Opción 3"]),
  cantidad: z.number().min(1, "La cantidad debe ser mayor a 0"),
})

export default function CotizacionForm() {
  const [precios, setPrecios] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      puertoEmbarque: "",
      puertoDesembarque: "",
      tipo: "Opción 1",
      cantidad: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await cotizar(values)
      setPrecios(result)
    } catch (error) {
      console.error("Error al cotizar:", error)
    }
    setIsLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">Cotización de Envío</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="puertoEmbarque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puerto de Embarque</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el puerto de embarque" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="puertoDesembarque"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puerto de Desembarque</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el puerto de desembarque" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Opción 1">Opción 1</SelectItem>
                        <SelectItem value="Opción 2">Opción 2</SelectItem>
                        <SelectItem value="Opción 3">Opción 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cantidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cotizando...
                  </>
                ) : (
                  "Cotizar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {precios.length > 0 && <PreciosList precios={precios} />}
    </motion.div>
  )
}

