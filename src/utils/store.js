const getDataStore = (location = "", key) => {
    let storeApplication = defineLocation(location);
    let dataStore = storeApplication.getItem(key);
    return dataStore;
  };
  
  const setStoreApplication = (location = "", key, value) => {
    let storeApplication = defineLocation(location);
    storeApplication.setItem(key, value);
  };
  
  const removeStoreApplication = (location = "", key) => {
    let storeApplication = defineLocation(location);
    storeApplication.removeItem(key);
  };
  
  const defineLocation = dataLocation => {
    let location = localStorage;
    if (dataLocation === "session") {
      location = sessionStorage;
    }
    return location;
  };
  
  export { getDataStore, setStoreApplication, removeStoreApplication };
  