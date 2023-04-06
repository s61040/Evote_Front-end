import { React, Component, useState, setState, useEffect } from "react"; 
import { Card, CardGroup, Container, Button } from "react-bootstrap";
import Axios from "axios"; 
import useItems from "antd/lib/menu/hooks/useItems";





const getname = localStorage.getItem("eventname");  
const getuser = localStorage.getItem("user");  


function Testimage () {
  const [candidate, setCandidate] = useState([]);
  useEffect(() => { 
    prepare_candidate();
    Axios.get("http://localhost:3001/userevent") 
    .then((res) => { 
      console.log(res.data.massage);
      console.log("data.candidate");
    }); 
  }, []);
  
  

  const prepare_candidate = (e) => {
    Axios.post("http://localhost:3001/Resulcan", {
      getname: getname,
    }).then((res) => {
      setCandidate(res.data.massage);
      console.log(res.data.massage);
      console.log("data.candidateew");
    });
  };
console.log("candidate",candidate);
    return ( 
      <div>
        <header id="Headermain">
          <h1 id="main">{getname} </h1>

          <div id="Number">
            <p>{getuser}</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <body>
            <button onClick={prepare_candidate}>Tac</button>
            <div className="Mainadmin">
            {candidate.map((items) => (
                <div  key={items.p_id_c}>
                    <p >{items.p_id_c}</p> 
                    <img>{items.p_image_c}</img> 

                </div> 
            ))};
            </div>
          <div className="Event">
          {candidate.map((item) => (
              <div className="Card1" key={item.p_id_c} >
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Number.{item.p_id_c+1}</Card.Header>
                <Card.Body> 
                  <Card.Img
                    variant="top"
                    // src={item.p_image_c}
                    src={item.p_image_c}
                  /> 
                  {/* ource={{uri: article.img}} */}
                  <label>{item.p_detail_c}</label><br></br>
                  <label>{"''"+item.p_image_c+"''"}</label>
                  <br></br>
                  <Button  variant="primary">
                    Submit
                  </Button>
                </Card.Body>
              </Card>
            </div>  
            ))};
          </div> 
        </body>
        
      </div>
    ); 
} 
export default Testimage;
