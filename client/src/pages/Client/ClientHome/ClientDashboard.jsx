import './ClientDashboard.scss'
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'
import JobListing from '../../../components/JobListing'

import { ClientContext } from '../../../context/clientContext'
import { useContext, useState } from 'react';


const ClientDashboard = ()=>{
    const {uid, name, email} = useContext(ClientContext);
    const [showListing, setShowListing] = useState(false);
    
    if(uid == null){
        return <div className="Dash">
            <Hero />
            <CategoryCards />
            <Features />
        </div>
    }else{
       return <div className="ClientDashboard">
            <div className="row pt-5">
                <div className="col-6">
                    <div className="Welcome">
                        Welcome {name}
                    </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                    <div>
                    <p>
                    Looking to find workers to get your job done?
                    </p>
                    <button className="btn btn-light btn-lg">
                        List Job Now
                    </button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default ClientDashboard;