export function storageGet(key: string, type = "localStorage") {
  if (typeof window !== 'undefined') {
    if (type === "localStorage") {
      return JSON.parse(localStorage.getItem(key) as string);
    } else {
      return JSON.parse(sessionStorage.getItem(key) as string);
    }
  }
}

export function storageSet(
  key: string,
  obj: Record<string, unknown>,
  type = "localStorage"
): void {
  if (storageHasItem(key, type)) {
    const getItem = storageGet(key, type);
    obj = {
      ...obj,
      ...getItem,
    };
  }
  type === "localStorage"
    ? localStorage.setItem(key, JSON.stringify(obj))
    : sessionStorage.setItem(key, JSON.stringify(obj));
}

export function storageClear(type = "localStorage") {
  if (type === "localStorage") {
    localStorage.clear();
  } else {
    sessionStorage.clear();
  }
}

export function storageRemoveItem(key: string, type = "localStorage") {
  if (type === "localStorage") {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
}

export function storageHasItem(key: string, type = "localStorage"): boolean {
  if (type === "localStorage") {
    return localStorage.getItem(key) ? true : false;
  } else {
    return sessionStorage.getItem(key) ? true : false;
  }
}
