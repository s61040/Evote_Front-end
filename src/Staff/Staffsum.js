import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from 'sweetalert2';
import "./Css/Eventsum.css";
import { Space, Table, Tag, Input } from "antd";
import {
  Card, 
  Button,
  Modal,
  Alert,
  Form,
  Col,
  Row,
  Container,
} from "react-bootstrap"; 
import Navmas from "../Navmaster/Navmas"; 
import { DeleteCan } from './../Admin/DeleteCan';
import Navmas_staff from "../Navmaster/Navmas_staff";

var Check_adapar = 0;
var Check_adapar2 = 0;
var dataTable = [];
var dataTable2 = [];
var dataTable3 = []; 
var dataTable4 = []; 
var c_pass = [];
var updatedList = [];
var c_pass2 = 0;

function Staffsum() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const [password, setPassword] = useState([]);
  const [authen_E, setAuthen_E] = useState([]);
  const [checked, setChecked] = useState([]);

  const [date_m, setDate_m] = useState([]);
  const [s_par, setS_par] = useState("");
  const [s_can, setS_can] = useState("");


  const tokenC = localStorage.getItem("token");
  const [userlist, setUserlist] = useState([]);
  const eventnow = localStorage.getItem("event");
  const [namestaff, setNamestaff] = useState([]);
  const [totaluser, setTotaluser] = useState(0);
  const [event_now, setEvent_now] = useState([]);
  const [c_password , setC_password] = useState([])


  const id_e = localStorage.getItem("ID_E");
  // const [id_e, setId_e] = useState([]);

  const [lgShow, setLgShow] = useState(false);
  const [lgsShow, setLgsShow] = useState(false);

  const [passwordmail, setPasswordmail] = useState([]);
  const [usermail, setUsermail] = useState([]);
  const [mail, setMail] = useState([]);

  const [date_e, setDate_e] = useState([]);
  const [event_staff_n, setEvent_staff_n] = useState([]);
  const [event_staff_sr, setEvent_staff_sr] = useState([]);
  const [editdetail, setEditdetail] = useState(true);


  const [event_name, setEvent_name] = useState([]);
  const [event_detail, setEvent_detail] = useState([]);
  const [event_start, setEvent_start] = useState([]);
  const [event_end, setEvent_end] = useState([]);
  const [query, setQuery] = useState("");

  const [detail_c, setDetail_c] = useState([]);
  const navi = useNavigate();

  const { Column, ColumnGroup } = Table;
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;


  useEffect(() => {
    check_authen();
    generatePassword();
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
            setLogin(authen);
            console.log("res.data", res.data.message);
            showname();
            showstaff();
            showall();
            showcandidate();
          } else {
            alert("กรุณาล็อคอินใหม่อีกครั้ง");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) { 
            alert("กรุณาล็อคอินใหม่อีกครั้ง");
            localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("กรุณาล็อคอินใหม่อีกครั้ง");

        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  const handleCheck = (event) => {
    generatePassword();  
    if (event.target.checked ||  event.target.password) {
      updatedList = [...checked, event.target.value];
      c_pass = [...c_password, password];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
      c_pass.splice(c_password.indexOf(password), 1);
    }
 
    c_pass2++;

    if(lgShow == false){ 
      setChecked("") 
      setC_password("") 
      c_pass2 = 0 
    }
    setC_password(c_pass);
    setChecked(updatedList);
    console.log(updatedList , " = " , checked.length)
    console.log(c_password , " datatable ", password)

    showall();

    // dataTable4 = []; 
    // for(var i ; i < checked.length ;i++){
    //     dataTable4.push({
    //     // key: i + 1,
    //     Name : checked[i], 
    //   }); 
    // }
    
    // for (var i = 0; i < checked.length; i++) {
    //   // console.log("res.data.massage[i].Authen = " ,res.data.massage[i].Authen); 
       
    // }

  };

   // showname  -------------------------------------------------------------------
   const showall = (e) => {
    Axios.post(`${window._env_.API_URL}/showadrole2`, {
      eventnow: eventnow,
    }).then((res) => {
      setNamestaff(res.data.massage);
      setEvent_now(eventnow);   
      dataTable2 = [];
      for (var i = 0; i < res.data.massage.length; i++) { 
        for(var j = 0 ; j<= i ;j++){
          // console.log("Email001  == ", updatedList[j] , " = " , res.data.massage[i].Email);
          if(updatedList[j] == res.data.massage[i].Email){
            console.log("Email001  == ", updatedList[j] , " = " , res.data.massage[i].Email);
            Check_adapar2 = 1 ;
            console.log(" OK  -----------------------------------------------")
          }
        }
        if (res.data.massage[i].Event == "dupplicate") {
          Check_adapar = 1; 
          continue;
        }
        dataTable2.push({
          key: res.data.massage[i].User_id,
          Name: res.data.massage[i].Name,
          Surname: res.data.massage[i].Surname,
          Email: res.data.massage[i].Email,
          Check: Check_adapar2,
        }); 
        Check_adapar2 = 0 ;
      }
    });
  };

  const showstaff = () => {
    Axios.post(`${window._env_.API_URL}/showstaff`, {
      eventnow: eventnow,
    }).then((res) => {
      setEvent_staff_n(res.data.massage[0].name);
      setEvent_staff_sr(res.data.massage[0].surname);
    });
  };


  const showname = (e) => {
    Axios.post(`${window._env_.API_URL}/showsum2`, {
      eventnow: eventnow,
    }).then((res) => {
      setNamestaff(res.data.massage);
      setEvent_now(eventnow);
      setMail(res.data.massage);
      setDate_m(res.data.event[0].Date_vote);
      console.log("Mail === " , mail);
      // setId_e(res.data.event[0].Id_event)
      setDetail_c(res.data.candidate);
      setEvent_name(res.data.event[0].Event_name);
      setEvent_detail(res.data.event[0].Event_detail);
      setDate_e(res.data.event[0].Date_vote);
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
          id_par: id_par,
          id_e: id_e,
        }).then((res) => {
          if (res.data.massage == "delete") { 
            window.location = "/MainStaff/Eventmanage/EditEvent";
          }
        });
        Swal.fire('Saved!', '', 'success') 
      } 
    })   
  }; 


  const showcandidate = (e) => {
  Axios.post(`${window._env_.API_URL}/showadd_candidate`, {
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

  const submitce = (Email,password,Authen) => {   
    console.log(Email , password , Authen)
    if (Email.length > 0 && password.length > 0 && Authen.length > 0) {
      Axios.post(`${window._env_.API_URL}/sendmail_Edit`, {
        Email: Email,
        password: password,
        Authen:Authen,
        eventnow: eventnow,
        date_m :date_m,
        event_start :event_start,
        event_end : event_start,
      })
        .then((res, err) => {  
          // alert(Email);
          // console.log("userinfo ==> ", usermail.length);
          // console.log(res);
          // window.location = "/MainAdmin";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Check");
    }
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
  
  const prepare_user = () => {
    generatePassword();
    var count = 0;
    const Authen = "participant";
    if (id_e.length > 0 && password.length > 0) { 
      // console.log("password = ", password, "event_now = ", id_e);
      Axios.get(`${window._env_.API_URL}/idpar`,)
          .then((res,err) => {
            count = res.data.massage;
            count = count+1;
            console.log("count = " , count);
            for(var i = 0 ; i < updatedList.length ;i++){
              // alert(updatedList[i]);
              Axios.post(`${window._env_.API_URL}/addparticipant_Edit`, { 
                count:count+i,
                Email: updatedList[i],
                password: password,
                id_e: id_e,
                Authen: Authen,
              })
                .then((res, err) => {
                  if (res.data.massage == "datadup") {
                    alert("เช็คข้อมูล");
                  } else {
                    if(1){ 
                      for(var i = 0 ; i < updatedList.length ;i++){
                        submitce(updatedList[i],password,Authen);
                      } 
                    } 
                    showall();  
                    console.log(res);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            } 
            alert("เพิ่มผู้มีสิทธิ");
            window.location="/MainStaff/Eventmanage/EditEvent";
          }) 
    } else {
      // console.log(event_now.length, Email.length);
      alert("เช็คข้อมูลและเพิ่มอีกครั้ง");
    }
  };


  const edit_event = () => {
    const dateS = new Date(date_e);

    if (current >= dateS) {
      alert("ไม่สามารถเลือกวันนี่ผ่านมาแล้วได้");
    } else {
      Axios.post(`${window._env_.API_URL}/edit_evemt` ,{
        id_e: id_e,
        event_name :event_name , 
        event_start :event_start,
        date_e :date_e,
        event_detail :event_detail ,
        event_end : event_end,
      }).then((res) => {
        console.log(event_name, " == " , eventnow);
        setEditdetail(true);
        if(res.data.massage == "ok"){
          alert("Complete")
        } 
      })
    }
  }

  // const delete_can = (id) => {
  //   Axios.post("http://localhost:3001/delete_can", {
  //     id: id,
  //   }).then((res) => {
  //     if (res.data.massage == "delete") {
  //       alert("Delete");
  //       window.location = "/MainStaff/Eventmanage/EditEvent";
  //     }
  //   });
  // };


  const Addcandidate = (Name, Surname) => {
    localStorage.setItem("namecandidate", Name);
    localStorage.setItem("Surnamecandidate", Surname);
    window.location ="/MainStaff/Eventmanage/EditEvent/Addcandidatestaff" 
  };

  return (
    <div>
      <Navmas_staff head={eventnow} role={login} />
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
          >{event_now}</Card.Header>
          <Card.Body>
            <div>
              <blockquote className="blockquote mb-0">
                <p>
                  {" "}
                  สำหรับ Admin เพื่อการตั้งค่าผู้ที่มีส่วนเกี่ยวข้องกับการโหว{" "}
                  {event_now}{" "}
                </p>
                <footer className="blockquote-footer">
                  Staff ผู้ดูแล{" "}
                  <cite title="Source Title">
                    {event_staff_n} {event_staff_sr}{" "}
                  </cite>
                </footer>
              </blockquote>

              <Row> 
                <Col style={{ paddingTop: 10 }}>
                  <h4>
                    ชื่อการเลือกตั้ง
                    <Form.Control
                      style={{
                        maxWidth: 300,
                        float: "right",
                        marginRight: 100,
                      }}
                      type="email"
                      value={event_name}
                      onChange={(e) => setEvent_name(e.target.value)}
                      disabled={editdetail}
                      placeholder="Candidate"
                    />
                  </h4>
                </Col>
                <Col style={{ paddingTop: 10 }}>
                <h4>
                    เวลาเริ่ม
                    <Form.Control
                      style={{
                        maxWidth: 300,
                        float: "right",
                        
                        marginRight: 100,
                      }}
                      type="Time"
                      value={event_start}
                      onChange={(e) => setEvent_start(e.target.value)}
                      disabled={editdetail}
                      placeholder="Candidate"
                    />
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingTop: 10 }}>
                <h4>
                    รายละเอียดการเลือกตั้ง
                    <Form.Control
                      style={{
                        maxWidth: 300,
                        float: "right",
                        marginRight: 100,
                      }}
                      type="text"
                      value={event_detail}
                      onChange={(e) => setEvent_detail(e.target.value)}
                      disabled={editdetail}
                      placeholder="Candidate"
                    />
                  </h4> 
                </Col>
                <Col style={{ paddingTop: 10 }}>
                  <h4>
                    เวลาจบ
                    <Form.Control
                      style={{
                        maxWidth: 300,
                        float: "right",
                        marginRight: 100,
                      }}
                      type="Time"
                      value={event_end}
                      onChange={(e) => setEvent_end(e.target.value)}
                      disabled={editdetail}
                      placeholder="Candidate"
                    />
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col></Col>
              <Col style={{ paddingTop: 10 }}>
              <h4>
                    วันที่
                    <Form.Control
                      style={{
                        maxWidth: 300,
                        float: "right",
                        marginRight: 100,
                      }}
                      type="Date"
                      value={date_e}
                      onChange={(e) => setDate_e(e.target.value)}
                      disabled={editdetail}
                      placeholder="Candidate"
                    />
                  </h4>
              </Col> 
              </Row>
              <Row style={{ paddingTop: 10 }}>
                <Col>
                  <Button
                    id="button_full_o"
                    style={{ paddingTop: 10, width: 300 }}
                    onClick={() => setEditdetail(false)}
                  >
                    {" "}
                    แก้ไข
                  </Button>
                </Col>
                <Col>
                  <Button
                    id="button_full_o"
                    disabled={editdetail}
                    style={{ paddingTop: 10, width: 300 }}
                    onClick={() => edit_event()}
                  >
                    {" "}
                    ยืนยันการแก้ไข
                  </Button>
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
                  style={{
                    color: "#ffffff",
                    border: "3px solid #FF4B2B",
                    backgroundColor: "#FF4B2B",
                  }} 
                  as="h5">รายชื่อผู้สมัคร</Card.Header>
                <Card.Body>
                  <Container>
                    <div className="Event">
                      {detail_c.map((item) => (
                        <div className="Card1" style={{ paddingTop: "5%" }}>
                          <Card style={{border: "0.2px solid #FF4B2B", width: "15rem" }}>
                            <Card.Header
                              style={{
                                color: "#ffffff",
                                border: "3px solid #FF4B2B",
                                backgroundColor: "#FF4B2B",
                              }} 
                            >รายละเอียด</Card.Header>
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
                              <label>รายละเอียด </label>
                              <br></br>
                              <label>{item.Detail}</label>
                              <br></br>{" "}
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                      <Card  style={{border: "0.2px solid #FF4B2B", marginTop: 10 , width: "15rem" }}>
                            <Card.Header
                              style={{
                                color: "#ffffff",
                                border: "3px solid #FF4B2B",
                                backgroundColor: "#FF4B2B",
                              }} 
                            >รายละเอียด</Card.Header>
                            <Card.Body>
                              <label>
                                งดออกเสียง
                              </label>
                              <Card.Img
                                variant="top"
                                // src={item.p_image_c}
                                src={require("../images/" + 'no_vote.png')}
                              />
                              {/* recource={{uri: article.img}} */} 
                              <br></br>{" "} 
                            </Card.Body> 
                          </Card>
                      <div className="Card3" style={{ paddingTop: "5%" }}>
                        <Card  style={{border: "0.2px solid #FF4B2B", width: "18rem" }}>
                          <Card.Header
                            style={{
                              color: "#ffffff",
                              border: "3px solid #FF4B2B",
                              backgroundColor: "#FF4B2B",
                            }} 
                          >เพิ่มผู้สมัคร</Card.Header>
                          <Card.Body>
                            <Button
                              id="button_full_o"
                              variant="primary"
                              onClick={() => setLgsShow(true)}
                              type="submit"
                            >
                              แสดงรายชื่อ
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
                >รายชื่อผู้มีสิทธิ</Card.Header>
                <Card.Body>
                  <Container>
                   <Input
                      placeholder="input search text"
                      allowClear 
                      size="large"
                      onChange={(e) => setQuery(e.target.value)}
                      style={{
                        width: 304,
                        marginLeft: "55%",
                      }}
                    /> 
                    <Table style={{ 
                        marginTop: 20,
                      }}   
                      dataSource={dataTable.filter((item) => 
                      item.Name.includes(query)
                      )}>
                      <Column title="#" dataIndex="key" key="key" /> 
                        <Column
                          title="ชื่อ"
                          dataIndex="Name"
                          key="Name"
                        />
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
                              onClick={() =>  delete_par(record.key)}
                            >
                              ลบ
                            </Button>
                          </Space>
                        )}
                      />
                    </Table>
                    <Button 
                      id="button_full_o"
                      onClick={() => {setLgShow(true) ;setC_password(""); setChecked("")}} 
                      style={{ margintop: 50 }} 
                    >
                      เพิ่มผู้มีสิทธิ
                    </Button> 
                  </Container>
                </Card.Body>
              </Card>
            </Col>
            <Button
              id="button_full_o"
              // onClick={() => submitce()}
              href = "/MainStaff/Eventmanage"
              style={{ margintop: 50 }}
              // disabled ={true}
            >
              ยืนยันการแก้ไข
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
            onChange={(e) => setS_can(e.target.value)}
            size="large"
            style={{
              width: 304,
              marginLeft: "55%",
            }} 
          />
          <Table dataSource={dataTable3.filter((item) => 
                      item.Name.includes(s_can)
                      )}>
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
                    disabled = {record.Check}
                    onClick={() => Addcandidate(record.Name,record.Surname)}
                  >
                    เพิมผู้สมัคร
                    
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
        onHide={() => {setC_password("");setLgShow(false);setChecked("");}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            เพิ่มผู้มีสิทธิเลือกตั้ง
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Search
              placeholder="input search text"
              allowClear 
              onChange={(e) => setS_par(e.target.value)}
              size="large"
              style={{
                width: 304,
                marginLeft: "55%",
              }}
              onSearch={onSearch}
            />
            <Table dataSource={dataTable2.filter((item) => 
                      item.Name.includes(s_par)
                      )}>
              <Column title="#" dataIndex="key" key="key" /> 
                <Column title="ชื่อ" dataIndex="Name" key="Name" />
                <Column title="นามสกุล" dataIndex="Surname" key="Surname" /> 
              <Column title="อีเมลล์" dataIndex="Email" key="Email" />
              <Column
                title="เพิ่มผู้มีสิทธ์"
                key="Check"
                render={(_, record) => (
                  <Space size="small">
                     <Space size="small">
                     <input id = {record.Email} value={record.Email} checked = {record.Check}  type="checkbox" onChange={handleCheck}/>
                      {/* <span >{record.Email}</span> */}
                  </Space>
                  </Space>
                )}
              />
            </Table>  
            <Button 
              id="button_full_o"
              onClick={() => prepare_user()}
            >
              เพิ่มผู้มีสิทธิ
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Staffsum;
