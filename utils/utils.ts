export const serialize = (
  obj: Record<string, string>,
  equalSymbol: string,
  separator: string
) => {
  Object.keys(obj).forEach((key) => {
    !obj[key] && delete obj[key];
  });

  return Object.entries(obj)
    .map(
      ([key, val]) =>
        `${encodeURIComponent(key)}${equalSymbol}${encodeURIComponent(val)}`
    )
    .join(separator);
};
