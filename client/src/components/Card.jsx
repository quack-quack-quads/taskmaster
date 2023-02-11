import "./Card.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Card1 = (props) => {
    return (
        <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src={props.image}/>
        <Card.Body>
            <Card.Title className="d-flex justify-content-center headname">{props.name}</Card.Title>
            <Card.Text>

            </Card.Text>
            
        </Card.Body>
        </Card>
    )
}

export default Card1