const primeNumbers = [
    2, 3, 5, 7, 11, 13, 17,
    // , 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
]
// แก้ random ให้ไม่เกินinfinity หรือแก้เลข ให้powแล้วไม่เกินinfinity

export const staticCache = {
    primeNumbers,
    primeNumbersLength: primeNumbers.length,
}
