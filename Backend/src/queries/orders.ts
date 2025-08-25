import { Request, Response } from "express";
import { supabase } from "../lib/supabaseClient";

interface ClientInfo {
  nom: string;
  prenom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  email: string;
  telephone: string;
}

interface OrderBody {
  client: ClientInfo;
  livraison: string;
  paiement: string;
  items: any[];
  total_price: number;
}

export const creerCommande = async (req: Request, res: Response) => {
  const { client, livraison, paiement, items, total_price } = req.body as OrderBody;

  if (!client || !items || !total_price || !livraison || !paiement) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const { data, error } = await supabase.from("orders").insert([{
    client_nom: client.nom,
    client_prenom: client.prenom,
    client_adresse: client.adresse,
    client_ville: client.ville,
    client_code_postal: client.codePostal,
    client_email: client.email,
    client_telephone: client.telephone,
    livraison,
    paiement,
    items,
    total_price
  }]).select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ success: true, order: data[0] });
};