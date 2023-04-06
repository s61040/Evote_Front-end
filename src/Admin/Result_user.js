import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Space, Tag, Input } from "antd";
import "antd/dist/antd.css";
import {Form, Table, InputGroup,  Button, Container} from "react-bootstrap";
import { Submit } from "./Submit";
import Adduser from "./Adduser";
import Result from './../Result/Result';
import Addcandidate from './Addcandidate';
 

const { Search } = Input;
const onSearch = (value) => console.log(value);

function Result_user() {
  const [nameevent, setNameevent] = useState([]); 
  const [check, setCheck] = useState(0);
  const [user, setUser] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [password, setPassword] = useState([]);
  const [deleteuser, setDeleteuser] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [candidateinfo, setCandidateinfo] = useState([]); 
  const [totalcandidate, setTotalcandidate] = useState([]);
  const [totaluser, setTotaluser] = useState([]);
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");   
  const tokenC = localStorage.getItem("token");

  const getname = localStorage.getItem("nameevent");
  useEffect(() => {
    prepare_candidate();
    prepare_user();
    check_authen();
  },[]);  

   const check_authen = () => {
    Axios.post(`${window._env_.API_URL}/authen`, {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "admin" || res.data.message == "staff") {
            console.log("res = ", res);
            // alert(res.data);
            setLogin(authen);
            console.log("res.data", res.data.message);
          } else {
            alert("Fail Authen");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("No Token");
          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("authen catch");
        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  // const eventname = (e) => {
  //   Axios.get("${window._env_.API_URL}/eventname")
  //   .then((res) => {
  //     setNameevent(res.data.massage.p_name_event);
  //     if(nameevent.length != 0){
  //         console.log(res.data.massage.p_name_event);
  //     }
  //     setCheck(1);
  //   });
  // };


//  const sendmail = () => { 
//    console.log("resp.data", userinfo , "pass" , password);  
//    Axios.post("${window._env_.API_URL}/sendmail", {
//      userinfo: userinfo,
//      password: password,
//      getname: getname,
//    })
//      .then((res, err) => {
//        setUserlist([
//          ...userlist,
//          {
//            userinfo: userinfo,
//            password: password,
//            getname: getname,
//          },
//        ]);
//        alert(userinfo);
//        console.log("userinfo ==> ", userinfo.length);
//        console.log(res);
//      })
//      .catch((error) => {
//        console.log(error);
//      });
//  };
 
  const Delete_data =(id) =>{
    console.log(id);
    Axios.post(`${window._env_.API_URL}/Deleteuser`, {
        id:id,
    }).then((res) => { 
      console.log(res.data );
      console.log("Delete = " , id);
    });
  }; 


  const Totaluser_no = () =>{
    Axios.post(`${window._env_.API_URL}/totaluser`, {
      getname: getname,
      totaluser : totaluser,
      totalcandidate : totalcandidate,
    }).then((res) => { 
      console.log(res);
      console.log("Update");
    });
  }; 

  const prepare_candidate = (e) => {
    Axios.post(`${window._env_.API_URL}/Resulcan`, {
      getname: getname,
    }).then((res) => {
      setCandidate(res.data.massage);
      setTotalcandidate(res.data.candidatelength);
      console.log(res.data.massage); 
      console.log("data.candidate");
    });
  };

  const prepare_user = (e) => { 
    Axios.post(`${window._env_.API_URL}/Resuluser`, {
      getname: getname,
    }).then((res) => {
      setUser(res.data.massage); 
      setTotaluser(res.data.userlength);
      console.log(res.data.massage);   
      console.log("data.User"); 
      });  
  };


  const submitce = () => {
    setUserinfo(user.map((e) => e.mail_kmutnb));
    setPassword(user.map((e) => e.password));
    console.log("resp.data", userinfo, "pass", password);
    if (userinfo.length > 0) {
      Axios.post(`${window._env_.API_URL}/mailuser`, {
        userinfo: userinfo,
        password: password,
        getname: getname,
      })
        .then((res, err) => {
          alert("Insert Sendmail");
          console.log("mail==> ", res);
          Totaluser_no();
          Axios.post(`${window._env_.API_URL}/sendmail`, {
            userinfo: userinfo,
            password: password,
            getname: getname,
          })
            .then((res, err) => {
              setUserlist([
                ...userlist,
                {
                  userinfo: userinfo,
                  password: password,
                  getname: getname,
                },
              ]);
              alert(userinfo);
              console.log("userinfo ==> ", userinfo.length);
              console.log(res);
              window.location = "/MainAdmin";
              
            })
            .catch((error) => {
              console.log(error);
            }); 
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Check");
    }
  }; 
  return (
    <div className="main">
      <div>
        <header id="Headermain">
          <h1 id="main">{getname}</h1>

          <div id="Number">
            <p>{login}</p>
            <a href="/">Logout</a>
          </div>
        </header>
        <div>
          <h1>Total Candidate</h1>
        </div>
        <div>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            style={{
              width: 304,
              marginLeft: 1000,
            }}
            onSearch={onSearch}
          />

          <Container style={{ padding: 20 }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name Candidate</th>
                  <th>Detail Candidate</th>
                  <th>del</th>
                </tr>
              </thead>
              <tbody>
                {candidate.map((item) => (
                  <tr key={item.p_id_c}>
                    <td>{item.p_id_c + 1}</td>
                    <td>{item.p_name_candidate}</td>
                    <td>{item.p_detail_c}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => Delete_data(item.id_user)}
                        variant="contained"
                        href="#contained-buttons"
                        type="submit"
                      >
                        Del
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <InputGroup className="mb-3"> 
              <Button href="/Event/Addcandidate" variant="outline-secondary" id="button-addon2">
                Addcandidate
              </Button>
            </InputGroup>
          </Container>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>

      <div>
        <header style={{ padding: 20 }}>
          <h1>Total User</h1>
        </header>

        <div>
          <Container style={{ padding: 20 }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>detail</th>
                  <th>del</th>
                </tr>
              </thead>
              <tbody>
                {user.map((items) => (
                  <tr key={items.id_user}>
                    <td>{items.no_user}</td>
                    <td
                      value={items.mail_kmutnb}
                      onChange={(e) => {
                        setUserinfo(e.target.value);
                      }}
                    >
                      {items.mail_kmutnb}
                    </td>
                    <td>{items.name_event}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => Delete_data(items.id_user)}
                        variant="contained"
                        href="/Result_user"
                        type="submit"
                      >
                        Del
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <InputGroup className="mb-3"> 
              <Button href="/Adduser" variant="outline-secondary" id="button-addon2">
                Adduser
              </Button>
            </InputGroup>
            <div style={{ display: "flex" }}>
              <Button
                href="/Adduser"
                variant="primary"
                type="submit"
                style={{ width: 200, marginLeft: 200 }}
              >
                Back
              </Button>
              <Button
                // href="/Mainadmin"
                variant="primary"
                type="submit"
                style={{ width: 200, marginLeft: 500 }}
                onClick={submitce} 
              >
                Submit
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default Result_user;
