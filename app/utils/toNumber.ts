interface PriceObject {
    s: number; // Sign: 1 (positive) or -1 (negative)
    e: number; // Exponent (power of 10)
    d: number[]; // Array of digits (e.g., [5] → "5")
}

export const toNumber = (input: string | PriceObject): number => {
    try {
    // If input is a string, parse it. Otherwise, use it directly.
    const priceObj: PriceObject = typeof input === "string" ? JSON.parse(input) : input;
    
    const { s = 1, e = 0, d = [] } = priceObj;
    
    if (!Array.isArray(d)) throw new Error("Digits must be an array");
    const digitsValue = parseFloat(d.join('')) || 0;
    
    return s * digitsValue * Math.pow(1, e);
  } catch (error) {
    console.error("Invalid price format:", error);
    return NaN; // or throw an error
  }
}