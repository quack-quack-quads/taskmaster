const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")

const getChatById = async (req, res) => {
    const dbRef = ref(db);
    get(child(dbRef, `chats/${req.body["id"]}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

const putChat = async (req, res) =>{
    const dbRef = ref(db);
    const newChatKey = push(child(dbRef, 'chats')).key;
    var chatData = req.body;
    chatData["id"] = newChatKey;
    set(ref(db, `chats/${req.body["id"]}`), req.body).then(()=>{
        res.send(`Put chat at id : ${newChatKey}`);
    }).catch((error) =>{
        res.send("Error putting chat");
    })
}


module.exports = {
    getChatById,
    putChat
}