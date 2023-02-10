const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")

const getJobById = async (req, res) =>{
    // const dbRef = ref(db);
    // get(child(dbRef, `chats/${req.body["id"]}`)).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         console.log(snapshot.val());
    //     } else {
    //         console.log("No data available");
    //     }
    // }).catch((error) => {
    //     console.error(error);
    // });
}

module.exports = {

}