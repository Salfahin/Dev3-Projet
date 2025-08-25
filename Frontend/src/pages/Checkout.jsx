import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function CheckoutPage() {
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const [client, setClient] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    ville: "",
    codePostal: "",
    email: "",
    telephone: "",
  });

  const [paiement, setPaiement] = useState("cb");
  const [livraison, setLivraison] = useState("domicile");

  useEffect(() => {
    const panierSauvegarde = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierSauvegarde);
  }, []);

  useEffect(() => {
    const montant = panier.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantite || 1),
      0
    );
    setTotal(montant);
  }, [panier]);

  const handleChangeClient = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification minimale
    if (!client.nom || !client.prenom || !client.email || !client.telephone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const commande = {
      client,
      livraison,
      paiement,
      items: panier,
      total_price: total
    };

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commande)
      });

      const data = await response.json();

      if (data.success) {
        alert("Commande enregistrée !");
        localStorage.removeItem("panier");
        setPanier([]);
        navigate("/confirmation");
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur, veuillez réessayer plus tard.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Finaliser la commande</h1>

      {/* Récapitulatif du panier */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Votre Panier</h2>
        {panier.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <ul className="space-y-2">
            {panier.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>
                  {item.name} x {item.quantite || 1}
                </span>
                <span>{(item.price * (item.quantite || 1)).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-bold">Total : {total.toFixed(2)} €</p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Informations de facturation</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="prenom" placeholder="Prénom" value={client.prenom} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
            <input type="text" name="nom" placeholder="Nom" value={client.nom} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
          </div>
          <input type="text" name="adresse" placeholder="Adresse" value={client.adresse} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="ville" placeholder="Ville" value={client.ville} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
            <input type="text" name="codePostal" placeholder="Code Postal" value={client.codePostal} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
          </div>
          <input type="email" name="email" placeholder="Adresse email" value={client.email} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
          <input type="tel" name="telephone" placeholder="Téléphone" value={client.telephone} onChange={handleChangeClient} className="border p-2 rounded w-full" required />
        </div>

        {/* Livraison */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Mode de livraison</h2>
          {["domicile", "pointRelais", "retraitMagasin"].map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input type="radio" value={mode} checked={livraison === mode} onChange={(e) => setLivraison(e.target.value)} />
              <span>
                {mode === "domicile" ? "Livraison à domicile" : mode === "pointRelais" ? "Point relais" : "Retrait en magasin"}
              </span>
            </label>
          ))}
        </div>

        {/* Paiement */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Mode de paiement</h2>
          {["cb", "paypal", "virement"].map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input type="radio" value={mode} checked={paiement === mode} onChange={(e) => setPaiement(e.target.value)} />
              <span>{mode === "cb" ? "Carte bancaire" : mode === "paypal" ? "PayPal" : "Virement bancaire"}</span>
            </label>
          ))}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Valider la commande
        </button>
      </form>
    </div>
  );
}
