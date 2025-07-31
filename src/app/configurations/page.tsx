// the page to buy pre-built configs.

'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'

type Configuration = {
    config_id: number
    config_name: string
}

type Part = {
    part_id: number
    part_name: string
    part_manufacturer: string
    part_price: number
    part_type: number
}

type Specification = {
    part_specification: string
    part_specification_value: string
}

export default function ConfigurationsPage() {
    const [configurations, setConfigurations] = useState<Configuration[]>([])
    const [selectedConfig, setSelectedConfig] = useState<Configuration | null>(null)

    const [parts, setParts] = useState<Part[]>([])
    const [selectedPart, setSelectedPart] = useState<Part | null>(null)

    const [specs, setSpecs] = useState<Specification[]>([])

  // Fetch configurations au montage
    useEffect(() => {
        const fetchConfigurations = async () => {
        const { data, error } = await supabase.from('configurations').select('*')
        if (error) {
            console.error('Erreur fetch configurations:', error)
        } else {
            console.log('Configurations chargées:', data)
            setConfigurations(data ?? [])
        }
    }
    fetchConfigurations()
  }, [])

  // Au clic sur une config, récupère les parts associées
    useEffect(() => {
        if (!selectedConfig) {
            console.log('Aucune config sélectionnée')
            setParts([])
            setSelectedPart(null)
            setSpecs([])
            return
        }

        const fetchParts = async () => {
            console.log('Chargement des parts pour config:', selectedConfig.config_name)

        // Ici on récupère les parts via la relation config_part_id
        // Supposons que configurations_parts a un champ config_part_id qui référence parts.part_id
            const { data, error } = await supabase
            .from('configurations_parts')
            .select(`
                parts:config_part_id (
                part_id,
                part_name,
                part_manufacturer,
                part_price,
                part_type
                )
            `)
            .eq('config_id', selectedConfig.config_id)


            if (error) {
                console.error('Erreur fetch parts:', error)
                setParts([])
                setSelectedPart(null)
                setSpecs([])
                return
            }

            console.log('Data configurations_parts:', data)

            const partsList: Part[] = []
            data?.forEach(item => {
                if (Array.isArray(item.parts)) {
                    partsList.push(...item.parts)
                } else if (item.parts) {
            // Par sécurité, si parts n’est pas tableau mais objet
                partsList.push(item.parts)
                }
            })

            console.log('Parts récupérées:', partsList)

            setParts(partsList)
            setSelectedPart(null)
            setSpecs([])
        }
        fetchParts()
    }, [selectedConfig])

    // Au clic sur un part, récupère ses specs
    useEffect(() => {
        if (!selectedPart) {
            setSpecs([])
            return
        }

    const fetchSpecs = async () => {
        console.log('Chargement specs pour part:', selectedPart.part_name)
        const { data, error } = await supabase
        .from('parts_specifications')
        .select('part_specification, part_specification_value')
        .eq('part_id', selectedPart.part_id)

        if (error) {
            console.error('Erreur fetch specifications:', error)
            setSpecs([])
        } else {
            console.log('Specs récupérées:', data)
            setSpecs(data ?? [])
        }
    }

    fetchSpecs()
    }, [selectedPart])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Configurations Préfaites</h1>
            <div className="flex gap-4">
            {/* Configurations */}
                <div className="w-1/3 border p-4 rounded-lg">
                    <h2 className="font-semibold mb-2">Configurations</h2>
                    {configurations.map(config => (
                        <div
                            key={config.config_id}
                            onClick={() => {
                            console.log('Config sélectionnée:', config)
                            setSelectedConfig(config)
                            setSelectedPart(null) // reset composant
                            setSpecs([]) // reset specs
                            }}
                            className={`cursor-pointer p-2 rounded ${
                            selectedConfig?.config_id === config.config_id
                            ? 'bg-purple-200 text-purple-900 font-semibold'
                            : 'hover:bg-purple-100 hover:text-purple-900'
                            }`}
                        >
                            {config.config_name}
                        </div>
                    ))}
                </div>

                    {/* Composants (affichés seulement si une config est sélectionnée) */}
                    {selectedConfig && (
                        <div className="w-1/3 border p-4 rounded-lg transition-opacity duration-200">
                        <h2 className="font-semibold mb-2">Composants</h2>
                        {parts.length > 0 ? (
                        parts.map(part => (
                            <div
                                key={part.part_id}
                                onClick={() => {
                                console.log('Part sélectionné:', part)
                                setSelectedPart(part)
                                }}
                                className={`cursor-pointer p-2 rounded ${
                                    selectedPart?.part_id === part.part_id
                                    ? 'bg-purple-200 text-purple-900 font-semibold'
                                    : 'hover:bg-purple-100 hover:text-purple-900'
                                }`}
                            >
                                {part.part_name} – {part.part_manufacturer} ({part.part_price} €)
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-500">Aucun composant.</p>
                        )}
                        </div>
                    )}

                    {/* Spécifications (affichées seulement si un composant est sélectionné) */}
                    {selectedPart && (
                        <div className="w-1/3 border p-4 rounded-lg transition-opacity duration-200">
                            <h2 className="font-semibold mb-2">Spécifications</h2>
                            {specs.length > 0 ? (
                                <ul className="text-sm">
                                {specs.map(spec => (
                                    <li
                                    key={`${spec.part_specification}-${spec.part_specification_value}`}
                                    className="py-1 border-b last:border-none"
                                    >
                                    <strong>{spec.part_specification}:</strong> {spec.part_specification_value}
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Aucune spécification trouvée.</p>
                            )}
                        </div>
                    )}
            </div>
        </div>
    )
}