import React, { useState, useEffect } from "react";

export default function CheckoutPage() {
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!client.nom || !client.prenom || !client.email || !client.telephone) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const commande = {
      client,
      livraison,
      paiement,
      panier,
      total,
      date: new Date().toISOString(),
    };

    console.log("Commande envoyée :", commande);
    alert("Commande validée ! Merci pour votre achat.");
    localStorage.removeItem("panier");
    setPanier([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Finaliser la commande</h1>
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
                <span>
                  {(item.price * (item.quantite || 1)).toFixed(2)} €
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-bold">Total : {total.toFixed(2)} €</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Informations de facturation</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={client.prenom}
              onChange={handleChangeClient}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={client.nom}
              onChange={handleChangeClient}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={client.adresse}
            onChange={handleChangeClient}
            className="border p-2 rounded w-full"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="ville"
              placeholder="Ville"
              value={client.ville}
              onChange={handleChangeClient}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="text"
              name="codePostal"
              placeholder="Code Postal"
              value={client.codePostal}
              onChange={handleChangeClient}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={client.email}
            onChange={handleChangeClient}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            value={client.telephone}
            onChange={handleChangeClient}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Mode de livraison</h2>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="domicile"
              checked={livraison === "domicile"}
              onChange={(e) => setLivraison(e.target.value)}
            />
            <span>Livraison à domicile</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="pointRelais"
              checked={livraison === "pointRelais"}
              onChange={(e) => setLivraison(e.target.value)}
            />
            <span>Point relais</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="retraitMagasin"
              checked={livraison === "retraitMagasin"}
              onChange={(e) => setLivraison(e.target.value)}
            />
            <span>Retrait en magasin</span>
          </label>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Mode de paiement</h2>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="cb"
              checked={paiement === "cb"}
              onChange={(e) => setPaiement(e.target.value)}
            />
            <span>Carte bancaire</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="paypal"
              checked={paiement === "paypal"}
              onChange={(e) => setPaiement(e.target.value)}
            />
            <span>PayPal</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="virement"
              checked={paiement === "virement"}
              onChange={(e) => setPaiement(e.target.value)}
            />
            <span>Virement bancaire</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Valider la commande
        </button>
      </form>
    </div>
  );
}
