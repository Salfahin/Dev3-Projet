'use client'
import { useEffect, useState } from "react"
import supabase from '@/lib/supabaseClient'

type motherboard = {
    name: string
    manufacturer: string
    price: number
    specs: {
        formFactor : string
        socket : string
    }
}

export default function motherboardPage() {
    const [motherboards, setMotherboards] = useState<motherboard[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMotherboards = async () => {
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
            .eq('part_type', '4')
      
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

        // Map pour grouper par carte-mère
        const motherboardMap = new Map<string, motherboard>()

        data.forEach((item: any) => {
        // Crée une entrée carte-mère si pas existante
            if (!motherboardMap.has(item.part_name)) {
                motherboardMap.set(item.part_name, {
                    name: item.part_name,
                    manufacturer: item.part_manufacturer,
                    price: Number(item.part_price),
                    specs: {
                        formFactor : '',
                        socket : '',
                    }
                })
            }

            const motherboard = motherboardMap.get(item.part_name)!

            item.parts_specifications.forEach((spec: any) => {
                if (spec.part_specification === 'Form Factor') {
                    motherboard.specs.formFactor = String(spec.part_specification_value)
                }
                if (spec.part_specification === 'Socket') {
                    motherboard.specs.socket = String(spec.part_specification_value)
                }
            })
        })

        setMotherboards(Array.from(motherboardMap.values()))
        setLoading(false)
        }

        fetchMotherboards()
    }, [])

    if (loading) return <p className="p-4">Chargement des carte-mères...</p>

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Liste des carte-mères</h1>
        {motherboards.length === 0 && <p className="text-gray-500">Aucune carte-mère trouvée.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {motherboards.map(motherboard => (
            <div key={motherboard.name} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <h2 className="text-xl font-semibold">{motherboard.name}</h2>
                <p className="text-sm text-gray-500">{motherboard.manufacturer}</p>
                <div className="mt-2 text-sm">
                <p><strong>Form Factor :</strong> {motherboard.specs.formFactor}</p>
                <p><strong>Socket :</strong> {motherboard.specs.socket}</p>
                <p><strong>Prix :</strong> {motherboard.price} €</p>
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
