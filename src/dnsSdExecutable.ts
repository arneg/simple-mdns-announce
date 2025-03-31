// @ts-ignore
import { platform } from "node:os";
import { throwUnsupportedPlatformError } from "./unsupportedPlatformError.js";

export const dnsSdExecutableWin32 = "dns_sd.exe";
export const dnsSdExecutableMacOs = "dns-sd";

export function dnsSdExecutable(): string {
  switch (platform()) {
    case "win32":
      return dnsSdExecutableWin32;
    case "darwin":
      return dnsSdExecutableMacOs;
    default:
      throwUnsupportedPlatformError();
  }
}
