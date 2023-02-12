import { useState, useEffect, createContext } from "react";

const BusinessContext = createContext();

const BusinessProvider = ({
    children
}) => {
    const [buid, bsetUid] = useState(null);
    const [bname, bsetname] = useState(null);
    const [bemail, bsetEmail] = useState(null);
    const [bphone, bsetPhone] = useState(null);
    const [bstarredWorkers, bsetStarredWorkers] = useState(null);
    const [bjobList, bsetJobList] = useState(null);
    const [bsavedAddresses, bsetSavedAddresses] = useState(null);

    const bsetDetails = (uid_, name_, email_, phone_, starredWorkers_, jobList_, savedAddresses_)=>{
        bsetUid(uid_);
        bsetname(name_);
        bsetEmail(email_);
        bsetPhone(phone_);
        bsetStarredWorkers(starredWorkers_);
        bsetJobList(jobList_);
        bsetSavedAddresses(savedAddresses_);
    }

    return (
        <BusinessContext.Provider value={{
            buid, bsetUid,
            bname, bsetname,
            bemail, bsetEmail,
            bphone, bsetPhone,
            bstarredWorkers, bsetStarredWorkers,
            bjobList, bsetJobList,
            bsavedAddresses, bsetSavedAddresses,
            bsetDetails
        }}>
            {children}
        </BusinessContext.Provider>
    )
}

export {
    BusinessContext,
    BusinessProvider
}