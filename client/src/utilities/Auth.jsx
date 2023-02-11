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
    return res;
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
    return res;
}

export {
    loginapi,
    signupapi
}