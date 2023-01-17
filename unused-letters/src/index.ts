// The list of characters we ultimately want to find in the input string
// We could just write an array like ['a','b','c'] but this feels more ergonomic
const soughtAfterCharacterString = "abcdefghijklmnopqrstuvwxyz";
const soughtAfterCharacterList = soughtAfterCharacterString.split("");

/**
 * Utiltiy function. Will return a new Map where keys are the individual characters of 
 * soughtAfterCharacters and the values don't matter.
 * 
 * Using a map because Map.delete() is an easy utility function that reads cleaner than
 * an if-exists-then-delete block
 * 
 * @returns string
 */
function createNewRemainingCharacterMap() {
    const charactersMap = new Map();
    soughtAfterCharacterList.forEach(char => charactersMap.set(char, 1))
    return charactersMap
}

/**
 * Using any input string, indexes the string and returns a list of any english letters
 * that are not present in the string.  For example the input of "A slow yellow fox 
 * crawls under the proactive dog" would return "bjkmqz" since those 6 letters don't occur
 * in the input string.
 * 
 * NOTE: Does not account for diacritics.  ü !== u
 * 
 * @param inputStr 
 * @returns 
 */
export function findUnusedLetters(inputStr: string | null) {
    const inputOrDefault = inputStr ?? "";
    const inputToLower = inputOrDefault.toLowerCase();
    const remainingCharactersMap = createNewRemainingCharacterMap();

    // Loop until we've run the entire input string OR we've found every character once
    for(let i = 0; i < inputToLower.length && remainingCharactersMap.size; i++) {
        const nextInputCharacter = inputToLower[i]
        // Don't care about return - if character is present flag it, otherwise move on
        remainingCharactersMap.delete(nextInputCharacter)
    }
    
    // Convert keys (unmatched characters) to an array first, then concatenate them into a string
    return Array.from(remainingCharactersMap.keys()).join("")
}