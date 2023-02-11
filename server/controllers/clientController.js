const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { ref, set, get, push, child, update} = require("firebase/database");
const { db, auth } = require("../firebase-config")


const createClient = async(uid, data)=>{
    const dbRef = ref(db);
    data["password"] = null;
    const newClientKey = push(child(dbRef, 'clients')).key;
    await set(ref(db, `clients/${uid}`), data).catch(
        (error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorMessage);
        }
    );
}

const signUp = async (req, res) => {
    await createUserWithEmailAndPassword(auth, req.body["email"], req.body["password"])
    .then(async(userCredential) => {
        const user = userCredential.user;
        await createClient(user.uid, req.body);
        res.send(user);
    })
    .catch((error) => {
        res.send(error.message);
    });
}

const signIn = async (req, res)=>{
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
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
    await get(child(dbRef, `clients/${req.body["uid"]}`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(snapshot.val())
        } else {
            res.send("No data available");
        }
    }).catch((error) => {
        res.send(error);
    });
}

const updateClient = async (req,res) => {
    const dbRef = ref(db);
    let data = req.body;
    const uid = data["uid"];
    delete data["uid"];
    const newClientKey = push(child(dbRef, 'clients')).key;
    await update(ref(db, `clients/${uid}`), data).catch(
        (error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorMessage);
        }
    );
    res.send("Updated");
}


module.exports = {
    signUp,
    signIn,
    getClient,
    updateClient
}