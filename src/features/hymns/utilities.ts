function syncVerses(
  shouldWrap: boolean,
  activeVerseIdx: number,
  [firstLength, secondLength]: [number, number],
) {
  if (shouldWrap) return [activeVerseIdx % firstLength, activeVerseIdx % secondLength];
  return [Math.min(activeVerseIdx, firstLength - 1), Math.min(activeVerseIdx, secondLength - 1)];
}

export { syncVerses };
