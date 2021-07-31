import React, { useState,useEffect } from "react";
import axios from 'axios'
import {Card,CardImg,Row,Col} from 'react-bootstrap'



const API_URL='https://restcountries.eu/rest/v2/all'
function Country() {
  
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setCountries(res.data);
    });
  }, [countries]);

  return (
    
    <Row xs={1} md={4} className="g-4">

    {countries.map((element) => {
      return (
       
        <Col className="py-2">
            <Card key={element.name} className="light shadow-lg p-3 mb-5 bg-gray rounded text-dark  " style={{height:"50vh",border:"3px solid"}}>
                <CardImg variant="top" src={element.flag} style={{height:"25vh", width:"auto"}} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Title className="mb-3 text-muted">
                    {element.capital}
                  </Card.Title>
                  <Card.Text>{element.languages[0].name}</Card.Text>
                </Card.Body>
                </Card>
      
                </Col>

          );
        })}
        </Row>
      
  );
}

export default Country;
