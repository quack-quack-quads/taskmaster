const { CONSTANTS } = require("@firebase/util");
const { ref, set, get, push, child} = require("firebase/database");
const { db } = require("../firebase-config")
const deg2rad = require("deg2rad");

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
            const jobs = []
            // convert the object to an array
            for (const key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    let job = snapshot.val()[key];
                    job["uid"] = key;
                    jobs.push(job);
                }
            }
            res.send(jobs);
        } else {
            res.send([]);
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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // calculate the distance between two points in km
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;  
}

const getJobsByDistance = async(req,res) => {
    const dbRef = ref(db);
    await get(child(dbRef,"jobs")).then(snapshot => {
        const jobs = snapshot.val();
        const location = req.body["address"];
        const jobsByDistance = [];
        const maxDistance = 10.0;
        for (const key in jobs) {
            if(jobs.hasOwnProperty(key)){
                const job = jobs[key];
                for(const id in job){
                    const data = job[id];
                    if(data["address"]!== null && data["address"] !== undefined){
                        const address = data["address"];
                        const {latitude, longitude} = address;
                        // ! calculate the distance between the location and the address
                        const distance = calculateDistance(location.latitude, location.longitude, latitude, longitude);
                        if(distance !== null && distance !== undefined && distance <= maxDistance){
                            jobsByDistance.push(data);
                        }
                    }
                }
            }
        }
        res.send(jobsByDistance);
    }).catch(err => {
        let errorMessage = err.message;
        res.send(errorMessage);
    })

}

const getAllJobs = async (req, res) => {
    const dbRef = ref(db);
    await get(child(dbRef,"jobs")).then(snapshot => {
        const jobs = snapshot.val();
        const jobsArray = [];
        for (const key in jobs) {
            if(jobs.hasOwnProperty(key)){
                const job = jobs[key];
                for(const id in job){
                    let data = job[id];
                    data["uid"] = id;
                    jobsArray.push(data);
                }
            }
        }
        res.send(jobsArray);
    }).catch(err => {
        let errorMessage = err.message;
        res.send([]);
    })
}

const acceptWorkerJob = async(req,res) => {
    const dbRef = ref(db);
    const userId = req.body["userId"];
    const jobId = req.body["jobId"];
    const workerId = req.body["workerId"];
    const startingBid = req.body["startingBid"];

    await get(child(dbRef,`jobs/${userId}/${jobId}`)).then(snapshot => {
        if(snapshot.exists()){
            const job = snapshot.val();
            job["to"] = workerId;
            job["status"] = "pending";
            job["startingBid"] = startingBid;
            set(ref(db,`jobs/${userId}/${jobId}`),job).then(()=>{
                res.send("success");
            }).catch(err => {
                let errorMessage = err.message;
                res.send(errorMessage);
            })
        }else{
            res.send("job does not exist");
        }
    })
}

const getJobsWorker = async (req, res)=>{
    const dbRef = ref(db);
    const workerUid = req.body["uid"];
    const jobs = [];
    await get(child(dbRef, `jobs`)).then((snapshot) => {
        for(const clientId in snapshot.val()){
            for(const jobId in snapshot.val()[clientId]){
                if(snapshot.val()[clientId][jobId]["to"] === workerUid){
                    jobs.push(snapshot.val()[clientId][jobId]);
                }
            }
        }
    })
    res.send(jobs);
}

module.exports = {
    addJob,
    getJobs,
    getJobsByCategory,
    getJobsByDistance,
    getAllJobs,
    acceptWorkerJob,
    getJobsWorker
}