import { React, Component, useState, setState, useEffect } from "react";
import Axios from "axios";
import "./Css/Edit.css";
import { Space, Tag, Input,Table} from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { 
  InputGroup,
  FormControl,
  Modal ,
  Row,
  Col, 
  Alert ,
  Button,
  Container,
} from "react-bootstrap";
import Navmas_staff from "../Navmaster/Navmas_staff";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;

var dataTable = [];

function Staffevent() {

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
  const authen = localStorage.getItem("user"); 
  const tokenC = localStorage.getItem("token");
  const ID_staff = localStorage.getItem("ID");



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
          if (res.data.message == "admin" || res.data.message == "staff") {
            console.log("res = ", res);
            // alert(res.data);
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

  const Showevent = (e) => {
    var c_detail = 0;
    Axios.post(`${window._env_.API_URL}/staff_showeventmanage`,{
        ID_staff:ID_staff,
    }).then((res) => {
      setNameevent(res.data.massage);
      setPar_event(res.data.massage2);
      setCan_event(res.data.massage3);
      console.log("data.User = ", res.data.massage);
      console.log("data.User");
      if(res.data.massage[0].status_event == 4){
        c_detail = 1;
      }
      dataTable = []; 
       dataTable.push({
         key: res.data.massage[0].Id_event,
         Name_Event: res.data.massage[0].Event_name,
         Candidate: res.data.massage3[0].Id_can,
         Par: res.data.massage2[0].Par_id, 
         detail: c_detail,
       }); 
       c_detail = 0;
    });
  };

  const Edit_Event = (id_event , eventnow) => {
    localStorage.setItem("name_edit", id_event);
    localStorage.setItem("event", eventnow);
    
    navi("\EditEvent");
  };

  const Delete_Event = (name_event) => {
    console.log("event = " , name_event);
    Axios.post(`${window._env_.API_URL}/Delete_e`, {
      name_event: name_event,
    })
      .then((res) => {
        alert("Delete Data Event");
        window.location ="/MainAdmin/Event/EventManagement";
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <header id="H"> 
          <Navmas_staff
            head = {"Staff Main"}
            role = {login} 
          /> 
      </header>
      <div style={{marginTop:20}}> 
        <Container style={{ padding: 20 }}>
          <PerfectScrollbar>

          <Table dataSource={dataTable}>
                  <Column title="#" dataIndex="key" key="key" />
                  <Column
                    title="ชื่อ"
                    dataIndex="Name_Event"
                    key="Name_Event"
                  />
                  <Column
                    title="จำนวนผู้สมัคร"
                    dataIndex="Candidate"
                    key="Candidate"
                  />
                  <Column title="จำนวนผู้มีสิทธ์" dataIndex="Par" key="Par" />  
                  <Column
                    title="แก้ไขการเลือกตั้ง"  
                    key = "detail"
                    render={(_, record) => (
                      <Space size="small">
                        <Button
                          id="button_full_o"
                          disabled ={record.detail}
                           onClick={() =>Edit_Event(record.key , record.Name_Event) } 
                          >
                          Edit</Button>
                      </Space>
                    )}
                  />
                </Table> 
          </PerfectScrollbar> 
                <Button
                 id="button_full_o"
                type="submit"
                href="/MainStaff"
              >
                กลับ
              </Button> 
        </Container>
      </div>
      
 

      {/* <Alert show={show} variant="success">
        <Alert.Heading>ยืนยันการลบ กิจกรรม</Alert.Heading> 
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close
          </Button> 
          <Button onClick={() => Delete_Event(nameevent_d)} variant="outline-success">
            Delete
          </Button>
        </div>
      </Alert>  */}
    </div>
  );
}
export default Staffevent;
