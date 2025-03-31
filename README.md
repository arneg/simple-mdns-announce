# simple-mdns-announce

This Node.js module allows you to announce mDNS services on macOS and Windows using native `dns-sd` command-line tools. The module provides a simple API for service announcement, making it easy to advertise services like printers, devices, or applications over local networks.

**Note:** Linux support via `avahi-publish` is planned for future releases.

## Installation

You can install the module via npm:

```bash
npm install "@arneg/simple-mdns-announce"
```

## Usage

This module exposes a simple API to announce services over mDNS.
API

```typescript
import { announceService } from "@arneg/simple-mdns-announce";

const service = {
  name: "MyService",
  type: "_http._tcp.",
  port: 8080,
  txtRecords: {
    description: "My awesome service",
  },
};

const cleanup = announceService(service);

// To stop the service announcement
cleanup();
```

## Supported Platforms

- macOS: Uses the native dns-sd command.
- Windows: Uses the native dns-sd command.
- Linux: Planned for future support using avahi-publish.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## TODO

- Add Linux support via avahi-publish.
