export function CustomerNameFormat(name) {
  return name.split(" ").join("_").replace(/_+$/, '');
}
