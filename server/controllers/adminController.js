const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { ref, set, get, push, child} = require("firebase/database");
const { db, auth } = require("../firebase-config")

const checkIFAdmin = async(uid) => {
    const dbRef = ref(db);
    const admin = get(child(dbRef, `admins/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }).catch((error) => {
        return null;
    });
    return admin;
}

const createAdmin = async(req,res)=>{
    const dbRef = ref(db);
    const data = req.body;
    console.log("data", data);
    // ! admin will share his UUID here to verify himself as the admin
    const admin = get(child(dbRef, `admins/${req.body["uid"]}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(errorMessage);
    });
    if(admin){
        // ! sign up that user provided as admin also
        console.log("admin is true");
        await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            console.log("user1", user);
            data["password"] = null;
            delete data["uid"];

            const newClientKey = push(child(dbRef, 'admins')).key;
            // ! add to admins table
            await set(ref(db, `admins/${user.uid}`), data)
            .then((userData)=>{
                res.send(user);
            })
            .catch(err=>{
                console.log("error2", err);
                const errorCode = err.code;
                const errorMessage = err.message;
                res.send(errorMessage);
            })
        })
    }else{
        res.send("You are not an admin");
    }
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

const getAdmin = async (req, res)=>{
    await checkIFAdmin(req.body.uid)
    .then((admin)=>{
        if(admin !== null){
            res.send(admin);
        }else{
            res.send("You are not an admin");
        }
    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(errorMessage);
    })
}

const getAllAdmins = async (req,res) => {
    await checkIFAdmin(req.body.uid)
    .then((admin)=>{
        if(admin !== null){
            const dbRef = ref(db);
            get(child(dbRef, `admins`)).then((snapshot) => {
                if (snapshot.exists()) {
                    res.send(snapshot.val());
                } else {
                    res.send("No data available");
                }
            }).catch((error) => {
                throw error;
            });
        }else{
            res.send("You are not an admin");
        }
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        res.send(errorMessage);
    })
}

module.exports = {
    signIn,
    createAdmin,
    getAdmin,
    getAllAdmins
}