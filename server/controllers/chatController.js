const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")

const getChat = async (req, res) => {
    const dbRef = ref(db);
    await get(child(dbRef, `chats/${req.body["jobId"]}`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(snapshot.val());
        } else {
            res.send("No data available");
        }
    }).catch((error) => {
        res.send(error.message);
    });
}

const putMessage = async (req, res) =>{
    const dbRef = ref(db);

    const jobId = req.body['jobId'];
    const data = req.body['message'];

    const newChatKey = push(child(dbRef, `chats/${jobId}`)).key;
    await set(ref(db, `chats/${jobId}/${newChatKey}`), data).then(()=>{
        res.send(newChatKey);
    }).catch((error) =>{
        res.send(error.message);
    })
}


module.exports = {
    getChat,
    putMessage
}