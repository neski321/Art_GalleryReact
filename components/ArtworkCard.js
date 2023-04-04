import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';

export default function ArtworkCard(props){
    const { objectID } = props;
    const {data , error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) {
        return<Error statusCode={404}/>;
    }

    if(!data){
        return null;
    }

    const imageHld = data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
    const title = data.title || 'N/A';
    const objectDate = data.objectDate || 'N/A';
    const classification = data.classification || 'N/A';
    const medium = data.medium || 'N/A';

    return(
        <>
           <Card>            
            <Card.Img src ={imageHld}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <strong>Date:</strong> {objectDate}
                        <strong>Classification:</strong> {classification}
                        <strong>Medium:</strong> {medium}
                    </Card.Text>
                </Card.Body>
                <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="btn btn-outline-dark">ID: {objectID}</Button>
        </Link>
           </Card>
        </>
    )
}