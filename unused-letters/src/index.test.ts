import { findUnusedLetters } from './index'

const testData = [
    { name: "null input", input: null, expected: "abcdefghijklmnopqrstuvwxyz" },
    { name: "empty input", input: "", expected: "abcdefghijklmnopqrstuvwxyz" },
    { name: "only numbers", input: "1234567890", expected: "abcdefghijklmnopqrstuvwxyz" },
    { name: "only symbols", input: "!@#$%^&*()", expected: "abcdefghijklmnopqrstuvwxyz" },
    { name: "case insensitive", input: "A", expected: "bcdefghijklmnopqrstuvwxyz" },
    { name: "mixed character types", input: "18(&*(1a", expected: "bcdefghijklmnopqrstuvwxyz" },
    { name: "ignores diacritics", input: "ü", expected: "abcdefghijklmnopqrstuvwxyz" },
    { name: "all letters used", input: "A quick brown fox jumps over the lazy dog", expected: "" },
    { name: "not all letters used", input: "A slow yellow fox crawls under the proactive dog", expected: "bjkmqz" },
]

describe('findUnusedLetters', () => {
    it.each(testData)('test various inputs - $name', ({input, expected}) => {
        expect(findUnusedLetters(input)).toEqual(expected)
    })
});