import './ActionButton.scss'


const ActionButton = (props)=>{
    return(
        <button 
        className="ActionButton"
        style={{"width" : props.width}}
        onClick={props.handler}
        >
            {props.text}
        </button>
    )
}

export default ActionButton;