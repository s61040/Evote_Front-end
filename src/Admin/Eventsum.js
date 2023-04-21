import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./Css/Eventsum.css";
import Swal from 'sweetalert2';
import { Space, Table, Tag, Input } from "antd";
import {
  Card, 
  Button,
  Modal,
  Alert,
  Col,
  Row,
  Container,
} from "react-bootstrap"; 
import Navmas from "../Navmaster/Navmas"; 

var dataTable = [];
var dataTable2 = [];
var dataTable3 = [];
var Check_adapar = 0;

function Eventsum() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const [password, setPassword] = useState([]);
  const [authen_E, setAuthen_E] = useState([]);

  const tokenC = localStorage.getItem("token");
  const [userlist, setUserlist] = useState([]);
  const eventnow = localStorage.getItem("event");
  const [namestaff, setNamestaff] = useState([]);

  const [id_e, setId_e] = useState([]);


  const [totaluser, setTotaluser] = useState(0);
  const [event_now, setEvent_now] = useState([]);

  const [lgShow, setLgShow] = useState(false);
  const [lgsShow, setLgsShow] = useState(false);

  const [passwordmail, setPasswordmail] = useState([]);
  const [usermail, setUsermail] = useState([]);
  const [mail, setMail] = useState([]);

  const [date_m, setDate_m] = useState([]);

  
  const [event_name, setEvent_name] = useState([]); 
  const [event_detail, setEvent_detail] = useState([]);
  const [event_start, setEvent_start] = useState([]);
  const [event_end, setEvent_end] = useState([]);
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [query3, setQuery3] = useState("");

  const [event_staff_n, setEvent_staff_n] = useState([]);
  const [event_staff_sr, setEvent_staff_sr] = useState([]);

  const [detail_c, setDetail_c] = useState([]);
  const navi = useNavigate();

  const { Column, ColumnGroup } = Table;
  useEffect(() => {
    check_authen();
  }, []);

  // CHECK AUTHEN -------------------------------------------------------------------
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
            showname();
            showstaff();
            showall();
            showcandidate();
          } else {
            alert("ล็อคอินใหม่");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("ล็อคอินใหม่");
          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("ล็อคอินใหม่");
        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  // showname  -------------------------------------------------------------------
  const showall = (e) => {
    Axios.post(`${window._env_.API_URL}/showadrole2` , {
      eventnow: eventnow,
    })
    .then((res) => {
      setNamestaff(res.data.massage); 
      setEvent_now(eventnow); 
      console.log(res.data.massage);   
      console.log("data.User == " , res.data.massage);   
      console.log("test = " , namestaff);    
      dataTable2 = [];
      for(var i = 0; i < res.data.massage.length;i++){
        if(res.data.massage[i].Authem_admin == 'not'){
          Check_adapar = 1;
          // break;
        }
        if(res.data.massage[i].Event == 'dupplicate'){
          Check_adapar =  1;
        }
        dataTable2.push({
        key : res.data.massage[i].User_id,
        Name : res.data.massage[i].Name,
        Surname : res.data.massage[i].Surname,
        Email : res.data.massage[i].Email,
        Check : Check_adapar
       }) 
       Check_adapar = 0;
      } 
      });  
}


const showcandidate = (e) => {
  Axios.post(`${window._env_.API_URL}/showadd_candidate` , {
    eventnow: eventnow,
  })
  .then((res) => { 
    console.log(res.data.massage);   
    console.log("data.Candidate== " , res.data.massage);   
    console.log("test = " , namestaff);    
    dataTable3 = [];
    for(var i = 0; i < res.data.massage.length;i++){
      for(var j = 0 ;j <  res.data.massage2.length;j++){
        console.log(i , " == " , j)
        if(res.data.massage[i].User_id == res.data.massage2[j].User_id){
          Check_adapar = 1; 
          break;
        } else {
          Check_adapar = 0;
        }
      }
      if(res.data.massage[i].Authem_admin == 'not'){
        Check_adapar = 1;
      } 
      dataTable3.push({
      key : i+1,
      Name : res.data.massage[i].Name,
      Surname : res.data.massage[i].Surname,
      Email : res.data.massage[i].Email,
      Check : Check_adapar
     }) 
     Check_adapar = 0;
    } 
    });  
}

  const delete_par = (id_par) => {  
    Swal.fire({
      title: 'ยืนยันลบรายชื่อผู้ใช้งาน', 
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน', 
      confirmButtonColor: '#FF4B2B',
      cancelButtonColor: '#FF4B2B',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios.post(`${window._env_.API_URL}/delete_par`, {
          id_par : id_par,
          id_e: id_e,
        }).then((res) => {
           if(res.data.massage == "delete"){ 
             window.location = "/MainAdmin/Event/EventManagement/EventCreate/AddRole/Eventsum";
           }  
        });
        Swal.fire('Saved!', '', 'success') 
      } 
    })   
  }

  const delete_can = (id) => { 
    Swal.fire({
      title: 'ยืนยันลบข้อมูลผู้ลงสมัครเลือกตั้ง', 
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน', 
      confirmButtonColor: '#FF4B2B',
      cancelButtonColor: '#FF4B2B',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios.post(`${window._env_.API_URL}/delete_can`, {
          id  : id  ,
        }).then((res) => {
           if(res.data.massage == "delete"){ 
             window.location = "/MainAdmin/Event/EventManagement/EventCreate/AddRole/Eventsum";
           }  
        });
        Swal.fire('Saved!', '', 'success') 
      } 
    })  
  }

  const showstaff = () =>{
    Axios.post(`${window._env_.API_URL}/showstaff`, {
      eventnow: eventnow,
    }).then((res) => {
      setEvent_staff_n(res.data.massage[0].name);
      setEvent_staff_sr(res.data.massage[0].surname);
    })
  }

  const showname = (e) => {
    Axios.post(`${window._env_.API_URL}/showsum2`, {
      eventnow: eventnow,
    }).then((res) => {
      setNamestaff(res.data.massage);
      setEvent_now(eventnow);
      setMail(res.data.massage);
      console.log("Mail === " , mail);
      setId_e(res.data.event[0].Id_event)
      setDetail_c(res.data.candidate);
      setDate_m(res.data.event[0].Date_vote);
      setEvent_name(res.data.event[0].Event_name);
      setEvent_detail(res.data.event[0].Event_detail);
      setEvent_start(res.data.event[0].Time_start);
      setEvent_end(res.data.event[0].Time_end);
      console.log(res.data);
      console.log("data.User");
      console.log("test = ", detail_c);

      dataTable = [];
      for (var i = 0; i < res.data.massage.length; i++) {
        // console.log("res.data.massage[i].Authen = " ,res.data.massage[i].Authen);
        if(res.data.massage[i].Authen == 'staff'){
            i = i+1;
        }
        dataTable.push({
          // key: i + 1,
          key: res.data.massage[i].User_id,
          Name: res.data.massage[i].Name,
          Surname: res.data.massage[i].Surname,
          Email: res.data.massage[i].Email,
        });
      }
    });
  };

  const submitce = () => {
    // console.log("Mail === " , mail); 
    setUsermail(mail.map((e) => e.Email));
    setPasswordmail(mail.map((e) => e.Password));
    setAuthen_E(mail.map((e) => e.Authen));
    console.log("Authen == " , authen_E)
    console.log("setUsermail", usermail, "pass", passwordmail); 

    Axios.post(`${window._env_.API_URL}/checkno`, { 
      eventnow: eventnow,
    }).then((res,err) => {
      if(res.data.massage == 'More'){
        alert("เพิ่ม Candidate หรือ ผู้มีสิทธิเลือกตั้ง");
      } else if(res.data.massage == 'sure'){
        if (usermail.length > 0) {
          Axios.post(`${window._env_.API_URL}/sendmail`, {
            usermail: usermail,
            passwordmail: passwordmail,
            eventnow: eventnow,
            authen_E : authen_E,
            date_m :date_m,
            event_start :event_start,
            event_end : event_start,
          })
            .then((res, err) => {
              setUserlist([
                ...userlist,
                {
                  usermail: usermail,
                  passwordmail: passwordmail,
                  eventnow: eventnow,
                  authen_E : authen_E,
                  date_m :date_m,
                  event_start :event_start,
                  event_end : event_start,
                },
              ]);
              alert("สร้างการเลือกตั้งเสร็จสมบูรณ์");
              console.log("userinfo ==> ", usermail.length);
              console.log(res);
              window.location = "/MainAdmin";
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          alert("ทำการยืนยันอีกครั้ง");
        }
      }
    }) 
  };

  // GEN PASSWORD ----------------------------------------------------
  const generatePassword = () => {
    // Create a random password
    setPassword(
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    );
    console.log(password);

    // Set the generated password as state
  };
  const prepare_user = (key, Email) => {
    generatePassword();
    const Authen = "participant";
    if (event_now.length > 0 && Email.length > 0 && password.length > 0) {
      console.log("key = ", key, "Email = ", Email);
      console.log("password = ", password, "event_now = ", event_now);
      Axios.post(`${window._env_.API_URL}/addparticipant`, {
        key: key,
        Email: Email,
        password: password,
        event_now: event_now,
        Authen: Authen,
      })
        .then((res, err) => {
          if (res.data.massage == "datadup") {
            alert("ตรวจสอบข้อมูล");
          } else {
            setUserlist([
              ...userlist,
              {
                key: key,
                Email: Email,
                password: password,
                event_now: event_now,
                Authen: Authen,
              },
            ]);
            alert("เพิ่มผู้ใช้งาน");
            showall();
            setTotaluser(res.data.lengthdata); 
            console.log("mail ==> ", Email);
            console.log("password ==> ", password);
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(event_now.length, Email.length);
      alert("ตรวจสอบข้อมูล");
    }
  };

  const Addcandidate = (Name, Surname) => {
    localStorage.setItem("namecandidate", Name);
    localStorage.setItem("Surnamecandidate", Surname);
    navi("AddCandidate");
  };

  return (
    <div>
      <Navmas head={eventnow} role={login} />
      <div className="Mainadmin">
        <Card
          style={{
            border: "0.2px solid #FF4B2B",
          }}
        >
          <Card.Header
            style={{
              color: "#ffffff",
              border: "3px solid #FF4B2B",
              backgroundColor: "#FF4B2B",
            }}
          >
            การเลือกตั้ง {event_now}
          </Card.Header>
          <Card.Body>
            <div>
              <blockquote className="blockquote mb-0">
                <p> ข้อมูลของการเลือกตั้ง {event_now} </p>
                <footer className="blockquote-footer">
                  ผู้ดูแลการเลือกตั้ง ={" "}
                  <cite title="Source Title">
                    {event_staff_n} {event_staff_sr}{" "}
                  </cite>
                </footer>
              </blockquote>
              <Row>
                <Col>
                  <h4>ชื่อการเลือกตั้ง = {event_name}</h4>
                </Col>
                <Col>
                  <h4>เวลาเริ่ม = {event_start}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>รายละเอียดการเลือกตั้ง = {event_detail}</h4>
                </Col>
                <Col>
                  <h4>เวลาสิ้นสุด = {event_end}</h4>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
        <div className="Main_Admin">
          <Row>
            <Col>
              <Card
                style={{
                  border: "0.2px solid #FF4B2B",
                }}
              >
                <Card.Header
                  as="h5"
                  style={{
                    color: "#ffffff",
                    border: "3px solid #FF4B2B",
                    backgroundColor: "#FF4B2B",
                  }}
                >
                  รายชื่อผู้ลงสมัคร
                </Card.Header>
                <Card.Body>
                  <Container>
                    <div className="Event">
                      {detail_c.map((item) => (
                        <div className="Card1" style={{ paddingTop: "5%" }}>
                          <Card
                            style={{
                              border: "0.2px solid #FF4B2B",
                              width: "15rem",
                            }}
                          >
                            <Card.Header></Card.Header>
                            <Card.Body>
                              <label>
                                ชื่อ : {item.Name} นามสกุล : {item.Surname}
                              </label>
                              <Card.Img
                                variant="top"
                                // src={item.p_image_c}
                                src={`${window._env_.API_URL}/img/${item.Img}`}
                              />
                              {/* recource={{uri: article.img}} */}
                              <label>รายละเอียดการเลือกตั้ง </label>
                              <label>{item.Detail}</label>
                              <br></br>{" "}
                              <Button
                                id="button_full_o"
                                onClick={() => delete_can(item.Id_can)}
                              >
                                ลบรายชื่อ
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                      <Card
                        style={{
                          border: "0.2px solid #FF4B2B",
                          width: "15rem",
                          marginTop: "10px",
                        }}
                      >
                        <Card.Header>หมายเลข</Card.Header>
                        <Card.Body>
                          <label>ไม่ออกเสียง</label>
                          <Card.Img
                            variant="top"
                            // src={item.p_image_c}
                            src={require("../images/" + "no_vote.png")}
                          />
                          {/* recource={{uri: article.img}} */}
                          <br></br>{" "}
                        </Card.Body>
                      </Card>
                      <div className="Card3" style={{ paddingTop: "5%" }}>
                        <Card
                          style={{
                            border: "0.2px solid #FF4B2B",
                            width: "18rem",
                          }}
                        >
                          <Card.Header>เพิ่มผู้สมัคร</Card.Header>
                          <Card.Body>
                            <Button
                              id="button_full_o"
                              variant="primary"
                              onClick={() => setLgsShow(true)}
                              type="submit"
                            >
                              แสดงรายชื่อผู้มีสิทธิลงสมัคร
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </Container>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card
                style={{
                  border: "0.2px solid #FF4B2B",
                }}
              >
                <Card.Header
                  as="h5"
                  style={{
                    color: "#ffffff",
                    border: "3px solid #FF4B2B",
                    backgroundColor: "#FF4B2B",
                  }}
                >
                  รายชื่อผู้ใช้งาน
                </Card.Header>
                <Card.Body>
                  <Container>
                    <Input
                      placeholder="ค้นหารายชื่อ"
                      allowClear
                      size="large"
                      onChange={(e) => setQuery(e.target.value)}
                      style={{
                        width: 304,
                        marginLeft: "55%",
                      }}
                    />
                    <Table
                      style={{
                        marginTop: 20,
                      }}
                      dataSource={dataTable.filter((item) =>
                        item.Name.includes(query)
                      )}
                    >
                      <Column title="#" dataIndex="key" key="key" />
                      <Column title="ชื่อ" dataIndex="Name" key="Name" />
                      <Column
                        title="นามสกุล"
                        dataIndex="Surname"
                        key="Surname"
                      />
                      <Column title="อีเมลล์" dataIndex="Email" key="Email" />
                      <Column
                        title="ลบ"
                        key="Delete"
                        render={(_, record) => (
                          <Space size="small">
                            <Button
                              id="button_full_o"
                              onClick={() => delete_par(record.key)}
                            >
                              ลบรายชื่อ
                            </Button>
                          </Space>
                        )}
                      />
                    </Table>
                    <Button
                      id="button_full_o"
                      onClick={() => setLgShow(true)}
                      style={{ margintop: 50 }}
                    >
                      เพิ่มผู้มีสิทธิเลือกตั้ง
                    </Button>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
            <Button
              id="button_full_o"
              onClick={() => submitce()}
              style={{ margintop: 50 }}
            >
              ยืนยันการเลือกตั้ง
            </Button>
          </Row>
        </div>
      </div>
      <Modal
        size="lg"
        show={lgsShow}
        onHide={() => setLgsShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            รายชื่อผู้สมัคร
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Search
              placeholder="input search text"
              allowClear
              onChange={(e) => setQuery3(e.target.value)}
              size="large"
              style={{
                width: 304,
                marginLeft: "55%",
              }}
            />
            <Table dataSource={dataTable3.filter((item) =>
                item.Name.includes(query3)
              )}
            >
              <Column title="#" dataIndex="key" key="key" />
              <Column title="ชื่อ" dataIndex="Name" key="Name" />
              <Column title="นามสกุล" dataIndex="Surname" key="Surname" />
              <Column title="อีเมลล์" dataIndex="Email" key="Email" />
              <Column
                title="เพิ่มผู้สมัคร"
                key="Check"
                render={(_, record) => (
                  <Space size="small">
                    <Button
                      id="button_full_o"
                      disabled={record.Check}
                      onClick={() => Addcandidate(record.Name, record.Surname)}
                    >
                      เพิ่มผู้ลงสมัคร
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Container>
        </Modal.Body>
      </Modal>

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
              onChange={(e) => setQuery2(e.target.value)}
              size="large"
              style={{
                width: 304,
                marginLeft: "55%",
              }}
            />
            <Table
              dataSource={dataTable2.filter((item) =>
                item.Name.includes(query2)
              )}
            >
              <Column title="#" dataIndex="key" key="key" />
              <Column title="ชื่อ" dataIndex="Name" key="Name" />
              <Column title="นามสกุล" dataIndex="Surname" key="Surname" />
              <Column title="อีเมลล์" dataIndex="Email" key="Email" />
              <Column
                title="เพิ่มผู้มีสิทธิ"
                key="Check"
                render={(_, record) => (
                  <Space size="small">
                    <Button
                      id="button_full_o"
                      disabled={record.Check}
                      onClick={() => prepare_user(record.key, record.Email)}
                    >
                      เพิ่มผู้มีสิทธิเลือกตั้ง
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

export default Eventsum;
