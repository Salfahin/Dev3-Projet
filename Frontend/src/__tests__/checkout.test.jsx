import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutPage from "../pages/Checkout";
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();

// Mock react-router-dom (on se base sur __mocks__/react-router-dom.js)
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe("CheckoutPage", () => {
  test("affiche 'Votre panier est vide' si aucun produit", () => {
    localStorage.setItem("panier", JSON.stringify([]));
    render(<CheckoutPage />);
    expect(screen.getByText(/Votre panier est vide/i)).toBeInTheDocument();
  });

  test("affiche les produits du panier si présents", () => {
    localStorage.setItem(
      "panier",
      JSON.stringify([{ name: "Produit A", price: 10, quantite: 1 }])
    );
    render(<CheckoutPage />);
    expect(screen.getByText(/Produit A/i)).toBeInTheDocument();
    expect(screen.getByText(/Total : 10.00 €/i)).toBeInTheDocument();
  });

  test("soumet le formulaire et navigue après succès", async () => {
    localStorage.setItem(
      "panier",
      JSON.stringify([{ name: "Produit A", price: 10, quantite: 1 }])
    );
    render(<CheckoutPage />);

    // Remplir le formulaire
    fireEvent.change(screen.getByPlaceholderText("Prénom"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nom"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse"), {
      target: { value: "1 rue Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Ville"), {
      target: { value: "Paris" },
    });
    fireEvent.change(screen.getByPlaceholderText("Code Postal"), {
      target: { value: "75001" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adresse email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Téléphone"), {
      target: { value: "0123456789" },
    });

    // Choisir livraison et paiement
    fireEvent.click(screen.getByDisplayValue("pointRelais"));
    fireEvent.click(screen.getByDisplayValue("paypal"));

    // Soumettre le formulaire
    fireEvent.click(screen.getByText(/Valider la commande/i));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
    });

    expect(localStorage.getItem("panier")).toBeNull();
  });

  test("alerte si champs obligatoires manquants", () => {
    localStorage.setItem(
      "panier",
      JSON.stringify([{ name: "Produit A", price: 10, quantite: 1 }])
    );
    render(<CheckoutPage />);

    // Soumettre sans remplir le formulaire
    window.alert = jest.fn();
    fireEvent.click(screen.getByText(/Valider la commande/i));

    expect(window.alert).toHaveBeenCalledWith(
      "Veuillez remplir tous les champs obligatoires."
    );
  });
});
