function syncVerses(
  shouldWrap: boolean,
  activeVerseIdx: number,
  [firstLength, secondLength]: [number, number],
) {
  // if shouldWrap is true, incongruent number of verses will be wrapped
  if (shouldWrap) return [activeVerseIdx % firstLength, activeVerseIdx % secondLength];
  // else last verses will be repeated
  return [Math.min(activeVerseIdx, firstLength - 1), Math.min(activeVerseIdx, secondLength - 1)];
}

export { syncVerses };
