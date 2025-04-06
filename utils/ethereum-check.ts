// Utility function to safely check if ethereum is available
export function isEthereumAvailable(): boolean {
  return typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined"
}

// Safely get ethereum provider without redefining it
export function getEthereumProvider() {
  if (isEthereumAvailable()) {
    return (window as any).ethereum
  }
  return null
}

