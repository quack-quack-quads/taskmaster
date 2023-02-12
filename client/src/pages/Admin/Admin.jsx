import Navbar from "../../components/Navbar/Navbar";
import Home from './Home/Home'
import { useState } from "react";

const Admin = () => {
    const [show, setShow] = useState(true);
    //console.log(show);
    return (
        <div>
            <Home />
        </div>


    )
}

export default Admin