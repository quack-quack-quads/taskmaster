import Navbar from "../../components/Navbar/Navbar";
import Temp from './Home/Temp'
import { useState } from "react";
import { ClientProvider } from "../../context/clientContext"

const Admin = () => {
    const [show, setShow] = useState(true);
    //console.log(show);
    return (
        <ClientProvider>
            <div>
                <Temp/>
            </div>
        </ClientProvider>
    )
}

export default Admin