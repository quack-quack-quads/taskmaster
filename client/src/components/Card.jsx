import "./Card.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Card1 = (props) => {
    return (
        <Card style={{ width: props.width, height: props.height }} className={`pad ${props.class} ${props.highlight}`}>
            <Card.Img variant="top" src={props.image} className={`mt-${props.mtImage} card-image `} />
            <Card.Body>
                <Card.Title className={`d-flex  justify-content-center headname mt-${props.mtTitle} mr-${props.mr}`}>{props.name}</Card.Title>
                <Card.Text>

                </Card.Text>

            </Card.Body>
        </Card>
    )
}

export default Card1