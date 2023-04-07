import styles from '@/styles/History.module.css';
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Row, Col, Container, ListGroup, ListGroupItem, Card, Button} from 'react-bootstrap';
import { removeFromHistory } from '@/lib/userData';

export default function history() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    if(!searchHistory) return null;

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    })

    const historyClicked = (e,index) => {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked =async (e,index) => {
        e.stopPropagation(); //stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    return(
        
    <Container className="gy-4">
    {parsedHistory.length > 0 ? (
      <ListGroup>
        {parsedHistory.map((historyItem, index) => (
          <ListGroup.Item 
          key={index} 
          onClick={(e) => historyClicked(e, index)}
          className = {styles.historyListItem}
          >
            {Object.keys(historyItem).map((key) => (
              <span key={key}>
                {key}: <strong>{historyItem[key]}</strong>&nbsp;
              </span>
            ))}
            <Button 
              className="float-end" 
              variant="danger" 
              size="sm" 
              onClick={(e) => removeHistoryClicked(e, index)}>
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
    <Row>
     <Col>
        <Card>
            <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for some artwork.
            </Card.Body>
        </Card>
      </Col>
    </Row>
    )}
  </Container>
);
}