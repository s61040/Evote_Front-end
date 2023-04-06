import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { CSVLink, CSVDownload } from "react-csv";
import "./Css/Main.css";
import { Space, Table, Tag } from "antd";
import {
  Card,
  Button,
  Alert,
  Col,
  Modal,
  Form,
  Row,
  Container,
} from "react-bootstrap";
import Navmas from "../Navmaster/Navmas";
import Navmas_staff from "../Navmaster/Navmas_staff"; 

var dataTable = [];
var nameE = "234"; 
var data2 = [];
var check_H = [];
var Check_Sub = 0;

function StaffmainStaffhistory() {
  const current = new Date();
  const date2 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const [clockState, setClockState] = useState();

  const [login, setLogin] = useState([]);

  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  const ID_staff = localStorage.getItem("ID");
  const id_e = localStorage.getItem("ID_E");

  const [namestaff, setNamestaff] = useState([]);
  const [event_now, setEvent_now] = useState([]);
  const { fileData, setFileData } = useState();


  const [show, setShow] = useState(0);
  const [status_event, setStatus_event] = useState("");

  var ev = "...";

  const navi = useNavigate();

  const { Column, ColumnGroup } = Table;
  useEffect(() => {
    check_authen();
    setInterval(() => {
      const dates = new Date();
      setClockState(dates.toLocaleTimeString());
    }, 1000);
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
            showname();
            setLogin(authen);
            console.log("res.data", res.data.message);
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



   // data csv =======================================================================

   const handleDataFetch = (key, name) => {
    Axios.post(`${window._env_.API_URL}/Csv_data`, {
      key: key,
    }).then((res, err) => {
      data2 = res.data.massage;
      nameE = name;
      console.log("sss = ", data2);
      console.log("name= ", nameE.toString());
      setFileData(res.data.massage);
    });
  };

  const headers2 = [
    { label: "Email", key: "Email" },
    { label: "ElecStatus", key: "ElecStatus" },
    { label: "Date_vote", key: "Date_vote" },
    { label: "Time_vote", key: "Time_vote" },
  ];



  // showname  -------------------------------------------------------------------

  const showname = (e) => {
    console.log("showname = ", id_e, "  =  ", ID_staff);
    Axios.post(`${window._env_.API_URL}/Staff_showeventstat`, {
      id_e: id_e,
      ID_staff: ID_staff,
    }).then((res, err) => {
      console.log("test = ",res.data.massage);
      console.log("3 = ", res.data.massage3);
      console.log("err = ", err);
      dataTable = [];
      if (res.data.massage[0].status_event == 1) {
        ev = "ยังไม่ยืนยัน";
      } else if (res.data.massage[0].status_event == 2) {
        ev = "ยืนยันแล้ว";
      }else if (res.data.massage[0].status_event == 3) {
        ev = "ผิดปกติ";
      }
      dataTable.push({
        key: res.data.massage[0].Id_event,
        Name_Event: res.data.massage[0].Event_name,
        Candidate: res.data.massage3[0].nocan,
        Par: res.data.massage2[0].nopar,
        Status: ev,
      });
      console.log("Status == ", ev);
    });
  }; 
 
    // Check_hashVote ===================================================

    const Check_hash = (Id_event, par) => {
      Axios.post(`${window._env_.API_URL}/count_check`, {
        Id_event: Id_event,
      }).then((res) => {
        localStorage.setItem("check", 0);
        console.log(res.data.length);
        if (res.data.length == 0) {
          alert("ไม่มีข้อมูล");
        }
        for (var i = 0; i < res.data.length; i++) {
          check_H[i] = res.data.massage[i];
        }
        console.log(" = ", check_H);
        var aaaa = 0;
        for (var ii = 0; ii < res.data.length; ii++) {
          if (aaaa == 0) {
            Axios.post(`${window._env_.API_URL}/Check_hash`, {
              id: check_H[ii].id,
              vote: check_H[ii].Vote,
              hash: check_H[ii].hash_vote,
              p_hash: check_H[ii].P_hash,
              date: check_H[ii].Date_vote,
              time: check_H[ii].Time_vote,
            }).then((res) => {
              console.log(res);
              if (Check_Sub == 0) {
                if (res.data.massage == "ok") {
                } else {
                  Check_Sub++;
                  Check_S(Id_event);
                }
              }
            });
          }
        }
      });
    };
  
    const Check_S = (Id_event) => {
      Axios.post(`${window._env_.API_URL}/Event_wrong`, {
        Id_event: Id_event,
      }).then((res) => {});
      localStorage.setItem("check", 3);
      // alert("ผิดปกติ");
    };

 // Detail -------------------------------------------------------------------
    const Detail = (id_event, par , Status) => {
      Axios.post(`${window._env_.API_URL}/Show_Vote`, {
        id_event: id_event,
      }).then((res, err) => {
        if (res.data.massage == "ok") {
          if(Status == 'ยืนยันแล้ว'){
            localStorage.setItem("check", 2);
          }
          localStorage.setItem("id_event", id_event);
          localStorage.setItem("Vo", res.data.check);
          localStorage.setItem("no.par", par);
          localStorage.setItem("Img", res.data.Img);
          navi("detail");
        }
      });
    };

  return (
    <div> 
      <Navmas_staff head={"Main Menu"}  role={login} />
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
            Setting Role{" "}
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {" "}
                สำหรับ Admin เพื่อการตั้งค่าผู้ที่มีส่วนเกี่ยวข้องกับการโหวต{" "}
              </p>
              <footer className="blockquote-footer">
                Power!!! {date2} {clockState}{" "}
                <cite title="Source Title">title</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>

        <Modal show={show} style={{}}>
          <Modal.Header closeButton>
            <Modal.Title>ดาวน์โหลดข้อมูลของการเลือกตั้ง</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Row>
              <Col>
                <button id="button_h_o">
                  <CSVLink
                    // {...csvReport}
                    data={data2}
                    headers={headers2}
                    filename={nameE+"รายชื่อ"}
                    target="_blank"
                  >
                    ดาวน์โหลด
                  </CSVLink>
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
              History Event
            </Card.Header>
            <Card.Body>
              <Container>
                <Table dataSource={dataTable}>
                  <Column title="#" dataIndex="key" key="key" />
                  <Column
                    title="การเลือกตั้ง"
                    dataIndex="Name_Event"
                    key="Name_Event"
                  />
                  <Column
                    title="จำนวนผู้ลงสมัคร"
                    dataIndex="Candidate"
                    key="Candidate"
                  />
                  <Column title="จำนวนผู้มีสิทธิ" dataIndex="Par" key="Par" />
                  <Column title="Status" dataIndex="Status" key="Status" />
                  <Column
                    title="รายละเอียด"
                    render={(_, record) => (
                      <Space size="small">
                        <Button
                          id="button_full_o"
                          onClick={() => {
                            Check_hash(record.key, record.Par);
                            Detail(record.key, record.Par ,record.Status);
                          }}
                          // href = "/MainAdmin/Event/Eventstat/detail"
                        >
                          Detail
                        </Button>
                      </Space>
                    )}
                  />
                  <Column
                    title="CSV"
                    render={(_, record) => (
                      <Space size="small">
                        <Button
                          id="button_full_o"
                          onClick={() => {
                            handleDataFetch(record.key, record.Name_Event);
                            setShow(1);
                          }}
                        >
                          Export
                        </Button>
                      </Space>
                    )}
                  />
                </Table>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default StaffmainStaffhistory;
