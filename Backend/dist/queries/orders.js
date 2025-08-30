"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creerCommande = void 0;
const supabaseClient_1 = require("../lib/supabaseClient");
const creerCommande = async (req, res) => {
    const { client, livraison, paiement, items, total_price } = req.body;
    if (!client || !items || !total_price || !livraison || !paiement) {
        return res.status(400).json({ error: "Données manquantes" });
    }
    const { data, error } = await supabaseClient_1.supabase.from("orders").insert([{
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
    if (error)
        return res.status(500).json({ error: error.message });
    res.status(200).json({ success: true, order: data[0] });
};
exports.creerCommande = creerCommande;
