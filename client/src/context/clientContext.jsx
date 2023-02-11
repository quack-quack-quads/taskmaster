import {useState, useEffect, createContext} from "react";

const ClientContext = createContext();

const ClientProvider = ({
    children
}) => {
    const [uid, setUid] = useState("dfkdjf");
    const [name, setname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [starredWorkers, setStarredWorkers] = useState(null);
    const [jobList, setJobList] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState(null);

    const setDetails = (uid_, name_, email_, phone_, starredWorkers_, jobList_, savedAddresses_)=>{
        setUid(uid_);
        setname(name_);
        setEmail(email_);
        setPhone(phone_);
        setStarredWorkers(starredWorkers_);
        setJobList(jobList_);
        setSavedAddresses(savedAddresses_);
        console.log("set details");
    }
    
    return (
        <ClientContext.Provider value={{
            uid, setUid,
            name, setname,
            email, setEmail,
            phone, setPhone,
            starredWorkers, setStarredWorkers,
            jobList, setJobList,
            savedAddresses, setSavedAddresses,
            setDetails
        }}>
            {children}
        </ClientContext.Provider>
    )
}
export {
    ClientContext,
    ClientProvider
}