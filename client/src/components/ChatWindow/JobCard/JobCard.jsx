import './JobCard.scss'

const JobCard = (props)=>{
    return <div className="JobCard card">
        <div className="card-content row">
            <div className="col-7">
                <div className="bid">
                    16000 <label> Current bid </label>
                    {props.bid}
                </div>
                <div className="row">
                    <div className="col-6">
                        {props.category}
                    </div>
                    <div className="col-6">
                        {props.location} 
                    </div>
                </div>
            </div>
            <div className="col-5 d-flex justify-content-center align-items-center">
                <button className="btn btn-sm btn-light">
                    Open Chat
                </button>
            </div>
        </div>
    </div>
}

export default JobCard;