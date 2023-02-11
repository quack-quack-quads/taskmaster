import {useState, useEffect, createContext} from "react";

export const BusinessContext = createContext();

export const BusinessProvider = ({
    children
}) => {
    return (
        <BusinessContext.Provider value={{
            // ! add state and functions here
        }}>
            {children}
        </BusinessContext.Provider>
    )
}