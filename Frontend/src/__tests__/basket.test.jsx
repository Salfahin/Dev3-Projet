import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PanierPage from '../pages/basket';

// Mock localStorage pour Jest
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

// Mock complet de react-router-dom
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <>{children}</>,
  Routes: ({ children }) => <>{children}</>,
  Route: ({ element }) => element,
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
}));

// Helper pour wrapper avec BrowserRouter
const renderWithRouter = (ui) => render(<>{ui}</>);

describe('PanierPage', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test('affiche "Votre panier est vide" si aucun produit', () => {
    localStorage.setItem('panier', JSON.stringify([]));
    renderWithRouter(<PanierPage />);
    expect(screen.getByText(/Votre panier est vide/i)).toBeInTheDocument();
  });

  test('charge le panier depuis localStorage', () => {
    const panierFake = [{ name: 'Produit A', price: 10, quantite: 1 }];
    localStorage.setItem('panier', JSON.stringify(panierFake));

    renderWithRouter(<PanierPage />);

    expect(screen.getByText(/Produit A/i)).toBeInTheDocument();

    // Sélectionner uniquement le h2 qui contient le total général
    const totalHeading = screen.getByRole('heading', { name: /Total : 10.00 €/i, level: 2 });
    expect(totalHeading).toBeInTheDocument();
  });

  test('incrémente la quantité d’un produit', () => {
    const panierFake = [{ name: 'Produit A', price: 10, quantite: 1 }];
    localStorage.setItem('panier', JSON.stringify(panierFake));

    renderWithRouter(<PanierPage />);

    const boutonPlus = screen.getByRole('button', { name: '+' });
    fireEvent.click(boutonPlus);

    expect(screen.getByText('2')).toBeInTheDocument();

    const totalHeading = screen.getByRole('heading', { name: /Total : 20.00 €/i, level: 2 });
    expect(totalHeading).toBeInTheDocument();
  });

  test('décrémente la quantité et supprime si quantité = 0', () => {
    const panierFake = [{ name: 'Produit A', price: 10, quantite: 1 }];
    localStorage.setItem('panier', JSON.stringify(panierFake));

    renderWithRouter(<PanierPage />);

    const boutonMoins = screen.getByRole('button', { name: '-' });
    fireEvent.click(boutonMoins);

    expect(screen.getByText(/Votre panier est vide/i)).toBeInTheDocument();
  });

  test('supprime un produit avec le bouton "Supprimer"', () => {
    const panierFake = [
      { name: 'Produit A', price: 10, quantite: 1 },
      { name: 'Produit B', price: 5, quantite: 2 },
    ];
    localStorage.setItem('panier', JSON.stringify(panierFake));

    renderWithRouter(<PanierPage />);

    const boutonSupprimer = screen.getAllByText(/Supprimer/i)[0];
    fireEvent.click(boutonSupprimer);

    expect(screen.queryByText(/Produit A/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Produit B/i)).toBeInTheDocument();
  });

  test('navigue vers /checkout quand on clique sur "Passer à l\'achat"', () => {
    const panierFake = [{ name: 'Produit A', price: 10, quantite: 1 }];
    localStorage.setItem('panier', JSON.stringify(panierFake));

    renderWithRouter(<PanierPage />);

    const boutonAchat = screen.getByRole('button', { name: /Passer à l'achat/i });
    fireEvent.click(boutonAchat);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });
});
