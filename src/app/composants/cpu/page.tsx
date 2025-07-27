'use client'
import { useEffect, useState } from "react"
import supabase from '@/lib/supabaseClient'

type CPU = {
    name: string
    manufacturer: string
    price: number
    specs: {
        cores: number
        threads: number
    }
}

export default function CPUPage() {
    const [cpus, setCpus] = useState<CPU[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCPUs = async () => {
            const { data, error } = await supabase
            .from('parts')
            .select(`
                part_name, 
                part_manufacturer, 
                part_price, 
                parts_specifications (
                    part_specification, 
                    part_specification_value
                )
            `)
            .eq('part_type', '0')
      
        if (error) {
            console.error('Erreur Supabase:', error)
            setLoading(false)
            return
        }
        else {console.log("Données : ", data)}

        if (!data) {
            setLoading(false)
            return
        }

// Map pour grouper par CPU
        const cpuMap = new Map<string, CPU>()

        data.forEach((item: any) => {
// Crée une entrée CPU si pas existante
            if (!cpuMap.has(item.part_name)) {
                cpuMap.set(item.part_name, {
                    name: item.part_name,
                    manufacturer: item.part_manufacturer,
                    price: Number(item.part_price),
                    specs: {
                        cores: 0,
                        threads: 0,
                    }
                })
            }

            const cpu = cpuMap.get(item.part_name)!

            item.parts_specifications.forEach((spec: any) => {
                if (spec.part_specification === 'Core Count') {
                    cpu.specs.cores = Number(spec.part_specification_value)
                }
                if (spec.part_specification === 'Thread Count') {
                    cpu.specs.threads = Number(spec.part_specification_value)
                }
            })
        })

        setCpus(Array.from(cpuMap.values()))
        setLoading(false)
        }

        fetchCPUs()
    }, [])

    if (loading) return <p className="p-4">Chargement des CPU...</p>

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Liste des Processeurs (CPU)</h1>
        {cpus.length === 0 && <p className="text-gray-500">Aucun processeur trouvé.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cpus.map(cpu => (
            <div key={cpu.name} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">{cpu.name}</h2>
                <p className="text-sm text-gray-500">{cpu.manufacturer}</p>
                <div className="mt-2 text-sm">
                <p><strong>Cœurs :</strong> {cpu.specs.cores}</p>
                <p><strong>Threads :</strong> {cpu.specs.threads}</p>
                <p><strong>Prix :</strong> {cpu.price} €</p>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Ajouter à une config
                </button>
            </div>
            ))}
        </div>
        </div>
    )
}
