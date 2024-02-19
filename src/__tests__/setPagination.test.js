// Importer la fonction à tester et ses dépendances
import { setPagination } from '../setPagination';
import { setCurrentPage } from '../setCurrentPage';
import { setNumberPages } from '../setNumberPages';

// Mock des fonctions dépendantes
jest.mock('../setCurrentPage', () => ({
  setCurrentPage: jest.fn(),
}));
jest.mock('../setNumberPages', () => ({
  setNumberPages: jest.fn(),
}));

describe('setPagination', () => {
  // Avant chaque test, réinitialiser les mocks
  beforeEach(() => {
    setCurrentPage.mockClear();
    setNumberPages.mockClear();
  });

  it('calculates pagination correctly', () => {
    // Configurer les mocks pour retourner des valeurs spécifiques
    setCurrentPage.mockImplementation(({ max, skip }) => Math.ceil(skip / max));
    setNumberPages.mockImplementation(({ total, max }) => Math.ceil(total / max));

    // Définir les valeurs d'entrée pour le test
    const total = 100;
    const skip = 10;
    const max = 10;

    // Appeler la fonction setPagination avec les valeurs d'entrée
    const result = setPagination({ total, skip, max });

    // Vérifier que les fonctions mockées ont été appelées correctement
    expect(setCurrentPage).toHaveBeenCalledWith({ max, skip });
    expect(setNumberPages).toHaveBeenCalledWith({ total, max });

    // Vérifier que le résultat est celui attendu
    const expected = {
      total: 100,
      numberItems: 10,
      numberPages: 10,
      currentPage: 1,
    };
    expect(result).toEqual(expected);
  });

  // Ajouter plus de tests pour couvrir d'autres scénarios si nécessaire
});
