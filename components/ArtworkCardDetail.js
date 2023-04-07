import useSWR from 'swr';
import Error from 'next/error';
import { Button, Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react';

export default function ArtworkCardDetails(props){
    const { objectID } = props;
    const {data , error} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(objectID));
    }, [favouritesList]);

    const favouritesClicked = async () =>{
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
        }else{
            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true);
        }
    };

    if (error) {
        return<Error statusCode={404}/>;
    }

    if(!data){
        return null;
    }

    const imageHld = data.primaryImage;

    var imageipt;
    
    if (imageHld){
        imageipt = <Card.Img src ={imageHld}/>
    }

    
    const title = data.title || 'N/A';
    const objectDate = data.objectDate || 'N/A';
    const classification = data.classification || 'N/A';
    const medium = data.medium || 'N/A';
    const Displayname = data.artistDisplayName || 'N/A';
    const credit = data.creditLine || 'N/A' ;
    const dimension = data.dimensions || 'N/A' ;
    const artistdata = data.artistWikidata_URL;

    return(
        <>
           <Card>            
            {imageipt}
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong> {objectDate} <br />
                        <strong>Classification: </strong> {classification} <br />
                        <strong>Medium: </strong> {medium} <br />
                        <br />
                        <strong>Artist name: </strong>{Displayname}{' ( '}
                            {Displayname && (
                                <a href={artistdata} target="_blank" rel="noreferrer">wiki</a>
                            )}{' )'} <br />
                        <strong>Credit Line: </strong> {credit} <br />
                        <strong>Dimensions: </strong> {dimension} <br />
                        <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
                            {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                        </Button>

                    </Card.Text>
                </Card.Body>
           </Card>
        </>
    )
}