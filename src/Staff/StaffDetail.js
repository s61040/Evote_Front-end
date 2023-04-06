import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
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
} from "react-bootstrap";  
import Navmas_staff from './../Navmaster/Navmas_staff';

var dataTable = [];
var data2 = [];

function StaffDetail() { 

  const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  const Id_event = localStorage.getItem("id_event");
  const par_taotal = localStorage.getItem("no.par");
  const Img_sd = localStorage.getItem("Img");
  const V = localStorage.getItem("Vo");

  const [namestaff, setNamestaff] = useState([]);


  const [show, setShow] = useState(0);

  const [event_name, setEvent_name] = useState([]);
  const [event_detail, setEvent_detail] = useState([]);
  const [event_start, setEvent_start] = useState([]);
  const [event_end, setEvent_end] = useState([]);

  const [total_par, setTotal_par] = useState([]);
  const [total_point, setTota_poin] = useState([]);
  const [nologin, setNologin] = useState([]);
  const [nopoint, setNopoint] = useState([]);

  const [thewin_name, setThewin_name] = useState([]);
  const [thewin_lname, setThewin_lname] = useState([]);
  const [thewin_detail, setThewin_detail] = useState([]);
  const [thewin_point, setThewin_point] = useState([]);
  const [thewin_img, setThewin_img] = useState([]);
  const { fileData, setFileData } = useState();

  const [sub, setSub] = useState(1);
  const [sub3, setSub3] = useState(1);
  const [sub2, setSub2] = useState(0); 

  var nameE = "";
  var img_win = "d1.jpg";
  var check_H = [];
  var Check_Sub = 0;
  var data_wrong2 = [];
  const [data_wrong, setData_wrong] = useState([]);

  const [query, setQuery] = useState("");

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
            eventshow();
            votestat(); 
            Resultvote(); 
            console.log("res = ", res); 
            setLogin(authen);
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
      if(res.data.massage.status_event != 1){
        setSub(1);
        setSub2(1);
        setSub3(0);
      }
    });
  };

  // Show Stat Vote ----------------------------------------------------------------------

  const votestat = (e) => {
    Axios.post(`${window._env_.API_URL}/votestat`, {
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

  // show Result vote  -------------------------------------------------------------------

  const Resultvote = (e) => {
    Axios.post(`${window._env_.API_URL}/showresult`, {
      Id_event: Id_event,
      V : V,
    }).then((res) => {
      // console.log("event Check result == " , res.data.massage[0]);
      setThewin_name(res.data.massage[0].Name);
      setThewin_lname(res.data.massage[0].Surname);
      setThewin_detail(res.data.massage[0].Detail);
      setThewin_point(res.data.massage[0].COUNT);
      setThewin_img(res.data.massage2);
      // img_win = "../images/"+res.data.massage[0].Img;
      // img_win = "'"+'../images/d1.jpg'+res.data.massage[0].Img+"'";

      console.log("image_set = " + thewin_img);
      // console.log("image = " + img_win);

      dataTable = [];
      for (var i = 0; i <= res.data.massage.length; i++) {
        dataTable.push({
          No: i+1,
          Name: res.data.massage[i].Name,
          Surname: res.data.massage[i].Surname,
          Vote: res.data.massage[i].COUNT,
        });
      } 
      // hind_Vote();
    });
  };

  const hind_Vote = () => {
    Axios.post(`${window._env_.API_URL}/hind_Vote`, {
      Id_event: Id_event,
    }).then((res) => {
       
    });
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
    filename: nameE+"รายชื่อ",
  }; 

  // Update Status Vote ----------------------------------------------------

  const Status = () => {
    console.log(Id_event);
    Axios.post(`${window._env_.API_URL}/update_event`, {
      Id_event: Id_event,
    }).then((res) => {
      console.log(res.data.massage);
      if (res.data.massage == true) {
        alert("Update Event");
        window.location = "/MainAdmin/Event/Eventstat";
      } else {
        console.log("asd");
      }
    });
  };

  const Check_hash = () => {
    // Axios.post("${window._env_.API_URL}/hind_Vote", {
    //   Id_event: Id_event,
    // }).then((res) => {
       
    // });

    Axios.post(`${window._env_.API_URL}/count_check`, {
      Id_event: Id_event,
    }).then((res) => { 
      console.log(res.data.length); 
      // check_H = [];
      if(res.data.length == 0 ){
        alert('ไม่มีข้อมูล')
      }
      for(var i = 0 ; i < res.data.length; i++){  
        check_H[i] = res.data.massage[i];
      }
      console.log(" = " , check_H)
      // Axios.post("${window._env_.API_URL}/Check_hash", { 
      //       id : check_H[2].id,
      //       vote : check_H[2].Vote,
      //       hash : check_H[2].hash_vote,
      //       p_hash : check_H[2].P_hash,
      //       date : check_H[2].Date_vote,
      //       time : check_H[2].Time_vote,
      //    }).then((res) => {
      //     alert("ok")
      //    })
      var aaaa = 0;
      for(var ii = 0 ; ii < res.data.length;ii++){  
        if(aaaa == 0){
            Axios.post(`${window._env_.API_URL}/Check_hash`, { 
              id : check_H[ii].id,
              vote : check_H[ii].Vote,
              hash : check_H[ii].hash_vote,
              p_hash : check_H[ii].P_hash,
              date : check_H[ii].Date_vote,
              time : check_H[ii].Time_vote,
          }).then((res) => {
            console.log(res) 
            if(Check_Sub == 0){
              if(res.data.massage == 'ok'){
                setSub(0);
                setSub2(1);
              } else {  
                setData_wrong(res.data.id) 
                Check_Sub++;  
                Check_S();
              } 
            } 
          }) 
        } 
      }
    });
  }

  const Check_S = (Check) => {
    setSub(1);
    setSub2(1);
    setSub3(0);
    Axios.post(`${window._env_.API_URL}/Event_wrong`,{
      Id_event: Id_event,
    }).then((res) => { 
      // window.location("/MainAdmin/Event")
    }) 
    console.log("data == " , data_wrong); 
    alert("โมฆะ")
    // window.location("/MainAdmin/Event")
  }
  

  return (
    <div>
      <Navmas_staff head={event_name}  role={login} />  
    <div className="Mainadmin"> 
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
        >
          <Row>
            <Col>การเลือกตั้ง = {event_name}</Col>
            <Col>
              เวลาเริ่ม = {event_start} - เวลาจบ = {event_end}
            </Col>
          </Row>
        </Card.Header>
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
                    <Column title="คะแนน" dataIndex="Vote" key="Vote" />
                  </Table>
                </Container>

                <Row>
                  <Col>
                    <h4>รายละเอียดการเลือกตั้ง  </h4>
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
          </Col>
        </Row>
        <Row> 
          <Col>
            <Button
              id="button_full_o" 
              disabled = {0}
              href = "/MainStaff/historyevent/detail/detail2"
              style={{ margintop: 50, width: "95%" }}
            >
              หน้าต่อไป
            </Button>{" "}
          </Col>
        </Row>
      </div>
    </div>
  </div>
  );
}

export default StaffDetail;
