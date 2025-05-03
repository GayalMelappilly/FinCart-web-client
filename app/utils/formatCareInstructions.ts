export default function formatCareInstructions(careInstructions: Record<string, string>): Record<string, string> {
    const formatted: Record<string, string> = {};
    for (const [key, value] of Object.entries(careInstructions)) {
      const formattedKey = key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      formatted[formattedKey] = value;
    }
    return formatted;
  }
  