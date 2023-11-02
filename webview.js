const path = require('path');

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    let count = 0;
    const dbPromise = window.indexedDB.open('hive_collections_fluffychat_web')
    dbPromise.onsuccess = function (dbEvent) {
      const tx = dbEvent.target.result.transaction('box_rooms', 'readonly').objectStore('box_rooms').getAll().onsuccess = function (valuesEvent) {
        let elements = valuesEvent.target.result

        if (elements) {
          for (let i = 0; i < elements.length; i += 1) {
            count += elements[i].notification_count;
          }
        }

        Franz.setBadge(count);
      }
    };  
  };

  Franz.loop(getMessages);
};
 