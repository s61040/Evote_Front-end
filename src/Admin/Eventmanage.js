import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
import "./Css/Edit.css";
import { Space, Tag, Input,Table} from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Navmas from "../Navmaster/Navmas"; 

import {
  InputGroup,
  FormControl,
  Modal,
  Row,
  Card,
  Col,
  Alert,
  Button,
  Container,
} from "react-bootstrap";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;
var dataTable = [];
function Eventmanage() {
  const [show, setShow] = useState(false);
  const [nameevent_d, setNameevent_d] = useState([]); 
  const navi = useNavigate();
  const [user, setUser] = useState([]);

  const [query, setQuery] = useState("");

  const [candidate, setCandidate] = useState([]);
  const [nameevent, setNameevent] = useState([]);
  const [par_event, setPar_event] = useState([]);
  const [can_event, setCan_event] = useState([]);
  const [login, setLogin] = useState([]);
  const useruserlogin = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  useEffect(() => {
    Showevent();
    check_authen();
  }, []);

  const check_authen = () => {
    Axios.post(`${window._env_.API_URL}/authen`, {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "admin") {
            console.log("res = ", res);
            // alert(res.data);
            setLogin(user);
            console.log("res.data", res.data.message);
          } else {
            alert("กรุณาล็อคอินใหม่");
            localStorage.clear();
            window.location = "/";
          }
        } else if (tokenC != res.data.tokenC) {
          alert("กรุณาล็อคอินใหม่");

          localStorage.clear();
          window.location = "/";
          // window.location = "/";
        }
      })
      .catch((err) => {
        alert("กรุณาล็อคอินใหม่");

        localStorage.clear();
        window.location = "/";
        console.log("err");
      });
  };
 

  const Showevent = (e) => {
    var c_detail = 0
    Axios.get(`${window._env_.API_URL}/showeventmanage`).then((res) => {
      setNameevent(res.data.massage);
      setPar_event(res.data.massage2);
      setCan_event(res.data.massage3);
      console.log(res.data);
      console.log("data.User");
      dataTable = [];

      for (var i = 0; i < res.data.userlength; i++) {
        if(res.data.massage[i].status_event == 4){
          c_detail = 1;
        }
        dataTable.push({
          key: res.data.massage[i].Id_event,
          Name_Event: res.data.massage[i].Event_name,
          Candidate: res.data.massage3[i].Id_can,
          Par: res.data.massage2[i].Par_id-1,
          detail : c_detail,
        });
        c_detail = 0;
        console.log("data.User = ", res.data.massage2[i].Par_id)
      }
    });
  };

  const Edit_Event = (id_event, eventnow) => {
    localStorage.setItem("name_edit", id_event);
    localStorage.setItem("event", eventnow);

    navi("EditEvent");
  };

  const Delete_Event = (name_event) => {
    console.log("event = ", name_event);
    Axios.post(`${window._env_.API_URL}/Delete_e`, {
      name_event: name_event,
    })
      .then((res) => {
        alert("Delete Data Event");
        window.location = "/MainAdmin/Event/EventManagement";
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>  
      <header id="H">
        <Navmas head={'Event Manage'} role={login} /> 
      </header>
      <div style={{marginTop: 20}}> 
        <Search
          placeholder="Name Event"
          allowClear 
          size="large"
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: 304,
            marginLeft: 1000,
          }}
          onSearch={onSearch}
        />
        <Container style={{ padding: 20 }}>
          <PerfectScrollbar>
          <Table dataSource={dataTable
            // .filter((item) => item.Id_can.includes(query))
            }>
              <Column title="#" dataIndex="key" key="key" />
              <Column
                title="ชื่อการเลือกตั้ง"
                dataIndex="Name_Event"
                key="Name_Event"
              />
              <Column title="จำนวนผู้มีสิทธ์เลือกตั้ง" dataIndex="Par" key="Par" /> 
              <Column title="จำนวนผู้สมัคร" dataIndex="Candidate" key="Candidate" /> 
                <Column
                  title="แก้ไข"
                  key ="detail"
                  render={(_, record) => (
                    <Space size="small">
                      <Button 
                        id="button_full_o" 
                        disabled ={record.detail}
                        onClick={() =>
                          Edit_Event(record.key, record.Name_Event)
                        }
                      >
                        Edit
                      </Button>
                    </Space>
                  )}
                />
                <Column
                   title="ลบ"
                  render={(_, record) => (
                    <Space size="small">
                      <Button 
                        id="button_full_o" 
                        onClick={() => {
                          setNameevent_d(record.key);
                          setShow(true);
                        }}
                        type="submit"
                      >
                        Delete
                      </Button>
                    </Space>
                  )}
                /> 
            </Table>
          </PerfectScrollbar>
          <Row>
            <Col>
                <Button
                id="button_h_o" 
                variant="contained"
                type="submit"
                href="/MainAdmin/Event/EventManagement/EventCreate"
              >
                สร้าง Event
              </Button>
            </Col>
            <Col>
                <Button
                id="button_h_o"  
                variant="contained"
                type="submit"
                href="/MainAdmin/Event"
              >
                กลับ
              </Button>
            </Col>
          </Row>
          
        </Container>
      </div>

      <Modal
          show={show}
          style={{  
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันการลบ กิจกรรม</Modal.Title>
          </Modal.Header> 
          <Modal.Footer>
          {/* <Row>
            <Col>
            <button id="button_h_o"  >
              <CSVLink {...csvReport}>
                ดาวน์โหลด
              </CSVLink>
            </button> 
            </Col>
            <Col>
              <Button id="button_h_o" onClick={() => setShow(0)}>
                กลับ
              </Button>
            </Col>
          </Row> */}
          <Button id="button_h_o" onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button> 
          <Button
            id="button_h_o"
            onClick={() => Delete_Event(nameevent_d)}
            variant="outline-success"
          >
            Delete
          </Button>
          </Modal.Footer>
        </Modal>

      {/* <Alert show={show} variant="success">
        <Alert.Heading>ยืนยันการลบ กิจกรรม</Alert.Heading> 
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button> 
          <Button
            onClick={() => Delete_Event(nameevent_d)}
            variant="outline-success"
          >
            Delete
          </Button>
        </div>
      </Alert> */}
    </div>
  );
}
export default Eventmanage;
