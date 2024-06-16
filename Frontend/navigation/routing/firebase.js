import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const sendCommand = (command) => {
  set(ref(database, "commands/door"), command)
    .then(() => {
      console.log(`Command ${command} sent successfully`);
    })
    .catch((error) => {
      console.error("Error sending command: ", error);
    });
};

const getData = (path, callback) => {
  const dataRef = ref(database, path);
  onValue(
    dataRef,
    (snapshot) => {
      const data = snapshot.val();
      callback(data);
    },
    (error) => {
      console.error("Error reading data: ", error);
    }
  );
};

export { sendCommand, getData };
