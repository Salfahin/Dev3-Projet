import React, { useState, useEffect } from "react";
import { SlBasketLoaded } from "react-icons/sl";
import { useNavigate } from "react-router-dom"; 

export default function PanierPage() {
  const [panier, setPanier] = useState([]);
  const navigate = useNavigate();

  // Charger le panier depuis localStorage
  useEffect(() => {
    const panierSauvegarde = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierSauvegarde);
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(panier));
  }, [panier]);

  // Augmenter la quantité d'un produit
  const incrementer = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier[index].quantite = (nouveauPanier[index].quantite || 1) + 1;
    setPanier(nouveauPanier);
  };

  // Diminuer la quantité d'un produit (et supprimer si  = 0)
  const decrementer = (index) => {
    const nouveauPanier = [...panier];
    const nouvelleQuantite = (nouveauPanier[index].quantite || 1) - 1;

    if (nouvelleQuantite <= 0) {
      nouveauPanier.splice(index, 1);
    } else {
      nouveauPanier[index].quantite = nouvelleQuantite;
    }

    setPanier(nouveauPanier);
  };

  // Supprimer un produit
  const supprimerProduit = (index) => {
    const nouveauPanier = panier.filter((_, i) => i !== index);
    setPanier(nouveauPanier);
  };

  // Calculer le total
  const total = panier.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantite || 1),
    0
  );

  if (panier.length === 0) {
    return <p className="text-gray-500">Votre panier est vide.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <SlBasketLoaded />
        Mon Panier
      </h1>
      <ul className="space-y-4">
        {panier.map((item, index) => (
          <li
            key={index}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.manufacturer}</p>
              <p className="text-sm">
                Prix unitaire : {item.price} € — Sous-total :{" "}
                {(item.price * (item.quantite || 1)).toFixed(2)} €
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decrementer(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                -
              </button>
              <span>{item.quantite || 1}</span>
              <button
                onClick={() => incrementer(index)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                +
              </button>
              <button
                onClick={() => supprimerProduit(index)}
                className="ml-4 bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-6">Total : {total.toFixed(2)} €</h2>
      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Passer à l'achat
      </button>
    </div>
  );
}
