const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { ref, set, get, push, child, update} = require("firebase/database");
const { db, auth } = require("../firebase-config")

const checkIFAdmin = async(uid) => {
    const dbRef = ref(db);
    const admin = await get(child(dbRef, `admins/${uid}`)).then((snapshot) => {
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
    // ! admin will share his UUID here to verify himself as the admin
    const admin = await get(child(dbRef, `admins/${req.body["uid"]}`)).then((snapshot) => {
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
        await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            data["password"] = null;
            delete data["uid"];

            const newClientKey = push(child(dbRef, 'admins')).key;
            // ! add to admins table
            await set(ref(db, `admins/${user.uid}`), data)
            .then((userData)=>{
                res.send(user);
            })
            .catch(err=>{
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
    .then(async(admin)=>{
        if(admin !== null){
            const dbRef = ref(db);
            await get(child(dbRef, `admins`)).then((snapshot) => {
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

const approveWorker = async(req,res) => {
    const uid = req.body.uid;
    const workerUid = req.body.workerUid;
    await checkIFAdmin(uid)
    .then(async(admin)=>{
        if(admin !== null){
            const dbRef = ref(db);
            // if worker exists in pending_approvals table delete it and in workers table update verified field to true
            await get(child(dbRef, `pending_approvals/${workerUid}`)).then(async(snapshot) => {
                if (snapshot.exists()) {
                    const worker = snapshot.val();
                    // ! delete from pending_approvals table
                    await set(ref(db, `pending_approvals/${workerUid}`), null)
                    .then(async()=>{
                        // ! update verified field to true
                        worker["verified"] = true;
                        await set(ref(db, `workers/${workerUid}`), worker)
                        .then(()=>{
                            res.send("Worker approved");
                        })
                        .catch((error)=>{
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            res.send(errorMessage);
                        })
                    })
                    .catch((error)=>{
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        res.send(errorMessage);
                    })
                } else {
                    res.send("No data available");
                }
            })
        }else{
            res.send("You are not an admin");
        }
    })
    
}

const updateAdmin = async(req,res) => {
    const uid = req.body.uid;
    const data = req.body;
    delete data["uid"];
    await checkIFAdmin(uid)
    .then(async(admin)=>{
        if(admin !== null){
            const dbRef = ref(db);
            await update(ref(db, `admins/${uid}`), data)
            .then(()=>{
                res.send("Admin updated");
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                res.send(errorMessage);
            })
        }else{
            res.send("You are not an admin");
        }
    })
}

const getWorkers = async(req,res) => {
    // get all workers from workers table
    const dbRef = ref(db);
    console.log(req.body.uid)
    await checkIFAdmin(req.body.uid)
    .then(async(admin)=>{
        if(admin !== null && admin !== undefined){
            await get(child(dbRef, `workers`)).then((snapshot) => {
                console.log("Snapshot : ", snapshot)
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
    getAllAdmins,
    approveWorker,
    getWorkers,
}