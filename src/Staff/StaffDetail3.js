import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import "./Css/Eventsum.css";
import { Space, Table, Tag, Input } from "antd";
import {
  Card,
  Button,
  Modal,
  Alert,
  Col,
  Row,
  Container,
  ModalBody,
} from "react-bootstrap";
import Navmas from "../Navmaster/Navmas";   
import Navmas_staff from './../Navmaster/Navmas_staff';
         
var dataTable = [];   
var Check_W = "aaa"; 
var data2 = [];      
var data3 = [];     
var nameE = "";      
var nameF = "";      
var sub = 0;
var check_C = 0;
var test  =0;
var img_win = "no_vote";

function EventDetail3() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  const Id_event = localStorage.getItem("id_event");
  const par_taotal = localStorage.getItem("no.par");
  const Img_sd = localStorage.getItem("Img");
  const V = localStorage.getItem("Vo");
  const C = localStorage.getItem("check");
 
   

  const [namestaff, setNamestaff] = useState([]);
 
  const [show2, setShow2] = useState(0);
  const [show, setShow] = useState(0);
  const [show3, setShow3] = useState(0);
  const [show4, setShow4] = useState(0);

  const [event_name, setEvent_name] = useState([]);
  const [event_detail, setEvent_detail] = useState([]);
  const [event_start, setEvent_start] = useState([]);
  const [event_end, setEvent_end] = useState([]);

  const [total_par, setTotal_par] = useState([]);
  const [total_point, setTota_poin] = useState([]);
  const [nologin, setNologin] = useState([]);
  const [nopoint, setNopoint] = useState([]);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [thewin_name, setThewin_name] = useState([]);
  const [thewin_lname, setThewin_lname] = useState([]);
  const [thewin_detail, setThewin_detail] = useState([]);
  const [thewin_point, setThewin_point] = useState([]);
  const [thewin_img, setThewin_img] = useState([]);
  const { fileData, setFileData } = useState(); 

  
  var check_H = [];
  var setpath = "";
  var Check_Sub = 0;
  var data_wrong2 = [];
  const [data_wrong, setData_wrong] = useState([]);

  const [query, setQuery] = useState("");

  const [detail_c, setDetail_c] = useState([]);
  const navi = useNavigate();

  const { Column, ColumnGroup } = Table;

  useEffect(() => {
    check_authen(); 
    // setInterval(() => {
    //   hind_Vote();
    // },5000)
  }, []);

  // CHECK AUTHEN -------------------------------------------------------------------
  const check_authen = () => {
    Axios.post(`${window._env_.API_URL}/authen`, {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "admin" || res.data.message == "staff") {
            eventshow();
            votestat();
            Resultvote(); 
            console.log("res = ", res);
            setLogin(authen);
            console.log("res.data", res.data.message);
            if (C == 0) { 
              check_C = 0;
              Check_W = "รอยืนยัน";
              alert("รอยืนยัน"); 
            } 
            else if(C == 2){
              check_C = 2;
              Check_W = "การเลือกตั้งเสร็จสมบูรณ์"; 
              alert("การเลือกตั้งเสร็จสมบูรณ์"); 
              sub = 1;
            }  else { 
              check_C = 3;
              Check_W = "มีความผิดปกติ"; 
              alert("ผิดปกติ");
            }
          } else {
            alert("กรุณาล็อคอินใหม่A");

            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("กรุณาล็อคอินใหม่T");

          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("กรุณาล็อคอินใหม่C");

        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };

  // Event Detail ---------------------------------------------------------------
  const eventshow = (e) => {
    Axios.post(`${window._env_.API_URL}/showrevent`, {
      Id_event: Id_event,
    }).then((res) => {
      console.log("event == ", event_start);
      setEvent_name(res.data.massage.Event_name);
      setEvent_detail(res.data.massage.Event_detail);
      setEvent_start(res.data.massage.Time_start);
      setEvent_end(res.data.massage.Time_end);
      if (res.data.massage.status_event != 1) {
        // setSub(1);
        // setSub2(1);
        // setSub3(0);
      }
    });
  };

  // Show Stat Vote ----------------------------------------------------------------------

  const votestat = (e) => {
    Axios.post(`${window._env_.API_URL}/votestat`, {
      Id_event: Id_event,
    }).then((res) => { 

      setTotal_par(par_taotal);
      setTota_poin(res.data.massage3[0].Vote);
      setNologin(res.data.massage[0].par);
      setNopoint(res.data.massage2[0].novote);
    });
  };

  // show Result vote  -------------------------------------------------------------------

  const Resultvote = (e) => {
    Axios.post(`${window._env_.API_URL}/showresult`, {
      Id_event: Id_event,
      V: V,
    }).then((res) => {
      data3 = res.data.massage;
      // console.log("event Check result == " , res.data.massage[0]);
      setThewin_name(res.data.massage[0].Name);
      setThewin_lname(res.data.massage[0].Surname);
      setThewin_detail(res.data.massage[0].Detail);
      setThewin_point(res.data.massage[0].COUNT);
      setThewin_img(res.data.massage2);
      img_win = res.data.massage[0].Img;
      // img_win = "'"+'../images/d1.jpg'+res.data.massage[0].Img+"'";

      console.log("image_set = " + thewin_img);
      console.log("image = " + img_win);
      dataTable = [];
      for (var i = 0; i <= res.data.massage.length; i++) {
        dataTable.push({
          No: i + 2,
          Name: res.data.massage[i + 1].Name,
          Surname: res.data.massage[i + 1].Surname,
          Vote: res.data.massage[i + 1].COUNT,
        });
      }
      // hind_Vote();
    });
  };

  const hind_Vote = () => {
    Axios.post(`${window._env_.API_URL}/hind_Vote`, {
      Id_event: Id_event,
    }).then((res) => {});
  };

  // CSV FILE ---------------------------------------------------------------
  const handleDataFetch = () => {
    Axios.post(`${window._env_.API_URL}/Csv_data_check`, {
      Id_event: Id_event,
    }).then((res, err) => {
      data2 = res.data.massage;
      nameE = event_name;
      nameE.toString();
      console.log("sss = ", data2);
      console.log("name= ", nameE);
      setFileData(res.data.massage);
    });
  };

  const headers = [
    { label: "Par_id", key: "Par_id" },
    { label: "User_id", key: "User_id" },
    { label: "Id_event", key: "Id_event" },
    { label: "Email", key: "Email" },
    { label: "Password", key: "Password" },
    { label: "Token", key: "Token" },
    { label: "Authen", key: "Authen" },
    { label: "Vote", key: "Vote" },
    { label: "hash_vote", key: "hash_vote" },
    { label: "P_hash", key: "P_hash" },
    { label: "c_hash", key: "c_hash" },
    { label: "ElecStatus", key: "ElecStatus" },
    { label: "Date_vote", key: "Date_vote" },
    { label: "Time_vote", key: "Time_vote" },
  ];

  const csvReport = {
    data: data2,
    headers: headers,
    filename: nameE+"ข้อมูลผิดปกติ",
  };

  // CSV FILE ---------------------------------------------------------------

  const generatePassword = () => { 
    // Create a random password
    nameF = Math.random().toString(36).slice(2).split(" "); 
      console.log(nameF)
   
    // Set the generated password as state 
  }

  const handleDataFetch2 = () => {
    generatePassword();
    console.log(data3); 
  };

  const headers2 = [
    { label: "ชื่อ", key: "Name" },
    { label: "นามสกุล", key: "Surname" },
    { label: "คะแนน", key: "COUNT" },
    { label: "รายละเอียด", key: "Detail" },
  ];

  const csvReport2 = {
    data: data3,
    headers: headers2,
    filename: nameF,
    target: "../ux-project/src/CSV",
  };

  // Update Status Vote ----------------------------------------------------

  const Status = () => {
    console.log(Id_event);
    if (C == 0) {
      const formdata = new FormData();
      formdata.append("file", userInfo.file);
      var namefile = '';
      Axios.post(`${window._env_.API_URL}/file`, formdata)
      .then((res, err) => {
        if (res.data.massage == "FailCandidate") {
          alert("File Upload");
        } else {
          namefile = res.data.massage;
          Axios.post(`${window._env_.API_URL}/update_event`, {
            Id_event: Id_event,
            // data3 :data3,
          }).then((res) => {
            // console.log(res.data.massage);
            if (res.data.massage == true) {
              Axios.post(`${window._env_.API_URL}/user_count`, {
                Id_event: Id_event,
              }).then((res) => {
                var Email = res.data.massage;
                console.log("res.data.massage == ", res.data.massage);
                for (var i = 0; i < res.data.massage.length; i++) {
                  Axios.post(`${window._env_.API_URL}/sendmail_End`, {
                    event_name: event_name,
                    Email: Email[i].Email,
                    data3: data3,
                    file: namefile,
                  }).then((res) => {
                    console.log(res.data);
                    if (res.data.massage == "Sand_mail") {
                      // alert("การยืนยันอีเว้นสำเร็จ");
                    } else {
                      // alert("การยืนยันไม่สำเร็จ");
                    }
                  });
                }
                alert("การยืนยันอีเว้นสำเร็จ"); 
                window.location("/MainAdmin/Event/Eventstat");
              }); 
            } else {
              console.log("asd");
            }
          });
        }
      });
      // console.log(userInfo)
    } else {
      Axios.post(`${window._env_.API_URL}/user_count`, {
        Id_event: Id_event,
      }).then((res) => {
        var Email = res.data.massage;
        console.log("res.data.massage == ", res.data.massage);
        for (var i = 0; i < res.data.massage.length; i++) {
          Axios.post(`${window._env_.API_URL}/sendmail_End2`, {
            event_name: event_name,
            Email: Email[i].Email, 
          }).then((res) => {
            console.log(res.data); 
          });
        }
        alert("แจ้งเตือผู้มีสิทธ์เลือกตั้งสำเร็จ");
      }); 
    }
  };

  const ShowState = () => {
    console.log("check_C = ", check_C);

    if(check_C == 3){
      setShow4(1);
    }
    else{ 
      setShow3(1);
    } 
  }
 

  const handleInputChange3 = (event) => {
    setpath = URL.createObjectURL(event.target.files[0]);
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

 const set_Show = () => {
  if(test == 0 ){
      alert("เช็คข้อมูลและยืนยันอีกครั้ง")
      test = 1;
  } else{
    setShow(1);
  }
 }
  
  return ( 
    <div>
      <Navmas_staff head={event_name} role={login} />
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
            <Row>
              <Col>การเลือกตั้ง = {event_name}</Col>
              <Col>
                เวลาเริ่ม = {event_start} - เวลาจบ = {event_end}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div>
              <blockquote className="blockquote mb-0">
                <p>
                  {" "}
                  การเลือกตั้ง {Check_W}{" "}
                </p>
                <footer className="blockquote-footer">
                  Power!!! <cite title="Source Title">title</cite>
                </footer>
              </blockquote>
            </div>
          </Card.Body>
        </Card>



        <Modal show={show4} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>การเลือกตั้งมีความผิดปกติ</Modal.Title>
          </Modal.Header> 
          <Modal.Footer>
            <Row>
              <Col>
                <button id="button_h_o" onClick={() => Status()}>
                  ยืนยัน
                </button>
              </Col>
              <Col>
                <Button id="button_h_o" onClick={() => setShow4(0)}>
                  กลับ
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

        <Modal show={show3} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันการเลือกตั้ง</Modal.Title>
          </Modal.Header>
          <ModalBody>
            <input type="file" onChange={handleInputChange3} />
            <div>
              {userInfo.filepreview !== null ? (
                <div>
                  <img
                    className="previewimg"
                    src={userInfo.filepreview}
                    alt="UploadImage"
                  />
                  <p>{userInfo.filepreview}</p>
                </div>
              ) : null}
            </div>
          </ModalBody>
          <Modal.Footer>
            <Row>
              <Col>
                <button id="button_h_o" onClick={() => Status()}>
                  ยืนยัน
                </button>
              </Col>
              <Col>
                <Button id="button_h_o" onClick={() => setShow3(0)}>
                  กลับ
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>ดาวน์โหลดข้อมูลผู้ชนะการเลือกตั้ง</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Row>
              <Col>
                <button id="button_h_o">
                  <CSVLink {...csvReport2}>ดาวน์โหลด</CSVLink>
                </button>
              </Col>
              <Col>
                <Button id="button_h_o" onClick={() => setShow2(0)}>
                  กลับ
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

        <Modal show={show} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>ดาวน์โหลดข้อมูลผิดปกติของการเลือกตั้ง</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Row>
              <Col>
                <button id="button_h_o">
                  <CSVLink {...csvReport}>ดาวน์โหลด</CSVLink>
                </button>
              </Col>
              <Col>
                <Button id="button_h_o" onClick={() => setShow(0)}>
                  กลับ
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Modal>

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
                  ผู้ชนะการเลือกตั้ง
                </Card.Header>
                <Card.Body>
                  <Container>
                    {/* {thewin_img.map((item) => ( */}
                    <Card.Img
                      variant="top" 
                      src={`${window._env_.API_URL}/img/${img_win}`} 
                      // src={require(img_win)}
                    />
                    {/* // ))}  */}
                    <Card.Title>
                      ชื่อ : {thewin_name} นามสกุล : {thewin_lname}
                    </Card.Title>
                    <Card.Text>รายละเอียด {thewin_detail}</Card.Text>
                    <Row>
                      <Col>
                        ได้รับคะแนนโหวต = {thewin_point} / {par_taotal}
                      </Col>
                    </Row>
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
                    <Table
                      style={{ marginTop: 20 }}
                      dataSource={dataTable.filter((item) =>
                        item.Name.includes(query)
                      )}
                    >
                      <Column title="#" dataIndex="No" key="No" />
                      <Column title="ชื่อ" dataIndex="Name" key="Name" />
                      <Column
                        title="นามสกุล"
                        dataIndex="Surname"
                        key="Surname"
                      />
                      <Column title="หมายเลข" dataIndex="Vote" key="Vote" />
                    </Table>
                  </Container>

                  <Row>
                    <Col>
                      <h4>รายละเอียดการเลือกตั้ง </h4>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <h4>ผู้มีสิทธิลงคะแนนทั้งหมด {par_taotal} คน </h4>
                    </Col>
                    <Col>
                      <h4>ลงคะแนนทั้งหมด {total_point} คน </h4>
                    </Col>
                    <Col>
                      <h4>ไม่มาลงคะแนนทั้งหมด {nologin} คน </h4>
                    </Col>
                    <Col>
                      <h4>งดออกเสียงทั้งหมด {nopoint} คน </h4>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>
              <Row>
                <Col>
                  <Button
                    id="button_full_o"
                    onClick={() => {
                      handleDataFetch2();
                      setShow2(1);
                    }}
                  >
                    ข้อมูลผู้ชนะการเลือกตั้ง
                  </Button>
                </Col>
                <Col>
                  <Button
                    id="button_full_o"
                    onClick={() => {
                      handleDataFetch();
                      set_Show();
                    }}
                  >
                    ข้อมูลผิดปกติ
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                id="button_full_o"
                disabled = {sub}
                onClick={() => ShowState()}
                style={{ margintop: 50, width: "100%" }}
              >
                ยืนยันการเลือกตั้ง
              </Button>{" "}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default EventDetail3;
