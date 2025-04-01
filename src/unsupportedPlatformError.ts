import { platform } from "./platform.js";

export function unsupportedPlatformError(): Error {
  return new Error("Unsupported platform " + platform);
}

export function throwUnsupportedPlatformError(): void {
  throw unsupportedPlatformError();
}
