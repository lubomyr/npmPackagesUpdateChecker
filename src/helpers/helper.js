const defaultCellValue = {
  letter: null,
  userInput: null,
  pos: null,
  word: null,
};

const generate2dArray = size => {
  let arr = [];
  for (let x = 0; x < size; x++) {
    arr[x] = [];
    for (let y = 0; y < size; y++) {
      arr[x][y] = {...defaultCellValue};
    }
  }
  return arr;
};

export const generateCellsData = cellsCount => {
  return generate2dArray(cellsCount);
};

const setWordInCells = (cellsData, word, pos, isVertical) => {
  const updateData = (object, char) => {
    if (object) {
      object.letter = char;
      if (!Array.isArray(object.word)) {
        object.word = [];
      }
      object.word[isVertical] = word;
    }
  };
  for (let i = 0; i < word.length; i++) {
    const x = isVertical ? pos.x + i : pos.x;
    const y = isVertical ? pos.y : pos.y + i;
    if (x < cellsData.length && y < cellsData.length) {
      updateData(cellsData[x][y], word.charAt(i));
    }
  }
};

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const getRandomOrientation = words => {
  let value = parseInt(Math.random(1) * 10);
  return value > 4 ? 1 : 0;
};

const generateRandomPosition = (word, isVertical, size) => {
  const randValue = getRandomInt(size);
  const randValueMinusLength = getRandomInt(size - word.length);
  const x = !isVertical ? randValue : randValueMinusLength;
  const y = !isVertical ? randValueMinusLength : randValue;
  return {x, y};
};

const getPositionArrayByLetter = (cellData, letter) => {
  const size = cellData.length;
  let result = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (cellData[x][y].letter === letter) {
        result.push({...cellData[x][y], pos: {x, y}});
      }
    }
  }
  return result;
};

const getWordsInRandomOrder = words => {
  return words.sort(() => Math.random() - 0.5);
};

const getWordCharsInRandomOrder = word => {
  const array = Array.from(word);
  return array.sort(() => Math.random() - 0.5);
};

export const getPosItemOrientation = posItem => {
  const {word} = posItem;
  return word[0] ? 0 : word[1] ? 1 : null;
};

const isItemPosBusy = posItem => {
  const {word} = posItem;
  return Boolean(word[0] && word[1]);
};

const getIndexesInWord = (word, letter) => {
  const regex = new RegExp(letter, 'gi'),
    list = [];
  let result;
  while ((result = regex.exec(word))) {
    list.push(result.index);
  }
  return list;
};

const checkPositions = (cellsData, pos, word, charIndex, isVertical) => {
  if (pos.x < 0 || pos.y < 0) {
    return false;
  }
  if (isVertical && pos.x + word.length > cellsData.length) {
    return false;
  }
  if (!isVertical && pos.y + word.length > cellsData.length) {
    return false;
  }
  if (isVertical && pos.x - 1 >= 0 && cellsData[pos.x - 1][pos.y].letter) {
    return false;
  }
  if (
    isVertical &&
    pos.x + word.length < cellsData.length &&
    cellsData[pos.x + word.length][pos.y]?.letter
  ) {
    return false;
  }
  if (!isVertical && pos.y - 1 >= 0 && cellsData[pos.x][pos.y - 1].letter) {
    return false;
  }
  if (
    !isVertical &&
    pos.y + word.length < cellsData.length &&
    cellsData[pos.x][pos.y + word.length]?.letter
  ) {
    return false;
  }
  for (let i = 0; i < word.length; i++) {
    const x = isVertical ? pos.x + i : pos.x;
    const y = isVertical ? pos.y : pos.y + i;
    if (cellsData[x][y].letter && cellsData[x][y].letter !== word[i]) {
      return false;
    }
    //check parallels word
    if (
      isVertical &&
      y - 1 >= 0 &&
      cellsData[x][y - 1].letter &&
      (getPosItemOrientation(cellsData[x][y - 1]) === isVertical ||
        !cellsData[x][y].word)
    ) {
      return false;
    }
    if (
      isVertical &&
      y + 1 < cellsData.length &&
      cellsData[x][y + 1].letter &&
      (getPosItemOrientation(cellsData[x][y + 1]) === isVertical ||
        !cellsData[x][y].word)
    ) {
      return false;
    }
    if (
      !isVertical &&
      x - 1 >= 0 &&
      cellsData[x - 1][y].letter &&
      (getPosItemOrientation(cellsData[x - 1][y]) === isVertical ||
        !cellsData[x][y].word)
    ) {
      return false;
    }
    if (
      !isVertical &&
      x + 1 < cellsData.length &&
      cellsData[x + 1][y].letter &&
      (getPosItemOrientation(cellsData[x + 1][y]) === isVertical ||
        !cellsData[x][y].word)
    ) {
      return false;
    }
  }
  return true;
};

const getWordPosition = (posItem, charIndex, isVertical) => {
  const {pos} = posItem;
  const x = isVertical ? pos.x - charIndex : pos.x;
  const y = isVertical ? pos.y : pos.y - charIndex;
  return {x, y};
};

const getWordsWithFirstThreeLonger = words => {
  const counts = words.length > 4 ? 4 : words.length;
  const list = [...words];
  const rangeList = list.slice(0, counts);
  rangeList.sort((a, b) => {
    if (a.length > b.length) {
      return -1;
    }
    if (a.length < b.length) {
      return 1;
    }
    return 0;
  });
  for (let i = 0; i < counts; i++) {
    list[i] = rangeList[i];
  }
  return list;
};

export const fillCellsData = (cellsData, dictionary, setInfo) => {
  const cellSize = cellsData.length;
  const words = Object.keys(dictionary);
  const wordsInRandomOrder = getWordsInRandomOrder(words);
  const wordsWithFirstThreeLonger =
    getWordsWithFirstThreeLonger(wordsInRandomOrder);
  const renderedWords = [];
  wordsWithFirstThreeLonger.forEach((word, index) => {
    let isSuccess = false;
    if (index === 0) {
      const isVertical = getRandomOrientation(word);
      const position = generateRandomPosition(word, isVertical, cellSize);
      setWordInCells(cellsData, word, position, isVertical);
      renderedWords.push(word);
    } else {
      const wordChars = getWordCharsInRandomOrder(word);
      wordChars.forEach(letter => {
        if (isSuccess) {
          return true;
        }
        const charIndexes = getIndexesInWord(word, letter);
        const positionArray = getPositionArrayByLetter(cellsData, letter);
        positionArray.forEach(posItem => {
          if (isSuccess) {
            return true;
          }
          if (isItemPosBusy(posItem)) {
            return true;
          }
          const isVertical = getPosItemOrientation(posItem) ? 0 : 1;
          charIndexes.forEach(charIndex => {
            if (isSuccess) {
              return true;
            }
            const position = getWordPosition(posItem, charIndex, isVertical);
            const isPosCheck = checkPositions(
              cellsData,
              position,
              word,
              charIndex,
              isVertical,
            );
            if (isPosCheck) {
              setWordInCells(cellsData, word, position, isVertical);
              renderedWords.push(word);
              isSuccess = true;
              return true;
            }
          });
        });
      });
      //return true;
    }
  });
  setInfo(`${renderedWords.length} words`);
  //console.log(renderedWords);
  return cellsData;
};
