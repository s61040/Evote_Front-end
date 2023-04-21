import { React, Component, useState, setState, useEffect } from "react";
import "./Home.css";
import { Button, Form } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Axios from "axios"; 
import { withSuccess } from "antd/lib/modal/confirm";
import {useNavigate} from "react-router-dom";
import Result from './../Result/Result';


function Home() {
  const navi = useNavigate();
  
  const [ide, setID] = useState(0);

  const [passwordl, setPasswordl] = useState([]);
  const [idss, setIdss] = useState([]);

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [level, setLevel] = useState(0); 
  const [adminList, setAdminList] = useState([]);
   
  const [clockState, setClockState] = useState();
 
  const current = new Date();
  const date2 = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`; 

  const getAdmin = () => {
    Axios.get(`${window._env_.API_URL}/admin`) // window._env_.API_URL  http://localhost:3001
    .then((response) => {
      setAdminList(response.data);
    });
  };

  useEffect(() => { 
    console.log(`${window._env_.API_URL}`)
    setInterval(() => {
      const dates = new Date();
      setClockState(dates.toLocaleTimeString()); 
    },1000) 
  }, []); 

  // Login admin || staff || participant -------------------------------------------------------------------------------------------------------
 
  const checkeventstatus = () => {
    Axios.post(`${window._env_.API_URL}/Checkevent`, {
      date : date,
      clockState: clockState,
    })
    .then((res,err) => {
      if(err){
        alert(err);
        console.log(err);
        console.log(res);
      } else {
        console.log(res);
        checklogin();
      }
    })
  }
 
  // Login admin || staff || participant -------------------------------------------------------------------------------------------------------

  const checklogin = () => {
     if(idss.length > 0 && passwordl.length > 0){
        Axios.post(`${window._env_.API_URL}/checklogin`, {
          idss: idss,        
        }).then((res,err) => {
          console.log(res.data);
          if(res.data.massage == "Login"){
            console.log(idss,passwordl);
            console.log(idss.length,passwordl.length); 
            login();
          } 
          else if(res.data.massage != "Login") {
            alert("CheckUsername or Password");
          }
        })
     }
     else{
        alert("Login fail");
     }
  };

  // Login admin || staff || participant -------------------------------------------------------------------------------------------------------

  const login = (e) =>
  { 
    Axios.post(`${window._env_.API_URL}/login`, { 
      idss: idss,
      passwordl: passwordl,  
    }).then((res,err) =>    
    {   
      console.log("res.data.message = ", res.data.message);
      console.log(err);
        if(res.data.message == 'FailUsername'){
            alert("ไม่มี User password")
        }
         else if(res.data.message === 'admin' || res.data.message === 'staff' || res.data.message === 'participant' )
         {
          Axios.get( `${window._env_.API_URL}/authen`, { 
            headers: {  
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${res.data.token}`
                    }   
                } 
          )   
           if(res.data.message == 'participant')
          {
            localStorage.setItem('token',res.data.token); 
            localStorage.setItem('user',res.data.user); 
            localStorage.setItem('event',res.data.event); 
            localStorage.setItem('timeout',res.data.timeout); 

            localStorage.setItem('time',clockState);  
            localStorage.setItem('date',date); 

            console.log('participant', res.data);
            navi('\Usermain');
          }  
          else if(res.data.message == 'admin')
          {
            localStorage.setItem('token',res.data.token); 
            localStorage.setItem('user',res.data.user); 
            console.log('admin',res.data);
            navi('\MainAdmin');             
          }  
          else  if(res.data.message == 'staff')
          {
            localStorage.setItem('token',res.data.token); 
            localStorage.setItem('user',res.data.message); 
            localStorage.setItem('ID',res.data.id); 
            localStorage.setItem('ID_E',res.data.id_e); 
            console.log('staff',res.data); 
            navi('\MainStaff');
          }  
         }  else {
          alert("คุณได้ทำการเลือกตั้งไปแล้ว")
        }
    }) 
    .catch((error) => { 
      console.log(error); 
    });  
  } 

  // Voted -------------------------------------------------------------------------------------------------------
  
  const Voted = () => { 
    Axios.post(`${window._env_.API_URL}/loginVoted`,{
      idss: idss,
    }).then((res,err) => {
      if(err){
        console.log(err)
      } 
      console.log(res.data.massage)
      
      if(res.data.massage == "true")
      {   
        localStorage.setItem('ID',res.data.id);  
        localStorage.setItem('authen',res.data.authen);  
        navi("\Result");
      } else {
        alert(" ไม่มีอีเว้นทที่คุณโหวต ")
      }
    })
  }
  
 
  return (
    <div className="App">
      <div className="Home">
        <body className="bodyleft">
          <div>
            <h1 style={{fontWeight:'bold',color:"#FF4B2B"}} >{date2}  {clockState}</h1>
            <h1 style={{fontWeight:'bold',color:"#FF4B2B"}} >Check ResultVote</h1>
            <br></br> 
            <div> 
            <br></br> 
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control name="id" type="id" placeholder="Enter" 
                onChange={ (event) => {
                  setIdss(event.target.value)
                }} 
                />
              </Form.Group> 
              <Button 
                style={{fontSize: '70%' }}
                id="button_full_o" 
                onClick={Voted}   
                variant="primary" >
                Check Vote
              </Button> 
            </Form> 
            </div>
          </div>
        </body>
        <body className="bodyright">
          <div>
            <h1 style={{fontWeight:'bold',color:"white"}}>Login</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control name="id" type="id" placeholder="Enter" 
                onChange={ (event) => {
                  setIdss(event.target.value)
                } }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control name="password" type="password" placeholder="Password" onChange={ (event) => {
                  setPasswordl(event.target.value)
                } } />
              </Form.Group>  
              <Button 
                id="button_h_o" 
                onClick={checkeventstatus}   
                variant="primary" >
                Login
              </Button> 
            </Form>

            <br></br> 

            {adminList.map((val, key) => {
              return (
                <div className="admin card">
                  <div className="card-body text-left">
                    <p className="card-text">ID:{val.id}</p>
                    <p className="card-text">Username:{val.username}</p>
                    <p className="card-text">Password:{val.password}</p>
                    <p className="card-text">Level{val.level}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </body>
      </div>
    </div>
  );
}

export default Home; 