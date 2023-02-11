import axios from "axios"

const baseURL = "http://localhost:5000"

const loginapi = async (email, password, flow) => {
    console.log("called");
    var payload = {
        "email": email,
        "password": password,
    }
    const res = await axios.post(
        `${baseURL}/api/auth/${flow}/signin`,
        payload
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
    return res;
}

export {
    loginapi
}