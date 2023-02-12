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
    console.log(res);
    return res;
}

const signupapi = async (payload, flow) => {
    console.log(payload);
    const res = await axios.post(
        `${baseURL}/api/${flow}/signup`,
        payload
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
    console.log(res);
    return res;
}

export {
    loginapi,
    signupapi
}