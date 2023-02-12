import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL;

const loginapi = async (email, password, flow) => {
    var payload = {
        "email": email,
        "password": password,
    }
    const res = await axios.post(
        `${baseURL}/api/${flow}/signin`,
        payload
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
    if(flow == "admin"){
        return res;
    }

    
    var keyword = 'getClient';
    if(flow!="client"){
        keyword = 'getWorker';
    }
    const res2 = await axios.post(
        `${baseURL}/api/${flow}/${keyword}`,
        res
    ).then((response) => {
        return response.data;
    }).catch((error)=>{
        return error;
    })
    res2["uid"] = res["uid"];
    console.log("inside auth", res2);
    return res2;
}

const signupapi = async (payload, flow) => {
    const res = await axios.post(
        `${baseURL}/api/${flow}/signup`,
        payload
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
    var keyword = 'getClient';
    if(flow!="client"){
        keyword = 'getWorker';
    }
    const res2 = await axios.post(
        `${baseURL}/api/${flow}/${keyword}`,
        res
    ).then((response) => {
        return response.data;
    }).catch((error)=>{
        return error;
    })
    res2["uid"] = res["uid"];
    console.log("inside auth", res2);
    return res2;
    return res;
}

export {
    loginapi,
    signupapi
}