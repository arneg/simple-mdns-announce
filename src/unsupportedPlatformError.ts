export function unsupportedPlatformError(): Error {
  return new Error("Unsupported platform.");
}

export function throwUnsupportedPlatformError(): void {
  throw unsupportedPlatformError();
}
