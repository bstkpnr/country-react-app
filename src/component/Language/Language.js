import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem,Card } from "react-bootstrap";
 const API_URL='https://restcountries.eu/rest/v2/all'

function LanguageStatic() {

const [languages, setlanguages] = useState([]);

const newLangDatas = [];

useEffect(() => {
  axios.get(API_URL).then((res) => {
    res.data.forEach((element) => { 
      element.languages.forEach(lang => { 
          let findIndex = newLangDatas.findIndex(lng => lng.iso639_1 === lang.iso639_1); 
          if(findIndex === -1){ 
            newLangDatas.push({...lang, count:1});
          }else{
            newLangDatas[findIndex].count += 1;
          }
      });   
    });

    newLangDatas.sort((a, b) => (a.count < b.count) ? 1 : -1);
    
    setlanguages(newLangDatas); 
  });
}, []);

return (
  <>
  <div className="container  d-flex justify-content-center my-3">


<Card className="shadow-lg  bg-white rounded">

    <ListGroup className="list-group-flush p-4 col-12 ">
      <h4 className="p-3 mb-2 bg-secondary text-white rounded">Language Top 10</h4>
  {
    languages.map((lang, index) => ( 
      
      (index < 10 && (
        <p>
        <span className="badge bg-dark p-3 col-12">{lang.name} - ({lang.count} )</span>
      </p>
    ))
    
    ))
  } 
    </ListGroup>
    
  </Card>
  </div>
  </>

);
       };


export default LanguageStatic;
