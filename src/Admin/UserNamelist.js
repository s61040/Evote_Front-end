import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
import { Space, Tag, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Css/Edit.css";
import "antd/dist/antd.css";
import {
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  Modal,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import Navmas from "../Navmaster/Navmas";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;

var dataTable = [];

function UserNamelist() {
  const navi = useNavigate();
  const [user, setUser] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [namestaff, setNamestaff] = useState([]);
  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const [query, setQuery] = useState("");

  const [n_h, setN_h] = useState("");
  const [sn_h, setSn_h] = useState("");
  const [id_c, setId_c] = useState(0);
  var ev = "...";
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (Name, Sername, id) => {
    setN_h(Name);
    setSn_h(Sername);
    setId_c(id);
    console.log("n_h = ", n_h, " sn_h = ", sn_h);
    setShow(true);
  };

  const tokenC = localStorage.getItem("token");
  useEffect(() => {
    Showuserinfo();
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

  const Changname = () => {
    Axios.post(`${window._env_.API_URL}/changname`, {
      n_h: n_h,
      sn_h: sn_h,
      id_c: id_c,
    }).then((res) => {
      console.log(res.data.massage);
      console.log("data.User");
    });
  };

  const Showuserinfo = (e) => {
    Axios.get(`${window._env_.API_URL}/showuserinfo`).then((res) => {
      setNamestaff(res.data.massage); 
      console.log("data.User");

      dataTable = []; 
      for (var i = 0; i < res.data.massage.length; i++) {
        if(res.data.massage[i].Status_user == '1'){
          ev = "ปิดการใช้งาน";
        } else {
          ev = "เปิดการใช้งาน";
        }
        dataTable.push({
          // key: i + 1,
          key: res.data.massage[i].User_id,
          Name: res.data.massage[i].Name,
          Surname: res.data.massage[i].Surname,
          Email: res.data.massage[i].Email,
          status: ev,
        });
      }
    });
  };

  const Add_Namelist = () => {
    navi("UserAdlist");
  };

  
  // const Delete_data = (id) => {
  //   // console.log(id);
  //   Swal.fire({
  //     title: 'ยืนยันลบข้อมูล', 
  //     showCancelButton: true,
  //     confirmButtonText: 'ยืนยัน', 
  //     confirmButtonColor: '#FF4B2B',
  //     cancelButtonColor: '#FF4B2B',
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       Axios.post("http://localhost:3001/Deleteuser", {
  //       id: id,
  //       }).then((res) => {
  //         console.log(res.data);
  //         console.log("Delete = ", id);
  //         window.localStorage = "MainAdmin/Usermain/NameListuser";
  //       });
  //       Swal.fire('Saved!', '', 'success')
  //     } 
  //   }) 
  // };

  const Delete_data = (id) => {
    // console.log(id);
    Swal.fire({
      title: 'เปิด/ปิดสถานะการใช้งาน', 
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน', 
      confirmButtonColor: '#FF4B2B',
      cancelButtonColor: '#FF4B2B',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios.post(`${window._env_.API_URL}/Deleteuser`, {
        id: id,
        }).then((res) => {
          console.log(res.data);
          console.log("Delete = ", id); 
          window.location = "/MainAdmin/Usermain";
        });
        Swal.fire('Saved!', '', 'success') 
      } 
    }) 
  };

  return (
    <div> 
        <Navmas
          head = {"UserMain"}
          role = {login} 
        /> 
      <div style={{ paddingTop: 20 }}>
        <Search
          placeholder="input search text" 
          size="large"
          onChange={(e) => setQuery(e.target.value)}  
          style={{
            width: 304,
            marginLeft: 1000,
          }} 
        />
        <Container style={{ padding: 20 }}>
          <Table
            style={{
              marginTop: 20,   
            }}
            dataSource={dataTable.filter((item) => item.Name.includes(query))}
          >
            <Column title="#" dataIndex="key" key="key" /> 
              <Column title="ชื่อ" dataIndex="Name" key="Name" />
              <Column title="นามสกุล" dataIndex="Surname" key="Surname" /> 
            <Column title="อีเมลล์" dataIndex="Email" key="Email" /> 
            <Column
              title="แก้ไข"
              key="Edit"
              render={(_, record) => (
                <Space size="small">
                  <Button
                    id="button_full_o"
                    onClick={() =>
                      handleShow(record.Name, record.Surname, record.key)
                    }
                    type="submit"
                  >
                    Edit
                  </Button>
                </Space>
              )}
            />

            <Column
              title="เปิด/ปิดการใช้งาน"
              key="Delete"
              render={(_, record) => (
                <Space size="small">
                  <Button
                    id="button_full_o"
                    onClick={() => Delete_data(record.key)} 
                  >
                    {record.status}
                  </Button>
                </Space>
              )}
            />
          </Table>
          <Button
            id="button_h_o"
            variant="contained"
            onClick={() => Add_Namelist()}
            type="submit"
          >
            เพิ่มรายชื่อ
          </Button>
          <Button 
            style={{marginLeft:'20%'}}
            id="button_h_o"
            variant="contained" type="submit" href="/MainAdmin">
            กลับ
          </Button>
        </Container>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขชื่อนามสกุล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="Name"
                value={n_h}
                placeholder="Name"
                onChange={(e) => {
                  setN_h(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="Name"
                value={sn_h}
                placeholder="SurName"
                onChange={(e) => {
                  setSn_h(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="button_full_o" onClick={handleClose}>
            Close
          </Button>
          <Button
            id="button_full_o"
            onClick={Changname}
            href="/MainAdmin/Usermain/NameListuser"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserNamelist;
