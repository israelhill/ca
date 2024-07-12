export function toBinary(num: number): number[] {
  return num
    .toString(2)
    .split("")
    .map((x) => parseInt(x))
}

export function toDecimal(binary: number[]): number {
  return parseInt(binary.join(""), 2)
}
