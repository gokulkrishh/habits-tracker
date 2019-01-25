import constants from "./constants";

const localStorageUtils = {
  set(key, request) {
    const namespace = this.getNamespace() || {};
    if (namespace[key]) {
      namespace[key].push(request);
    } else {
      namespace[key] = [request];
    }
    localStorage.setItem(
      constants.STORAGE_KEYS.HABITS,
      JSON.stringify(namespace)
    );
  },

  getNamespace(namespace = constants.STORAGE_KEYS.HABITS) {
    return JSON.parse(localStorage.getItem(namespace) || "{}");
  },

  get(key, namespace = constants.STORAGE_KEYS.HABITS) {
    const namespaceData = JSON.parse(localStorage.getItem(namespace) || "{}");
    console.log("namespaceData --->", namespaceData); // eslint-disable-line
    return namespaceData[key] || [];
  },

  getAll() {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      data.push(this.get(key));
    }
    return data;
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export default localStorageUtils;
