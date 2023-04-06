import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Edit.css";
import { Space, Tag, Input, Table } from "antd";
import "antd/dist/antd.css";
import {
  InputGroup,
  FormControl,
  Navbar,
  Modal,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const { Search } = Input;
const onSearch = (value) => console.log(value);

var dataTable = [];
var dataTable2 = [];
var dataTable3 = [];

function Usermanage() {
  const navi = useNavigate();
  const [namestaff, setNamestaff] = useState([]);
  const [login, setLogin] = useState([]);

  const [query, setQuery] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [event_dup, setEvent_dup] = useState([]);

  const { Column, ColumnGroup } = Table;
  var Event_staff = [];

  var ev = "...";
  var ev2 = "...";

  useEffect(() => {
    check_authen();
  }, []);

  const check_authen = () => {
    Axios.post(`${window._env_.API_URL}/authen`, {
      tokenC: tokenC,
    })
      .then((res, err) => {
        if (tokenC != null) {
          if (res.data.message == "admin" || res.data.message == "staff") {
            console.log("res = ", res);
            alert(res.data);
            setLogin(authen);
            console.log("res.data", res.data.message);

            Showuser();
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

  // List Name User ==========================================================================

  const Showuser = () => {
    Axios.get(`${window._env_.API_URL}/showStaff`).then((res) => {
      setNamestaff(res.data.massage);
      console.log("Show = ", res.data.massage); 
      dataTable2 = [];
      for (var i = 0; i < res.data.massage.length; i++) {
        dataTable2.push({
          No: i + 1,
          Name: res.data.massage[i].Name,
          Surname: res.data.massage[i].Surname,
          Authen: res.data.massage[i].Authen,
        });
      }
    });
  };

  const Create_staff = () => {
    navi("StaffCreate");
  };
  // delete Data ================================================================================

  const Delete_data = (id) => {
    console.log(id);
    Axios.post(`${window._env_.API_URL}/Deleteuser`, {
      id: id,
    }).then((res) => {
      console.log(res.data);
      console.log("Delete = ", id);
    });
  };

  // Show Modal Staff =========================================================================

  const showname = (e) => {
    console.log("name == ", name.length, " surname == ", surname.length);
    if (name.length != 0 || surname.length != 0) {
      Axios.post(`${window._env_.API_URL}/showuserevent`, {
        name: name,
        surname: surname,
      }).then((res) => {
        dataTable = [];
        for (var i = 0; i < res.data.massage.length; i++) {
          Event_staff[i] = res.data.massage[i].Id_event;
          console.log("Event_dup = ", Event_staff);

          if (res.data.massage[i].status_event == 0) {
            ev = "กำลังดำเนินการ";
          }
          if (res.data.massage[i].status_event == 1) {
            ev = "ยังไม่ยืนยัน";
          }
          if (res.data.massage[i].status_event == 2) {
            ev = "ยืนยัน";
          }
          dataTable.push({
            Name_Event: res.data.massage[i].Event_name,
            Date: res.data.massage[i].Date_vote,
            timestart: res.data.massage[i].Time_start,
            Timeend: res.data.massage[i].Time_end,
            Status: ev,
          });
          // console.log("Status == ", ev);
          show_allevent();
        }
      });
    }
  };

  const show_allevent = (e) => {
    console.log(name, " == ", surname); 
    Axios.get(`${window._env_.API_URL}/showallevent`).then((res) => {
      console.log("test == ", res.data.massage.Id_event);
      dataTable3 = [];
      for (var i = 0; i < res.data.massage.length; i++) {
        for (var j = 0; j < Event_staff.length; j++) {
          console.log(Event_staff[j],"== test == ", res.data.massage[i].Id_event);
          if (Event_staff[j] != res.data.massage[i].Id_event) { 
              //  console.log(Event_staff[j],"== test == ", res.data.massage[i].Id_event);  
          }
        }
        if (res.data.massage[i].status_event == 0) {
          ev2 = "กำลังดำเนินการ";
        }
        if (res.data.massage[i].status_event == 1) {
          ev2 = "ไม่ยืนยัน";
        }
        if (res.data.massage[i].status_event == 2) {
          ev2 = "ยืนยัน";
        }
        dataTable3.push({
          Name_Event: res.data.massage[i].Event_name,
          Date: res.data.massage[i].Date_vote,
          timestart: res.data.massage[i].Time_start,
          Timeend: res.data.massage[i].Time_end,
          Status: ev2,
        });
        console.log("== test == ", res.data.massage[i].Id_event);

  //       // console.log("Status == ", ev);
      }
    });
  };

  return (
    <div>
      <header id="Headermain">
        <h1 id="main"> UserManage </h1>
        <div id="Number">
          <p>{login}</p>
          <a href="/">Logout</a>
        </div>
      </header>
      <div style={{ paddingTop: 20 }}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: 304,
            marginLeft: 1000,
          }}
          onSearch={onSearch}
        />
        <Container style={{ padding: 20 }}>
          <Table
            style={{ marginTop: 20 }}
            dataSource={dataTable2.filter((item) => item.Name.includes(query))}
          >
            <Column title="No." dataIndex="No" key="No" />
            <Column title="ชื่อ" dataIndex="Name" key="Name" />
            <Column title="นามสกุล" dataIndex="Surname" key="Surname" />
            <Column title="ตำแหน่ง" dataIndex="Authen" key="Authen" />
            <ColumnGroup title="การแก้ไข">
              <Column
                title="การแก้ไข"
                key="Edit"
                render={(_, record) => (
                  <Space size="small">
                    <Button
                      id="button_full_o"
                      onClick={() => {
                        setLgShow(true);
                        setName(record.Name);
                        setSurname(record.Surname);
                        showname();
                      }}
                    >
                      Edit
                    </Button>
                  </Space>
                )}
              />
              <Column
                title="การแก้ไข"
                key="Chang"
                render={(_, record) => (
                  <Space size="small">
                    <Button>Chang Password</Button>
                  </Space>
                )}
              />
              <Column
                title="การแก้ไข"
                key="Chang"
                render={(_, record) => (
                  <Space size="small">
                    <Button id="button_full_o">Delete</Button>
                  </Space>
                )}
              />
            </ColumnGroup>
          </Table>
          <Button
            id="button_h_o"
            variant="contained"
            onClick={() => Create_staff()}
            type="submit"
          >
            Create User
          </Button>
          <Button
            id="button_h_o" variant="contained" type="submit" href="/MainAdmin/Usermain">
            Back Page
          </Button>
        </Container>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Detail User Staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <h1>
                {" "}
                {name} {surname}{" "}
              </h1>
              <Table dataSource={dataTable}>
                <Column
                  title="Name_Event"
                  dataIndex="Name_Event"
                  key="Name_Event"
                />
                <Column title="Date" dataIndex="Date" key="Date" />
                <Column
                  title="timestart"
                  dataIndex="timestart"
                  key="timestart"
                />
                <Column title="Timeend" dataIndex="Timeend" key="Timeend" />
                <Column title="Status" dataIndex="Status" key="Status" />
              </Table>
              <br></br>
              <br></br>
              <h1> Order Event </h1>
              <Table dataSource={dataTable3}>
                <Column
                  title="Name_Event"
                  dataIndex="Name_Event"
                  key="Name_Event"
                />
                <Column title="Date" dataIndex="Date" key="Date" />
                <Column
                  title="timestart"
                  dataIndex="timestart"
                  key="timestart"
                />
                <Column title="Timeend" dataIndex="Timeend" key="Timeend" />
                <Column
                  title="Add Event"
                  render={(_, record) => (
                    <Space size="small">
                      <Button
                      //  onClick={() => Detail(record.key,record.Par)}
                      >
                        Add Event
                      </Button>
                    </Space>
                  )}
                />
              </Table>
            </Row>
            <Row>
              <Col>
                {/* <Button
                  variant="summary"
                  // onClick={() => Delete_data(item.Par_id)}
                  type="submit" 
                >
                  Add Event
                </Button> */}
              </Col>
              <Col>
                <Button
                  variant="summary"
                  // onClick={() => Delete_data(item.Par_id)}
                  type="submit"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Usermanage;
