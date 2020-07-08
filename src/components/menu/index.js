import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function (props) {

    const { storeId } = useParams();
    const { request, response, error, isLoading } = useFetch();
    const [menu, setMenu] = useState([]);
    const BBurl = `https://baristabuddyapi.azurewebsites.net/api/stores/${storeId}/Items`;



    const getItems = React.useCallback(() => {
        const requestbody = {
            url: BBurl,
            options: { method: "get" }
        }
        request(requestbody);
    }, [request, BBurl]);

    //useEffect for inital Load, Can add more dependencies as needed.
    useEffect(() => {
        getItems();
    }, [getItems]);

    //setting storelist
    useEffect(() => {
        if (response.length > 0) {
            console.log(response);
            setMenu(response);

        } else {
            getItems();
        }
    }, [response, getItems, setMenu]);

    //https://flaviocopes.com/how-to-format-number-as-currency-javascript/
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

    return (
        <>
            {menu ? menu.map(item => (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.imageUrl} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            <p>Ingredients: {item.ingredients}</p>
                            <h3>Price: {formatter.format(item.price)}</h3>
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            )) : <h3>Loading!</h3>}

        </>
    )
}