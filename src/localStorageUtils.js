import constants from "./constants";

const localStorageUtils = {
  init() {
    localStorage.setItem(constants.STORAGE_KEYS.HABITS, JSON.stringify([]));
  },

  set(key, request) {
    const savedData = this.get(key) || [];
    savedData.push(request);
    localStorage.setItem(
      constants.STORAGE_KEYS.HABITS,
      JSON.stringify({
        [key]: savedData
      })
    );
  },

  getItemByKey(key = "") {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  },

  get(key, namespace = constants.STORAGE_KEYS.HABITS) {
    const item = localStorage.getItem(namespace);
    if (!item) return {};
    return JSON.parse(item)[key] || [];
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
  },

  subscribeForUpdates() {
    window.addEventListener(
      "storage",
      function(event) {
        if (event.storageArea === localStorage) {
          console.log("came --->"); // eslint-disable-line
        }
      },
      false
    );
  }
};

if (!localStorageUtils.getAll().length) {
  localStorageUtils.init();
  localStorageUtils.subscribeForUpdates();
}

export default localStorageUtils;
