import {useState, useEffect, createContext} from "react";

export const ClientContext = createContext();

export const ClientProvider = ({
    children
}) => {
    const [account, setAccount] = useState(null);
    

    return (
        <ClientContext.Provider value={{
            // ! add state and functions here
            account,
            setAccount
        }}>
            {children}
        </ClientContext.Provider>
    )
}