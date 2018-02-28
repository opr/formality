import {isImmutable, is} from "immutable";

export function updateChecker(newProps, oldProps) {
  for (const [p, x] of Object.entries(newProps)) {
    if (x instanceof Function) {
      console.log('continuing because of', p);
      continue;
    }
    //console.log(p, x, oldProps[p], oldProps[p] === x);

    if (x !== oldProps[p]) {
      if (isImmutable(x)) {
        if (is(x, oldProps[p])) {
          continue;
        }
      }
      console.log('returning cos of ', p);
      return true;
    }
  }
  return false;
}
