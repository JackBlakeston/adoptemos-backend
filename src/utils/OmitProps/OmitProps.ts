export const omitProps = <Obj extends AnyObj, KeysToOmit extends (keyof Obj)[]>(obj: Obj, keysToOmit: KeysToOmit) => {
  if (!keysToOmit.length) return obj;

  const result = {} as Omit<Obj, KeysToOmit[number]>;

  for (const [key, value] of Object.entries(obj)) {
    if (!keysToOmit.includes(key)) {
      result[key as keyof Omit<Obj, KeysToOmit[number]>] = value;
    }
  }

  return result;
};
