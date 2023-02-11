import './JobCard.scss'

const JobCard = (props)=>{
    const handleClick = () => {
        props.handleOpenChat(props.id)
    }
    return <div className="JobCard card">
        <div className="card-content row">
            <div className="col-7">
                <div className="bid">
                <label> Current bid </label> {props.job['bid']} 
                </div>
                <div className="row">
                    <div className="col-6 infocol">
                        {props.job['category']} 
                    </div>
                    <div className="col-6 infocol">
                        Home
                    </div>
                </div>
            </div>
            <div className="col-5 d-flex justify-content-center align-items-center">
                <button className="btn btn-sm btn-light" onClick={handleClick}>
                    Open Chat
                </button>
            </div>
        </div>
    </div>
}

export default JobCard;