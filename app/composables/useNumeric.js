export function useNumeric() {
  function round(value, precision) {
    if (typeof precision === 'undefined') {
      precision = 3
    }
    // Special case for mm > 1000 or degree days > 1000
    if (value > 1000 && precision == 2) {
      precision = 3
    }
    return Number(value.toPrecision(precision))
  }

  // Swaps the ASCII hyphen-minus that a Number stringifies to for a real
  // minus sign. This is the literal U+2212 character rather than &minus;
  // because these values are rendered through text interpolation, which
  // does not decode entities.
  function minus(value) {
    return String(value).replace(/^-/, '−')
  }

  return { round, minus }
}
