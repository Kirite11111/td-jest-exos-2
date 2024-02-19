import { isValidDate, formatDate, setDate } from '../formatDate';

describe('Tests pour isValidDate', () => {
    it('doit retourner true pour une date invalide en tant que chaîne', () => {
        expect(isValidDate('not a date')).toBe(true);
    });

    it('doit retourner false pour null', () => {
        expect(isValidDate(null)).toBe(false);
    });

    it('doit retourner false pour undefined', () => {
        expect(isValidDate(undefined)).toBe(false);
    });

    it('doit retourner false pour une chaîne vide', () => {
        expect(isValidDate('')).toBe(false);
    });
});

describe('Tests pour formatDate', () => {
    it('doit formater correctement la date par défaut', () => {
        expect(formatDate()).toBe('01/01/1970');
    });

    it('doit retourner une chaîne vide pour une entrée vide', () => {
        expect(formatDate('')).toBe('');
    });

    it('doit formater une date spécifique selon la locale et les options', () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        expect(formatDate('2023-04-05', 'fr-FR', options)).toBe('5 avril 2023');
    });
});

describe('Tests pour setDate', () => {
    it('doit retourner une chaîne vide si la date n\'est pas valide', () => {
        expect(setDate({ date: null })).toBe('');
    });

    it('doit formater la date si elle est valide', () => {
        const date = '2023-04-05';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        expect(setDate({ date, formatDateFn: (date) => formatDate(date, 'fr-FR', options) })).toBe('05/04/2023');
    });
});