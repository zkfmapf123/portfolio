export const itemNullCheck = (item: [] | undefined): [] => {
  if (typeof item === "undefined" || item == null) {
    return [];
  }
  
  return item;
};
