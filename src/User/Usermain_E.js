import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Main.css";
import {
  Card,
  CardGroup,
  Container,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import Axios from "axios";
import Navmas from "../Navmaster/Navmas";


 

function Usermain_E() {
  const current = new Date();
  const date2 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const getname = localStorage.getItem("eventname");
  const getuser = localStorage.getItem("user");
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  const i_event = localStorage.getItem("event");
  const date_check = localStorage.getItem("date");
  const time_check = localStorage.getItem("time");
  const to = localStorage.getItem("timeout");
  // var name_e = "";

  const [candidate, setCandidate] = useState([]);
  const [number, setNumber] = useState([]);
  const [login, setLogin] = useState([]);

  const [id_e, setId_e] = useState(0);
  var id_time = 0;

  const [name_e, setName_e] = useState([]);

  const [id_par, setId_par] = useState(0);
  var id_par_time = 0;

  const [id_candidate, setId_candidate] = useState(0);
  const [n_candidate, setN_candidate] = useState("");
  const [sn_candidate, setSn_candidate] = useState("");
  const [lgShow, setLgShow] = useState(false);

  const [status_vote, setStatus_vote] = useState("เปิดโหวค");

  const [check_vote, setCheck_vote] = useState(false);
  const [date_e, setDate_e] = useState("");
  const [time_e, setTime_e] = useState("");
  const [clockState, setClockState] = useState();

  const [time, setTime] = useState();

  useEffect(() => {
    var time = 1 ;
    check_authen();
    cheknottime();
    prepare_candidate();
    setInterval(() => {
      const dates = new Date();
      setClockState(dates.toLocaleTimeString());
    }, 1000);
    console.log("Id Event == ", i_event);
    Axios.post(`${window._env_.API_URL}/userevent`, {
      i_event: i_event,
      tokenC: tokenC,
    }).then((res) => {
      setCandidate(res.data.massage);
      setName_e(res.data.event.Event_name);
      setId_par(res.data.par.Par_id);
      setId_e(res.data.event.Id_event);
      setDate_e(res.data.event.Date_vote);
      setTime_e(res.data.event.Time_end);
      time = res.data.result;
      console.log(res.data.massage);
      console.log("data.candidate", clockState);
      console.log("Id Par ==", id_par);
      id_time = res.data.event.Id_event;
      id_par_time = res.data.par.Par_id;
      alert(clockState.substring(0, 5));
    });
    setInterval(() => {
      timeout();
    }, to*60000);
  }, []);

  // Check Event --------------------------------------------------

  const checkeventstatus = () => {
    Axios.post(`${window._env_.API_URL}/Checkevent`, {
      date: date,
      clockState: clockState,
    }).then((res, err) => {
      if (err) {
        alert(err);
        console.log(err);
      } else {
        chekdisible();
      }
    });
  };

  const cheknottime = () => {
    Axios.post(`${window._env_.API_URL}/chekdisible2`, {
      date_check: date_check,
      time_check: time_check,
      i_event: i_event,
    }).then((res, err) => {
      if (err) {
        alert(err);
        console.log(err);
      }
      if (res.data.massage == "true") {
        alert("ยังไม่ถึงเวลา");
        localStorage.clear();
        window.location = "/";
      }
      if (res.data.massage == "End") {
        alert("การเลือกตั้งจบไปแล้ว");
        localStorage.clear();
        window.location = "/";
      } else {
        time =  res.data.timeout;
      }
    });
  };

  const checkeventstatus2 = () => {
    Axios.post(`${window._env_.API_URL}/Checkevent`, {
      date: date,
      clockState: clockState,
    }).then((res, err) => {
      if (err) {
        alert(err);
        console.log(err);
      } else {
        // chekdisible();
      }
    });
  };

  const chekdisible = () => {
    Axios.post(`${window._env_.API_URL}/chekdisible`, {
      i_event: i_event,
    }).then((res, err) => {
      if (err) {
        alert(err);
        console.log(err);
      }
      if (res.data.massage == "true") {
        alert("เกินเวลาที่กำหนด");
        window.location = "/";
      } else {
        Vote();
      }
    });
  };

  const check_authen = () => {
    Axios.post(`${window._env_.API_URL}/authen`, {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "participant") {
            console.log("res = ", res);
            alert("การเลือกตั้ง");
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
        console.log("err", err);
      });
  };
  const prepare_candidate = (e) => {
    Axios.post(`${window._env_.API_URL}/userevent`, {
      i_event: i_event,
    }).then((res) => {
      setCandidate(res.data.massage);
      setName_e(res.data.event.Event_name);
      console.log(name_e);
      console.log(res.data.massage);
      console.log("data.candidate");
    });
  };

  //Vote -----------------------------------------------------------
  const Vote = () => {
    Axios.post(`${window._env_.API_URL}/Vote`, {
      id_par: id_par,
      id_candidate: id_candidate,
      date: date,
      clockState: clockState,
      id_e: id_e,
    }).then((res) => {
      if (res.data.Massage == "insert1" || res.data.Massage == "insert2") {
        console.log("ID Candidate =", id_candidate);
        window.localStorage.clear();
        console.log("Insert", res);
        alert("เสร็จสิ้นการเลือกตั้ง");
        window.location = "/";
      } else {
        console.log("FailVote");
        alert("Fail Vote");
      }
    });
  };
  
  const timeout = () => { 
        window.location = "/"; 
  }; 
  // const timeout = () => {
  //   const dates = new Date();
  //   var t = dates.toLocaleTimeString(); 
  //   Axios.post("${window._env_.API_URL}/Vote", {
  //     id_par: id_par_time,
  //     id_candidate: 0,
  //     date: date,
  //     clockState: t,
  //     id_e: id_time,
  //   }).then((res) => {
  //     if (res.data.Massage == "insert1" || res.data.Massage == "insert2") {
  //       console.log("ID Candidate =", id_candidate);
  //       window.localStorage.clear();
  //       alert(t);
  //       window.location = "/";
  //       console.log("Insert", res);
  //       //  window.location = "/";
  //     } else {
  //       console.log("FailVote");
  //       alert("Fail Vote");
  //     }
  //   });
  // };
  return (
    <div>
      {/* <Navmas head={"participant"} role={login} /> */}
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
          >Selected Election </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                สำหรับ User เข้ามาลงคะแนนเสียงเพื่อคนที่คุณไว้ใจ ในหัวข้อ
                {name_e} {status_vote}{" "}
              </p>
              <footer className="blockquote-footer">
                {date2} {clockState}
                <cite title="Source Title">Title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
        <div className="Card">
          {candidate.map((item) => (
            <div style={{ paddingTop: "3%" }}>
              <Card  style={{ border: "0.2px solid #FF4B2B", }} id="cardEvent">
                <Card.Header
                   style={{
                    color: "#ffffff",
                    border: "3px solid #FF4B2B",
                    backgroundColor: "#FF4B2B",
                  }}
                  >{name_e}</Card.Header>
                <Card.Body>
                  <div class="row">
                    <div class="col">
                      <h3> Name Candidate </h3>
                      <p>
                        {" "}
                        {item.Name} {item.Surname}
                      </p>
                      <br></br>
                      <h3> Detail Candidate </h3>
                      <p> {item.Detail} </p>
                      <br></br>
                      <Button
                        onClick={() => {
                          checkeventstatus2();
                          setLgShow(true);
                          setId_candidate(item.Id_can);
                          setN_candidate(item.Name);
                          setSn_candidate(item.Surname);
                        }}
                        id="button_full_o" 
                      >
                        Vote
                      </Button>
                    </div>
                    <div class="col">
                      <Card.Img
                        variant="top" 
                        src={`${window._env_.API_URL}/img/${item.Img}`} 
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}

          <div style={{ paddingTop: "3%" }}>
            <Card style={{ border: "0.2px solid #FF4B2B", }} id="cardEvent">
              <Card.Header
                 style={{
                  color: "#ffffff",
                  border: "3px solid #FF4B2B",
                  backgroundColor: "#FF4B2B",
                }}
              >{name_e} </Card.Header>
              <Card.Body>
                <div class="row">
                  <div class="col">
                    <h3> No Vote </h3>
                    <br></br>
                    <Button
                      id="button_full_o" 
                      onClick={() => {
                        checkeventstatus2();
                        setLgShow(true);
                        setId_candidate(0);
                      }}
                      variant="primary"
                    >
                      Vote
                    </Button>
                  </div>
                  <div class="col">
                    <Card.Img
                      variant="top"
                      src={require("../images/" + "no_vote.png")}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            ยืนยันการเลือกตั้ง
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
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
              >ยืนยันการเลือกผู้สมัครของคุณ </Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>{name_e} </p>
                  <footer className="blockquote-footer">
                    เช็คเพื่อความแน่ใจในคะแนนที่คุณเลือก {n_candidate}{" "}
                    {sn_candidate} <cite title="Source Title"></cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
            <br></br>
            <br></br>
            <div>
              <Row>
                <Col>
                  <Button
                    id="button_full_o" 
                    onClick={() => {
                      checkeventstatus();
                      setCheck_vote(true);
                    }}
                  >
                    ยืนยัน
                  </Button>
                </Col>
                <Col>
                  <Button id="button_full_o"  onClick={() => setLgShow(false)}>ยกเลิก</Button>
                </Col>
              </Row>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Usermain_E;
// {candidate.map((item) => (
//   <div className="Card1" style={{ paddingTop: "5%" }}>
//     <Card border="primary" style={{ width: "18rem" }}>
//       <Card.Header>Number</Card.Header>
//       <Card.Body>
//         <label>
//           Name : {item.Name} Last Name : {item.Surname}
//         </label>
//         <Card.Img
//           variant="top"
//           // src={item.p_image_c}
//           src={require("../images/" + item.Img)}
//         />
//         {/* recource={{uri: article.img}} */}
//         <label>Detail </label>
//         <label>{item.Detail}</label>
//         <br></br>{" "}
//       </Card.Body>
//     </Card>
//   </div>
// ))}
