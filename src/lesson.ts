import { Keyboard } from "./type"

/**
 * Produce a typing lesson which corresponds to the given criteria.
 *
 * @param keyboard The keyboard of the user
 * @param level The difficulty of the lesson
 * @param length The minimum number of characters in the lesson
 * @param baseDictionnary The set of words to use to produce sentences. If
 *                        empty, only made-up words will be used.
 * @param frequency Whether the target frequency of the letters should be equal
 *                  for all letters, or based on the frequencies found in the
 *                  dictionnary.
 */
export function lesson(
  keyboard: Keyboard,
  level: number,
  length: number,
  baseDictionnary: string[],
  frequency: "equal" | "dictionnary"
): string {
  // Compute which letters should be used for the lesson
  let rowIndexAndStartArray = [
    [1, 0],
    [0, 0],
    [2, 1],
  ]
  let letterString = ""

  rowIndexAndStartArray.forEach(([rowIndex, start], k) => {
    let levelA = Math.min(level, 4 * (k + 1)) - 4 * k
    if (levelA > 0) {
      let row = keyboard.keyArray[rowIndex].slice(start)
      letterString +=
        row.slice(4 - levelA, 4).join("") + row.slice(6, 6 + levelA).join("")
    }
  })
  if (level > 16) {
    letterString += rowIndexAndStartArray
      .slice(level - 16)
      .map(([rowIndex, start]) =>
        keyboard.keyArray[rowIndex].slice(4 + start, 6 + start)
      )
      .join("")
  }
  letterString = letterString
    .toLocaleLowerCase()
    .split("")
    .filter((x) => x !== x.toUpperCase())
    .join("")

  // Make a "sentence", a list of words or pseudo-words composed of the letters
  // of the lesson.
  let sentence: string[] = []
  let sentenceLength = -1
  let getWord = () => ""
  let dictionnary = baseDictionnary.map((x) => x.trim()).filter((x) => x)
  if (frequency === "equal") {
    let dictionnaryExtract = dictionnary.filter((word) => {
      return word
        .toLocaleLowerCase()
        .split("")
        .every((letter) => letterString.includes(letter))
    })
    if (dictionnaryExtract.length === 0) {
      getWord = () =>
        randomPermutationOfAnyNonZeroLength(letterString) +
        maybeALetter(letterString)
    } else {
      let frequencyMap = obtainFrequencyMap(dictionnaryExtract)
      let max = Math.max(...Object.values(frequencyMap))
      getWord = () => {
        let word = ""
        let threshold = 1
        if (Math.random() < threshold) {
          word = randomPick(dictionnaryExtract)
        } else {
        }
        return word
      }
    }
  } else {
    if (dictionnary.length === 0) {
      getWord = () =>
        randomPermutationOfAnyNonZeroLength(letterString) +
        maybeALetter(letterString)
    } else {
      let frequencyMap = obtainFrequencyMap(dictionnary)
      let cumulativeFrequencyPairs: [string, number][] = []
      let subtotal = 0
      Object.entries(frequencyMap).forEach(([letter, count]) => {
        subtotal += count
        cumulativeFrequencyPairs.push([letter, subtotal])
      })
      // Force the last subtotal to 1, to get rid of possible rounding errors
      cumulativeFrequencyPairs.slice(-1)[0][1] = 1
      getWord = () => ""
    }
  }
  while (sentenceLength < length) {
    let word = getWord()
    sentence.push(word)
    sentenceLength += word.length + 1
  }

  return sentence.join(" ")
}

function obtainFrequencyMap(dictionnary: string[]) {
  let frequencyMap: Record<string, number> = {}
  let total = 0
  dictionnary.forEach((word) => {
    word
      .toLocaleLowerCase()
      .split("")
      .forEach((letter) => {
        frequencyMap[letter] = (frequencyMap[letter] ?? 0) + 1
        total += 1
      })
  })
  Object.keys(frequencyMap).forEach((key) => {
    frequencyMap[key] /= total
  })
  return frequencyMap
}

function randomPermutationOfAnyNonZeroLength(letters: string) {
  let letterArray = letters.split("")
  let word = ""
  let keepGoing = true
  while (keepGoing && letterArray.length > 0) {
    let index = Math.floor(Math.random() * letterArray.length)
    word += letterArray[index]
    letterArray.splice(index, 1)
    keepGoing = Math.random() < 0.8
  }
  return word
}

function maybeALetter(letters: string) {
  if (Math.random() < 0.5) {
    return letters[Math.floor(Math.random() * letters.length)]
  }
  return ""
}

function randomPick<T>(container: T[]): T {
  return container[Math.floor(Math.random() * container.length)]
}
