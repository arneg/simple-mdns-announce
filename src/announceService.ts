import { debug } from "./debug.js";
// @ts-ignore
import { spawn } from "node:child_process";
import { composeTypeAndSubtype } from "./composeTypeAndSubtype.js";
import {
  dnsSdExecutableMacOs,
  dnsSdExecutableWin32,
} from "./dnsSdExecutable.js";
// @ts-ignore
import { platform } from "./platform.js";
import { unsupportedPlatformError } from "./unsupportedPlatformError.js";
import type { ITxtRecords } from "./ITxtRecords.js";

const log = debug("simple-mdns-announce");

export type IService = {
  /** The name of the service. */
  name: string;
  /** The type of the service (e.g., _http._tcp.). */
  type: string;
  /** Optional. The subtype of the service. */
  subtype?: string;
  /** The port number for the service. */
  port: number;
  /** Optional. Key-value pairs of additional information you want to associate with the service (e.g., {'key': 'value'}). */
  txtRecords?: ITxtRecords;
};

function getCommandLine(service: IService): [string, string[]] {
  let cmd: string;
  let args: string[];

  switch (platform) {
    case "darwin": {
      cmd = dnsSdExecutableMacOs;
      args = [
        "-R",
        service.name,
        composeTypeAndSubtype(service.type, service.subtype),
        "local",
        service.port.toFixed(0),
        "",
        "",
      ];
      if (service.txtRecords) {
        for (const name in service.txtRecords) {
          args.push(`${name}=${service.txtRecords[name]}`);
        }
      }
      break;
    }
    case "win32":
      cmd = dnsSdExecutableWin32;
      args = [
        "-R",
        service.name,
        composeTypeAndSubtype(service.type, service.subtype),
        "local",
        service.port.toFixed(0),
      ];
      if (service.txtRecords) {
        for (const name in service.txtRecords) {
          args.push(`${name}=${service.txtRecords[name]}`);
        }
      }
      break;
    default:
      throw unsupportedPlatformError();
  }

  return [cmd, args];
}

/**
 * This function announces a service over mDNS. You pass an IService object with the service details. The function returns a cleanup handle that you can call to stop the service announcement and kill the underlying dns-sd process.
 *
 * @param service
 *  The service to announce.
 * @returns
 */
export function announceService(service: IService): () => void {
  const [executable, args] = getCommandLine(service);

  log("spawn %s %o", executable, args);
  const process = spawn(executable, args, {
    windowsHide: true,
    stdio: "ignore",
  });

  return () => {
    log("kill %s %o", executable, args);
    process.kill();
  };
}
