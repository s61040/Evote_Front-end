import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Addlist.css";
import {
  Card,
  Button,
  Alert,
  Col,
  Row,
  Container,
  Form,
} from "react-bootstrap";
import Home from "./../Home/Home";
import Event from "./Eventcreate";
import Navmas from "./../Navmaster/Navmas";
import axios from "axios";

function Useraddlist() {

  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  let csvv = [];
  const fileReader = new FileReader();


  const [login, setLogin] = useState([]);

  const [name, setName] = useState([]);
  const [surname, setSurname] = useState([]);
  const [email, setEmail] = useState([]);
  const [total, setTotal] = useState([]);
  const [namelist, setNamelist] = useState([]);

  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");

  useEffect(() => {
    check_authen();
    Show_totaluser();
  }, []);


  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        // console.log(obj);
        return object;
        
      }, {});
      return obj;
    });
    csvv = array;
    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        var count = 0;
        const text = event.target.result;
        csvFileToArray(text);
        Axios.get(`${window._env_.API_URL}/iduser`,)
          .then((res,err) => {
            count = res.data.massage;
            count = count+1;
            console.log("count = " , count);
            for (var i = 0; i < csvv.length; i++) {   
              if(csvv[i].Name != ""){
                Axios.post(`${window._env_.API_URL}/addnamelistss`, {
                  count : count+i,
                  name: csvv[i].Name,
                  surname: csvv[i].Surname,
                  email: csvv[i].Email,
                })
                  .then((res, err) => {   
    
                    if(res.data.Massage == "canadd"){
                      // alert("เพิ่มรายชื่อสำเร็จ"); 
                    } else {
                      // console.log(res)
                      alert("เช็คข้อมูล")
                    }
                    alert("เพิ่มรายชื่อสำเร็จ");
                  })
                  .catch((error) => {
                    console.log(error);
                  }); 
              } 
        }
          }) 
      };
       
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

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

  const Add_list_check = () => {
    if (name.length > 0 && surname.length > 0 && email.length > 0) {
      Axios.post(`${window._env_.API_URL}/checknamelist`, {
        name: name,
        surname: surname,
        email: email,
      }).then((res, err) => {
        console.log(res.data, "sdas");
        if (res.data.Massage == "Can") {
          console.log(name, surname);
          Add_list();
        } else if (res.data.Massage == "CheckEmail") {
          alert("CheckEmail");
        } else if (res.data.Massage == "CheckName/Surname") {
          alert("Check Name/Surname");
        }
      });
    } else {
      alert("Login fail");
    }
  };

  const Show_totaluser = () => {
    axios.get(`${window._env_.API_URL}/showtotaluser`).then((response) => {
      console.log("data = ", response.data.total);
      setTotal(response.data.total);
    });
  };

  const Add_list = () => {
    Axios.post(`${window._env_.API_URL}/addnamelist`, {
      name: name,
      surname: surname,
      email: email,
    })
      .then((res, err) => {
        console.log("Create");
        setNamelist([
          ...namelist,
          {
            name: name,
            surname: surname,
            email: email,
          },
        ]);
        console.log("data", res.data);
        alert("เพิ่มรายชื่อผู้ใช้งาน");
        setName([]);
        setSurname([]);
        setEmail([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navmas head={<h3> เพิ่มรายชื่อผู้ใช้งาน </h3>} role={login} />
      <div className="Mainadlist">
        <Card style={{ borderColor: "#FF4B2B" }}>
          <Card.Header
            style={{
              color: "#ffffff",
              border: "3px solid #FF4B2B",
              backgroundColor: "#FF4B2B",
            }}
          >
            <div class="row">
              <div class="col">
                <h4
                  style={{
                    color: "#ffffff",
                  }}
                >
                  ข้อมูลผู้ใช้งาน{" "}
                </h4>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label> ชื่อ </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Surname">
                <Form.Label> นามสถล </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Email">
                <Form.Label> อีเมลล์ </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
            <div style={{ padding: 20 }}>
              <Row>
                <Col>
                  <Button
                    id="button_full_o"
                    onClick={() => Add_list_check()}
                    type="submit"
                    // href="/MainAdmin/Usermain"
                  >
                    ยืนยัน
                  </Button>
                </Col>
                <Col>
                <form>
                  <input
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnChange}
                  />

                  <button
                  
                    onClick={(e) => {
                      handleOnSubmit(e);
                    }}
                  >
                    IMPORT CSV
                  </button>
                </form> 
                </Col>
                <Col>
                  <Button id="button_full_o" href="/MainAdmin/Usermain">
                    กลับ
                  </Button>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
        <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Useraddlist;
