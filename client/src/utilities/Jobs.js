import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL;

const postJob = (obj) => {
    axios.post(`${baseURL}/api/jobs/add`, obj).then((res) => {
        console.log(res)
    }, (err) => {
        console.log(err);
    })
}

const getJob = (uid) => {
    console.log(uid);
    axios.post(`${baseURL}/api/jobs/get`, {
        uid : uid
    }).then((res) => {
        console.log(res);
        return (res.uid);
        
    }, (err) => {
        console.log(err);
    })
}

export {
    postJob,
    getJob
}