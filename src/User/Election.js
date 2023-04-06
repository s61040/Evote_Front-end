import { React, Component, useState, setState, useEffect } from "react";
import "./Css/Main.css";
import { Card, CardGroup, Container, Button} from "react-bootstrap";
import Axios from "axios"; 
import { Submit } from './../Admin/Submit';
import Navmas from "../Navmaster/Navmas";





const getname = localStorage.getItem("eventname");  
const getuser = localStorage.getItem("user");  
  const authen = localStorage.getItem("user");  
  const tokenC = localStorage.getItem("token");


function Election () {
  const [candidate, setCandidate] = useState([]);
  const [number, setNumber] = useState([]); 
  const [login, setLogin] = useState([]);

  useEffect(() => { 
    prepare_candidate();
    check_authen();
    Axios.get(`${window._env_.API_URL}/userevent`) 
    .then((res) => { 
      console.log("next",res.data.massage);
      console.log("data.candidate");
    }); 
  }, []);
  
  const check_authen = () =>{  
    Axios.post(`${window._env_.API_URL}/authen`, { 
      tokenC : tokenC,
    })  
      .then((res , err) => {
        if (tokenC != null) {   
          if(res.data.message == "participant" ){
            console.log("res = ", res);
            alert(res.data); 
          setLogin(authen); 
          console.log("res.data" ,  res.data.message);   
          }  else {
            alert("Fail Authen");
            localStorage.clear();
            window.location = "/"; 
          }
        } else if(tokenC != res.data.tokenC){  

          alert("No Token");
          localStorage.clear();
          window.location = "/"; 
          // window.location = "/"; 

        }
      }).catch((err) => { 
        alert("authen catch");  
        console.log("err" , err)  
      });
  } 

  const prepare_candidate = (e) => {
    Axios.post(`${window._env_.API_URL}/Resulcan`, {
      getname: getname,
    }).then((res) => {
      setCandidate(res.data.massage);
      console.log(res.data.massage);
      console.log("data.candidateew");
    });
  };

  const Vote = (id) => {
    Axios.post(`${window._env_.API_URL}/Vote`, {
      getname: getname,
      getuser: getuser,
      id:id,
    }).then((res) => {
       if(res.data.Massage == "insert")
       {
         window.localStorage.clear();
         console.log("Insert",res);
         alert("Insert"); 
       } else {
          console.log("FailVote");
          alert("Fail Vote");
       }
    });
  };


console.log("candidate",candidate);
    return ( 
      <div>
        <Navmas
          head = {"UserMain"}
          role = {login} 
        /> 
        <div className="Mainadmin">
          <Card>
            <Card.Header>Selected Election </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> สำหรับ User เข้ามาลงคะแนนเสียงเพื่อคนที่คุณไว้ใจ </p>
                <footer className="blockquote-footer">
                  Power!!! <cite title="Source Title">Title</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>

          <div className="Event">
          {candidate.map((item) => (
              <div className="Card1" key={item.p_id_c} >
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>Number.{item.p_id_c+1}</Card.Header>
                <Card.Body> 
                  <Card.Img
                    variant="top"
                    // src={item.p_image_c} 
                    src={require("../images/"+item.p_image_c)} 

                  /> 
                  {/* recource={{uri: article.img}} */}
                  <label>{item.p_detail_c}</label><br></br>
                  <label>{"''"+item.p_image_c+"''"}</label>
                  <br></br>
                  {" "}
                      <Button
                        onClick={() => Vote(item.p_id_c+1)}
                        variant="primary"
                        href="/a"
                        type="submit"
                      >
                        Submit
                      </Button>
                </Card.Body>
              </Card>
            </div>  
            ))};
          </div>
        </div>
      </div>
    ); 
} 
export default Election;
