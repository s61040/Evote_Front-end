import { React, Component, useState, setState, useEffect } from "react";
import { Space, Table, Tag, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Event.css";
import Navmas from './../Navmaster/Navmas';
import { 
  Card,
  InputGroup,
  FormControl,
  Container,
  Button,
  Form,
  Modal,
  Col,
  Row,
} from "react-bootstrap";

var dataTable2 = [];

function Eventcreate() {
  const navi = useNavigate();
  const [nameevent, setNameevent] = useState([]);

  const [detaile, setDetaile] = useState([]);
  const [starte, setStarte] = useState([]);

  const [starttime, setStarttime] = useState([]);
  const [endtime, setEndtime] = useState([]);

  const [lgShow, setLgShow] = useState(false);

  const [checka, setChecka] = useState(0);

  const [level, setLevel] = useState(0);
  const [eventlist, setEventlist] = useState([]);
  const [password, setPassword] = useState([]);

  const [timeout, setTimeout] = useState([]);

  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");

  // Staff

  const [id_s, setId_s] = useState(0);
  const [name_s, setName_s] = useState("");
  const [surname_s, setSurname_s] = useState("");
  const [userlist, setUserlist] = useState([]);
  const [event_now, setEvent_now] = useState([]);
  const [email, setEmail] = useState("");

  var email_staff = "";
  var password_staff = "";
  var event_staff = "";

  const { Column, ColumnGroup } = Table;

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
    check_authen();
    showall();
  }, []);

  const showall = (e) => {
    Axios.post(`${window._env_.API_URL}/showaddstaff`, {
      // eventnow: eventnow,
    }).then((res) => {
      console.log(res.data.massage);
      console.log("data.User");
      dataTable2 = [];
      for (var i = 0; i < res.data.massage.length; i++) {
        dataTable2.push({
          key: res.data.massage[i].User_id,
          Name: res.data.massage[i].Name,
          Surname: res.data.massage[i].Surname,
          Email: res.data.massage[i].Email,
        });
      }
    });
  };

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
  const prepare2 = () => {
    console.log(starttime + " =  Start Tinme");
    console.log(endtime + " =  End Tinme");
  };







  const prepare = (e) => {
    const dateS = new Date(starte);

    if (
      nameevent.length > 0 && 
      detaile.length > 0 &&
      starte.length > 0 &&
      timeout.length > 0 &&
      starttime.length > 0 &&
      endtime.length > 0 &&
      name_s.length > 0
    ) {
      if(timeout > 60){
        alert("ไม่ควรใส่เวลาเชื่อต่อเกิน 60")
      }
      else if (current >= dateS) {
        alert("กรุณาเช็ควันที่");
      } else {
        Axios.post(`${window._env_.API_URL}/createevnet`, {
          nameevent: nameevent,
          detaile: detaile,
          starte: starte.substring(0, 10),
          starttime: starttime,
          endtime: endtime,
          checka: checka,
          id_s: id_s,
          timeout:timeout,
        })
          .then((res) => {
            if (res.data.massage == "FailEventname") {
              alert("กรุณาตรวจสอบชื่อการเลือกตั้ง");
            } else {
              setEventlist([
                ...eventlist,
                {
                  nameevent: nameevent,
                  detaile: detaile,
                  starte: starte,
                  starttime: starttime,
                  endtime: endtime,
                  checka: checka,
                  timeout:timeout,
                },
              ]);
              console.log("Create Event = " , res.data);
              // window.location = "/MainAdmin/Event";
              localStorage.setItem("event", nameevent);
              setEvent_now(nameevent); 
              event_staff = nameevent;
              add_staff(id_s,email); 
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log(nameevent.length, detaile.length, starte.length, checka);
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  //Check box แสดงผลลลัพธ์การโหวต ================================================================
  const handleCheck = (event) => { 
    console.log("checka = " , checka)
    if(checka == 0){
      setChecka(1);
    }else {
      setChecka(0)
    };

  };

  // Gen password Staff-----------------------------------------------------------------------------

  const generatePassword = () => { 
    // Create a random password
      setPassword(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)); 
      console.log("password == " , password)
      password_staff = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); 
    // Set the generated password as state 
  }

  const add_staff = (key, Email) => {
    generatePassword();
    console.log("sdad === " ,Email);
    console.log("event name == "  , event_staff , "  key = ", key, "  Email = ", Email, "  password = ", password_staff);

    const Authen = "staff";
    if (event_staff.length > 0 && Email.length > 0 && password_staff.length > 0) {
      console.log("key = ", key, "Email = ", Email);
      console.log("password = ", password_staff, "event_now = ", event_now);
      Axios.post(`${window._env_.API_URL}/addstaff`, {
        key: key,
        Email: Email,
        password: password_staff,
        event_now: event_staff,
        Authen : Authen,
      })
        .then((res, err) => {
          console.log(res.data);
          if (res.data.massage == "datadup" || res.data.massage2 == "datadup" || res.data.massage3 == "datadup" || res.data.massage1 == "datadup") {
            alert("NameList");
          } else {
            setUserlist([
              ...userlist,
              {
                key: key,
                Email: Email,
                password: password_staff,
                event_now: event_staff,
                Authen : Authen,
              },
            ]);
            console.log("mail ==> ", Email);
            console.log("password ==> ", password_staff);
            console.log(res); 
            navi("AddRole");
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(event_now.length, Email.length);
      alert("Data Check");
    }
  };



  const prepare_staff = (id, name, surname , mail) => {
    setId_s(id);
    setName_s(name);
    setSurname_s(surname);
    setEmail(mail);
    email_staff = mail; 
    alert(email_staff)
    setLgShow(false);
  };
 
  return (
    <div className="EvenMain"> 
      <Navmas
            head = {"สร้างการเลือกตั้ง"}
            role = {login} 
          />  

      <div className="MainEvent" onOverflow={"scroll"}>
        <Card id="Cardevent">
          <Card.Header as="h3" 
            style={{
              color: "#ffffff",
              border: "3px solid #FF4B2B",
              backgroundColor: "#FF4B2B",
            }}
          >กรอกข้อมูลให้ครบถ้วน</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <h3>ชื่อการเลือกตั้ง</h3>
                <Form.Control
                  type="text"
                  placeholder="กรอกชื่อการเลือกตั้ง"
                  onChange={(e) => {
                    setNameevent(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <h3>รายละเอียดการเลือกตั้ง</h3>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="กรอกรายละเอียดการเลือกตั้ง"
                  onChange={(e) => {
                    setDetaile(e.target.value);
                  }}
                />
              </Form.Group>
              <h3>วันที่เริ่มต้น-สิ้นสุด</h3>
              <Row>
                <div>
                  <Form.Control
                    type="date"
                    placeholder="ระบุวันที่ต้องการจัดการเลือกตั้ง"
                    onChange={(e) => {
                      setStarte(e.target.value);
                    }}
                  />
                </div>
              </Row>
              <br></br>
              <Row>
                <Col>
                  <h6>เวลาเริ่มการเลือกตั้ง</h6>
                  <Form.Control
                    type="time"
                    placeholder="ระบุเวลาเริ่มการเลือกตั้ง"
                    onChange={(e) => {
                      setStarttime(e.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <h6>เวลาสิ้นสุดการเลือกตั้ง</h6>
                  <Form.Control
                    type="time"
                    placeholder="ระบุเวลาสิ้นสุดการเลือกตั้ง"
                    onChange={(e) => {
                      setEndtime(e.target.value);
                    }}
                  />
                </Col> 
              </Row> 
                <br></br>
              <h3>เพิ่มผู้ดูแลการเลือกตั้ง</h3> 
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Name Staff"
                    disabled={true}
                    value={name_s}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Surname Staff"
                    disabled={true}
                    value={surname_s}
                  />
                </Col>
              </Row>
              <br></br> 
              <Row> 
                <Col>
                  <Button
                    id="button_full_o"
                    onClick={() => setLgShow(true)}
                    style={{ margintop: 50 }}
                  >
                    เพิ่มผู้ดูแล
                  </Button>
                </Col>
              </Row>
              <br></br> 
              <Row>
                <Col><h3>เวลาเชื่อมต่อ</h3> </Col>
                <Col> 
                  <Form.Control
                    type="number"  
                    placeholder="ระบุหมดเวลาเชื่อมต่อ"
                    onChange={(e) => {
                      setTimeout(e.target.value); 
                    }}
                  />
                </Col>
                 
              </Row>
              <br></br>
              <Row>
                <Col sm={4}>
                  <Form.Group id="checka" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="แสดงผลโหวต"
                      defaultChecked="1"
                      onChange={handleCheck}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    id="button_full_o"
                    style={{ width: 500 }} onClick={prepare}>
                    {" "}
                    Submit{" "}
                  </Button>
                  {/* <Button onClick={prepare2}> Submit2 </Button> */}
                </Col>
              </Row>

              <br></br>
            </Form>
          </Card.Body>
        </Card>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            ราชื่อผู้ใช้งาน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Search
              placeholder="input search text"
              allowClear 
              size="large"
              style={{
                width: 304,
                marginLeft: "55%",
              }}
              onSearch={onSearch}
            />
            <Table dataSource={dataTable2}>
              <Column title="#" dataIndex="key" key="key" /> 
                <Column title="ชื่อ" dataIndex="Name" key="Name" />
                <Column title="นามสกุล" dataIndex="Surname" key="Surname" /> 
              <Column title="อีเมลล์" dataIndex="Email" key="Email" />
              <Column
                title="เพิ่มผู้ดูแล"
                key="add Participant"
                render={(_, record) => (
                  <Space size="small">
                    <Button
                      id="button_full_o"
                      onClick={() =>
                        prepare_staff(record.key, record.Name, record.Surname , record.Email)
                      }
                    >
                      เพิ่มผู้ดูแล
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Eventcreate;
