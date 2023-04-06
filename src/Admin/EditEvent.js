import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
import {
  Card,
  InputGroup,
  FormControl,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import "./Css/Event.css";
import Edit from './Eventmanage';


function EditEvent() {
  const [name_e, setName_e] = useState([]);
  const [detail, setDetail] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]); 
  const [anon, setAnon] = useState(0); 
  const [c1, setC1] = useState(1); 
  const [c2, setC2] = useState(1);  
  const [login, setLogin] = useState([]);
  const useruserlogin = localStorage.getItem("user");  
  const tokenC = localStorage.getItem("token");
  const namm_edit = localStorage.getItem("name_edit");
  useEffect(() => { 
    check_authen();  
    Showevent();
    console.log("name_e == ==== == == ==",name_e);
  }, []);

  const Showevent = () => {
    Axios.post( `${window._env_.API_URL}/Showdetailevent`, {
      namm_edit: namm_edit,
    }) . then((res , err) => {
      alert(namm_edit)
      setName_e(res.data.naem_e);
      setDetail(res.data.detail);
      setStart(res.data.start.substring(0, 10));
      setEnd(res.data.end.substring(0, 10));
      setAnon(res.data.anonimus);
      console.log(res.data);
      if(res.data.anonimus  ==  1){
        alert("namm_editw")

        console.log("res.data.anonimus 1 ")
         setC1(0);
      } else if(res.data.anonimus  ==  2){
        alert("namm_editw")
        console.log("res.data.anonimus 2")
          setC2(0); 
      }
    })
  }

  const Delete_Event=() =>{
    Axios.post(`${window._env_.API_URL}/Delete_event`, {  
      namm_edit : namm_edit, 
    }) .then((res , err ) => {
      alert("Update Sugsess");  
      console.log(res);
    }).catch((err) => {
      alert("No Update");   
      console.log(err)  
    }) 
  }

  const Update_Event = () =>{
    Axios.post(`${window._env_.API_URL}/Update_event`, {  
      namm_edit : namm_edit,
      name_e : name_e,
      detail :detail , 
      start : start,
      end : end,
      anon : anon, 
    }) .then((res , err ) => {
      alert("แก้ไขเสร็จสิ้น");  
      console.log(res);
    }).catch((err) => {
      alert("ไม่สามารถแก้ไขได้");   
      console.log(err)  
    }) 
  }

  const check_authen = () =>{
    Axios.post(`${window._env_.API_URL}/authen`, { 
      tokenC : tokenC,
    })  
      .then((res , err) => {
        if (tokenC != null) {  
          if(res.data.message == "admin"){
            console.log("res = ", res);
            alert(res.data); 
          setLogin(useruserlogin); 
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
         localStorage.clear();
        window.location = "/"; 
        console.log("err")  
      });
  } 
    return (
     <div>
      <header id="Headermain">
          <h1 id="main">Edit {namm_edit} </h1>
          <div id="Number">
            <p>{login}</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <div style={{ marginTop: 30 }}>
        <Card id="Cardevent">
            <Card.Header as="h5">Featured</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>Name Event</h3>
                  <Form.Control 
                    type="email" 
                    value={name_e} 
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setName_e(e.target.value);
                    }}/> 
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <h3>Detail</h3>
                  <Form.Control
                     as="textarea"
                     value={detail}
                      rows={3}
                      onChange={(e) => {
                        setDetail(e.target.value);
                      }}/> 
                </Form.Group> 
                <h3>Date Time </h3>
                <Row>
                  <Col>
                    <Form.Control 
                    type ="date"
                     placeholder="End Date"
                     value={start} 
                     onChange={(e) => {
                       setStart(e.target.value);
                     }}/>  
                  </Col>
                  <Col>
                    <Form.Control type="date" placeholder="End Time" value={end} 
                    onChange={(e) => {
                    setEnd(e.target.value);
                  }}/> 
                  </Col>
                </Row>
               
                <br />
                <Row>  
                  <Col  >
                    <Button type="submit" onClick={Update_Event}> Submit </Button>
                    <Button style={{ marginLeft: 30 }} onClick={Delete_Event} type="submit"> Delete </Button>
                  </Col>
      
                </Row>
              </Form>
            </Card.Body>
          </Card> 
        </div>
     </div>
    )
  } 

export default EditEvent
