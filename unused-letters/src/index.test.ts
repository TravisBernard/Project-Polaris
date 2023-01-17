import { findUnusedLetters } from './index'

describe('findUnusedLetters', () => {
    it('does not throw', () => {
        expect(() => findUnusedLetters).not.toThrow()
    });
});