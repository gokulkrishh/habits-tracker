import constants from "./constants";

const localStorageUtils = {
  get() {
    return JSON.parse(localStorage.getItem(constants.STORAGE_KEYS.HABITS));
  }
};

export default localStorageUtils;
