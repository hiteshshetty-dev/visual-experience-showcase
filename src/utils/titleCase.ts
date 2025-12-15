export default function titleCase(str: string) {
  return str.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase());
}