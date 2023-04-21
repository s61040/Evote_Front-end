import { React, Component, useState, setState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Input } from "antd";
import Swal from 'sweetalert2';
import "./CssResults/Result.css";
import "antd/dist/antd.css";
import {
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  Button,
  Container,
} from "react-bootstrap";

const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;
 
var dataTable = [];

function Result() {

  const authen = localStorage.getItem("authen");
  const Id_user = localStorage.getItem("ID");
  const [query, setQuery] = useState("");
  const [clockState, setClockState] = useState();

  var ev = "...";
  var check = false;

  const current = new Date();
  const date2 = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  const navi = useNavigate();


  // Start *----------------------------------------------------------------*

  useEffect(() => {
    showVoted();
    setInterval(() => {
      const dates = new Date();
      setClockState(dates.toLocaleTimeString());
    }, 1000);
  }, []);

    // show event ================================================================

    const Detail = (id_event , par) => {
      Axios.post(`${window._env_.API_URL}/Show_Vote`,{
        id_event : id_event,
      })
      .then((res,err) => { 
        if(res.data.massage == 'ok'){
           localStorage.setItem('id_event',id_event);  
           localStorage.setItem('Vo',res.data.check);  
           localStorage.setItem('no.par',par); 
           localStorage.setItem("Img", res.data.Img); 
           
           Swal.fire({
            title: 'ยืนยันการตรวจสอบผลการเลือกตั้ง', 
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน', 
            confirmButtonColor: '#FF4B2B',
            cancelButtonColor: '#FF4B2B',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              navi('\detail'); 
            } 
          })  
        }
      })
  
     
    } 
    

  // Data Voted =================================================================================

  const showVoted = (e) => {
    Axios.post(`${window._env_.API_URL}/showVoted`,{
      authen : authen,
      Id_user : Id_user,
    })
    .then((res,err) => {
      console.log(res.data.massage); 
      console.log("2 = " ,res.data.massage2); 
      console.log("3 = " ,res.data.massage3); 
      console.log("err = " , err); 
      dataTable = [];
      for (var i = 0; i < res.data.massage.length; i++) {  
        if(res.data.massage[i].status_event == 0){ 
          ev = "กำลังดำเนินการ";
          check = true;
         }
         if(res.data.massage[i].status_event == 4){ 
          ev = "กำลังดำเนินการ";
          check = true;
         }
         if(res.data.massage[i].status_event == 1){ 
          ev = "ยังไม่ยืนยัน";
          check = true;
         } else if(res.data.massage[i].status_event == 2){ 
          ev = "ยืนยันแล้ว";
          check = false;
         } else if(res.data.massage[i].status_event == 3){ 
          ev = "ผิดปกติ";
          check = true;
         } 
        for(var j = 0; j < res.data.massage2.length;j++){
          console.log(res.data.massage2[j].Id_event ,"==  i  ==" , res.data.massage[i].Id_event)
          if(res.data.massage2[j].Id_event == res.data.massage[i].Id_event){
             console.log(res.data.massage2[j].Id_event , "== i ==", res.data.massage[i].Event_name)
              dataTable.push({  
              key: res.data.massage[i].Id_event,
              Name_Event: res.data.massage[i].Event_name,  
              Candidate: res.data.massage3[i].nocan,
              Par: res.data.massage2[j].nopar,
              check : check, 
              Status: ev,
            });
        } 
        }
        console.log("Status == " , ev)
      }
    });
  };
  


  return (
    <div className="main-result">
      <div >
        <header style={{ padding: 20 }}>
          <h1 style={{color: '#FF4B2B'}}>Election Results</h1>
          <h3 style={{color: '#FF4B2B'}}>
            {date2} {clockState}{" "}
          </h3>
        </header> 
        <div>
          <Search
            placeholder="input search text"
            allowClear 
            onChange={(e) => setQuery(e.target.value)}
            size="large"
            style={{
              width: 304,
              marginLeft: 1000,
            }} 
          />
          <Container style={{ padding: 20 }}>
            <Table 
              dataSource={dataTable.filter((item) =>
              item.Name_Event.includes(query)
            )}>
              <Column title="#" dataIndex="key" key="key" />
              <Column
                title="การเลือกตั้ง"
                dataIndex="Name_Event"
                key="Name_Event"
              />
              <Column title="จำนวนผู้สมัคร" dataIndex="Candidate" key="Candidate" />
              <Column title="จำนวนผู้มีสิทธิเลือกตั้ง" dataIndex="Par" key="Par" />
              <Column title="สถานะ การเลือกตั้ง" dataIndex="Status" key="Status" />
              <Column
                title="รายละเอียดของการเลือกตั้ง"
                key="Check"
                render={(_, record) => (
                  <Space size="small">
                    <Button
                      id="button_full_o" 
                      disabled = {record.check} 
                      onClick={() => Detail(record.key, record.Par)}>
                      Detail
                    </Button>
                  </Space>
                )}
              />
            </Table>
            <Button
                id="button_full_o" 
                 href ="/"
                 >
              กลับหน้าแรก
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default Result;
