import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./CssResults/Eventsum.css";
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
var img_win = "no_vote";

function ParDetail() {
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  const par_taotal = localStorage.getItem("no.par");
  const Id_event = localStorage.getItem("id_event");
  const ID_user = localStorage.getItem("ID");
  const V = localStorage.getItem("Vo");
  const Img_sd = localStorage.getItem("Img");

  const [namestaff, setNamestaff] = useState([]);

   

  const [event_name, setEvent_name] = useState([]);
  const [event_detail, setEvent_detail] = useState([]);
  const [event_start, setEvent_start] = useState([]);
  const [event_end, setEvent_end] = useState([]);
  const [event_Results, setEvent_Results] = useState([]);

  const [total_par, setTotal_par] = useState([]);
  const [total_point, setTota_poin] = useState([]);
  const [nologin, setNologin] = useState([]);
  const [nopoint, setNopoint] = useState([]);

  const [thewin_name, setThewin_name] = useState([]);
  const [thewin_lname, setThewin_lname] = useState([]);
  const [thewin_detail, setThewin_detail] = useState([]);
  const [thewin_point, setThewin_point] = useState([]);
  const [thewin_img, setThewin_img] = useState([]);

  const [query, setQuery] = useState("");

  const [detail_c, setDetail_c] = useState([]);
  const navi = useNavigate();

  const { Column, ColumnGroup } = Table;

  useEffect(() => {
    eventshow();
    votestat();
    Resultvote();
    // check_authen();
  }, []);

  // CHECK AUTHEN -------------------------------------------------------------------
  const check_authen = () => {
    Axios.post("http://localhost:3001/authen", {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "admin" || res.data.message == "staff") {
            console.log("res = ", res);
            alert(res.data);
            setLogin(authen);
            console.log("res.data", res.data.message);
            eventshow();
            votestat();
            Resultvote();
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

  // Event Detail ---------------------------------------------------------------
  const eventshow = (e) => {
    Axios.post("http://localhost:3001/showrevent", {
      Id_event: Id_event,
    }).then((res) => {
      console.log("event == ", event_start);
      setEvent_name(res.data.massage.Event_name);
      setEvent_detail(res.data.massage.Event_detail);
      setEvent_start(res.data.massage.Time_start);
      setEvent_end(res.data.massage.Time_end);
      setEvent_Results(res.data.massage.Results);
    });
  };

  // Show Stat Vote ----------------------------------------------------------------------

  const votestat = (e) => {
    Axios.post("http://localhost:3001/votestat", {
      Id_event: Id_event,
    }).then((res) => {
      // console.log("event participant == " , res.data.massage[1].par);
      // if(res.data.massage[0].par == null){
      //   setTota_poin(0);
      // }
      // if(res.data.massage[1].par === null ) {
      //   setNologin(0);
      // }
      setTotal_par(par_taotal);
      setTota_poin(res.data.massage3[0].Vote);
      setNologin(res.data.massage[0].par);
      setNopoint(res.data.massage2[0].novote);
    });
  };

  const check_Results = () => {
    Axios.post("http://localhost:3001/showrevent_result", {
      Id_event: Id_event,
      ID_user: ID_user,
    }).then((res) => {
      console.log(res.data);
      alert(res.data.Name);
    });
  };

  // show Result vote  -------------------------------------------------------------------

  // const Resultvote = (e) => {
  //   Axios.post("http://localhost:3001/showresult", {
  //     Id_event : Id_event
  //   }).then((res) => {
  //     // console.log("event Check result == " , res.data.massage[0]);
  //     setThewin_name(res.data.massage[0].Name);
  //     setThewin_lname(res.data.massage[0].Surname);
  //     setThewin_detail(res.data.massage[0].Detail);
  //     setThewin_point(res.data.massage[0].COUNT);
  //     setThewin_img(res.data.massage[0].Img);

  //     dataTable = [];
  //     for (var i = 0; i <= res.data.massage.length; i++) {
  //       dataTable.push({
  //         No: i + 2 ,
  //         Name: res.data.massage[i+1].Name,
  //         Surname: res.data.massage[i+1].Surname,
  //         Vote: res.data.massage[i+1].COUNT,
  //       });
  //     }
  //   });
  // };

  const Resultvote = (e) => {
    Axios.post("http://localhost:3001/showresult", {
      Id_event: Id_event,
      V: V,
    }).then((res) => {
      // console.log("event Check result == " , res.data.massage[0]);
      setThewin_name(res.data.massage[0].Name);
      setThewin_lname(res.data.massage[0].Surname);
      setThewin_detail(res.data.massage[0].Detail);
      setThewin_point(res.data.massage[0].COUNT);
      setThewin_img(res.data.massage[0].Img);
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
        // console.log("Name = ", res.data.massage);
      }
      // hind_Vote();
    });
  };

  return (
    <div>
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
              <Col>Event Name = {event_name}</Col>
              <Col>
                Time Start = {event_start} - Time End = {event_end}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div>
              <blockquote className="blockquote mb-0">
                <p>
                  {" "}
                  สำหรับ Admin เพื่อการตั้งค่าผู้ที่มีส่วนเกี่ยวข้องกับการโหว{" "}
                </p>
                <footer className="blockquote-footer">
                  Power!!! <cite title="Source Title">title</cite>
                </footer>
              </blockquote>
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
                  as="h5"
                >
                  The Winner
                </Card.Header>
                <Card.Body>
                  <Container>
                    {/* {thewin_img.map((item) => ( */}
                    <Card.Img
                      variant="top"
                      // src={require("../images/"+{img_win})}
                      // src={require("../images/" + item.Img)} 
                      src={`${window._env_.API_URL}/img/${img_win}`} 
                    />
                    {/* // ))}  */}
                    <Card.Title>
                      Name : {thewin_name} Lastname : {thewin_lname}
                    </Card.Title>
                    <Card.Text>Detai {thewin_detail}</Card.Text>
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
                      <Column title="No." dataIndex="No" key="No" />
                      <Column title="First Name" dataIndex="Name" key="Name" />
                      <Column
                        title="Last Name"
                        dataIndex="Surname"
                        key="Surname"
                      />
                      <Column title="No.Vote" dataIndex="Vote" key="Vote" />
                    </Table>
                  </Container>

                  <Row>
                    <Col>
                      <h4>Event Detail {event_detail} </h4>
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
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            <Button
              id="button_full_o" 
              style={{ width: "100%" }}
              onClick={() => check_Results()}
              disabled={event_Results}
            >
              เช็คผลการเลือกตั้งของตนเอง
            </Button>
          </Col>
          <Col>
            <Button 
              id="button_full_o" 
              style={{ width: "100%" }} href="/Result">
              กลับ
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ParDetail;
