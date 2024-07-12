function toBinary(num) {
  return num
    .toString(2)
    .split("")
    .map((x) => parseInt(x))
}

console.log(toBinary(0))
