export const Value = {
    a: [0, "A"],
    2: [1, "2"],
    3: [2, "3"],
    4: [3, "4"],
    5: [4, "5"],
    6: [5, "6"],
    7: [6, "7"],
    8: [7, "8"],
    9: [8, "9"],
    t: [9, "10"],
    j: [10, "J"],
    q: [11, "Q"],
    k: [12, "K"],
}

export const isValueOneBigger = (bigger: string, smaller: string): boolean => {
    return Value[bigger][0] === Value[smaller][0] + 1;
}