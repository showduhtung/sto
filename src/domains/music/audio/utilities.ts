function formatToDecimalDisplay(value: number) {
  const val = String(value);
  return [1, 2].includes(value) ? val + ".0" : val;
}

export { formatToDecimalDisplay };
