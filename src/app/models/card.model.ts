export interface Card {
    suit: string;
    value: string;
}

const CardsAsString = [
    "2c", "2d", "2h", "2s", "3c", "3d", "3h", "3s", "4c", "4d", "4h", "4s", "5c", "5d", "5h", "5s", "6c", "6d", "6h", "6s", "7c", "7d", "7h", "7s", "8c", "8d",
    "8h", "8s", "9c", "9d", "9h", "9s", "tc", "td", "th", "ts", "jc", "jd", "jh", "js", "qc", "qd", "qh", "qs", "kc", "kd", "kh", "ks", "ac", "ad", "ah", "as", 
];

export const Cards = CardsAsString.map((card) => { return { value: card[0], suit: card[1] } as Card });