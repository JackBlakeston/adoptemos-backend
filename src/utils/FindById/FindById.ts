interface ObjectWithId extends AnyObj {
  id: string;
}

export const findById = <T extends ObjectWithId>(id: string, items: T[]) => {
  if (!Array.isArray(items)) return undefined;
  return items.find((item: T) => item.id === id);
};
