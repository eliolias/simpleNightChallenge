export const stringToInt = (value: string | null): number => {
  return value ? parseInt(value.replace("$", "")) : 0;
};
