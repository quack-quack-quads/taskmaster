const { CONSTANTS } = require("@firebase/util");
const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")

const addJob = async (req, res) =>{
    const dbRef = ref(db);

    const uid = req.body["uid"];
    const data = req.body['job'];

    const newJobKey = push(child(dbRef, `jobs/${uid}`)).key;
    await set(ref(db, `jobs/${uid}/${newJobKey}`), data).then(
        ()=>{
            res.send(newJobKey);
        }
    ).catch(
        (error)=>{
            const errorMessage = error.message;
            res.send(errorMessage);
        }
    )
}

const getJobs = async (req, res)=>{
    const dbRef = ref(db);
    await get(child(dbRef, `jobs/${req.body["uid"]}`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(snapshot.val())
        } else {
            res.send("No data available");
        }
    }).catch((error) => {
        res.send(error);
    });
}

const getJobsByCategory = async (req,res) => {
    const dbRef = ref(db);
    await get(child(dbRef,"jobs")).then(snapshot => {   
        const jobs = snapshot.val();
        const category = req.body["category"];
        const jobsByCategory = [];
        for (const key in jobs) {
            if(jobs.hasOwnProperty(key)){
                const job = jobs[key];
                for(const id in job){
                    const data = job[id];
                    if(data["category"]!== null && data["category"] !== undefined && data["category"].includes(category)){
                        jobsByCategory.push(data);
                    }
                }
            }
        }
        res.send(jobsByCategory);   
    }).catch(err => {
        let errorMessage = err.message;
        res.send(errorMessage);
    })
}

module.exports = {
    addJob,
    getJobs,
    getJobsByCategory
}