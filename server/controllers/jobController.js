const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")

const addJob = async (req, res) =>{
    const dbRef = ref(db);

    const uid = req.body["uid"];
    const data = req.body['job'];

    const newJobKey = push(child(dbRef, `jobs/${uid}`)).key;
    set(ref(db, `jobs/${uid}/${newJobKey}`), data).then(
        ()=>{
            res.send(newJobKey);
        }
    ).catch(
        (error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            res.send(errorMessage);
        }
    )
}

const getJobs = async (req, res)=>{
    const dbRef = ref(db);
    get(child(dbRef, `jobs/${req.body["uid"]}`)).then((snapshot) => {
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
    addJob,
    getJobs
}