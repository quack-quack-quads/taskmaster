const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")

const getChats = async (jobId) => {
    const dbRef = ref(db);
    await get(child(dbRef, `chats/${jobId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            return null
        }
    }).catch((error) => {
        console.error(error);
        return(error.message);
    });
}

const putMessage = async (jobId,data) =>{
    const dbRef = ref(db);
    // add message to chat list
    await push(child(dbRef, `chats/${jobId}`), data).then((snapshot) => {
        console.log("Message added to chat list");
        return snapshot.key
    }).catch((error) => {
        console.error(error);
        return(error.message);
    })
}


module.exports = {
    getChats,
    putMessage
}