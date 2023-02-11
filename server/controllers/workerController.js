const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { ref, set, get, push, child} = require("firebase/database");
const { db, auth } = require("../firebase-config")

const createWorker = async(uid, data)=>{
    const dbRef = ref(db);
    data["password"] = null;
    data["verified"] = false; // ! admin will verify the worker
    const newClientKey = push(child(dbRef, 'workers')).key;
    await set(ref(db, `workers/${uid}`), data).catch(
        (error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorMessage);
        }
    );
}

const signUp = async (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async(userCredential) => {
        const user = userCredential.user;
        createWorker(user.uid, req.body);
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

const getWorker = async (req, res)=>{
    const dbRef = ref(db);
    get(child(dbRef, `workers/${req.body["uid"]}`)).then((snapshot) => {
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
    getWorker
}