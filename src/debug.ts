let debug: (key: string) => (...args: unknown[]) => void;

try {
  // @ts-ignore
  debug = (await import("debug")).default;
} catch (err) {
  function dummyDebug(...args: unknown[]) {}
  debug = (key: string) => {
    return dummyDebug;
  };
}

export { debug };
