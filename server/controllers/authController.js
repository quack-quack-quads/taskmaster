const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { ref, set, get, push, child} = require("firebase/database");
const { db, auth } = require("../firebase-config")


const createClient = (uid, data)=>{
    const dbRef = ref(db);
    data["password"] = null;
    const newClientKey = push(child(dbRef, 'clients')).key;
    set(ref(db, `clients/${uid}`), data);
}

const signUp = async (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        createClient(user.uid, req.body);
        res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(errorMessage);
    });
}

const signIn = async (req, res)=>{
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
        const user = userCredential.user;
        res.send(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(errorMessage);
    });
}

const getClient = async (req, res)=>{
    const dbRef = ref(db);
    get(child(dbRef, `clients/${req.body["uid"]}`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(snapshot.val())
        } else {
            res.send("No data available");
        }
    }).catch((error) => {
        res.send(error);
    });
}

module.exports = {
    signUp,
    signIn,
    getClient
}