import { useAtom } from "jotai";
import { Row, Col, Container} from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { Card } from 'react-bootstrap';
import { favouritesAtom } from "@/store";

export default function Favourites(){
    const [favouritesList] = useAtom(favouritesAtom);

    if(!favouritesList) return null;

    return (
        <Container>
        {favouritesList.length > 0 ? (
        <Row className="gy-4">
            {favouritesList.map(objectID => (
                <Col key={objectID} lg={3} >
                    <ArtworkCard objectID={objectID} />
                </Col>
            ))}
        </Row>
        ):(
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <h4>Nothing here.</h4> 
                        Try adding some new artwork to the list.
                    </Card.Body>
                </Card>              
            </Col>
        </Row>
        )}
        </Container>      
    )
}


