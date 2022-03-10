type Indexed<T = unknown> = {
  [key in string]: T;
};

export const isEqual = (a: Indexed, b: Indexed): boolean => {
  if(Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for(const key in a) {
    const first = a[key];
    const second = b[key];


    if(isObj(first) && isObj(second)) {
      if(isEqual(first as Indexed, second as Indexed)) {
        continue;
      }

      return false;
    }

    if(first === second) {
      continue;
    }

    return false;
  }

  return true;
}

const isObj = (value: unknown) => {
  if(!value) {
    return false;
  }

  return typeof value === 'object';
};
