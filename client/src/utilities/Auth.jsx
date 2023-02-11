import axios from "axios"

const baseURL = "http://localhost:5000"

const loginapi = async (email, password, flow) => {
    console.log("called");
    var payload = {
        "email": email,
        "password": password
    }
    await axios.post(
        `${baseURL}/api/auth/signin`,
        payload
    ).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
}

export {
    loginapi
}