export function composeTypeAndSubtype(type: string, subtype?: string): string {
  if (subtype) {
    return `${type},${subtype}`;
  } else {
    return type;
  }
}
