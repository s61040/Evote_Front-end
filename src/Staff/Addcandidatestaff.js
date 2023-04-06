import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Card,
  InputGroup,
  FormControl,
  Button,
  Form,
  Col,
  Row,
  Container,
} from "react-bootstrap";
import "./Css/Addcandidate.css";
import Navmas from "../Navmaster/Navmas";
import Navmas_staff from './../Navmaster/Navmas_staff';

function Addcandidatestaff() {
  const navi = useNavigate();
  const [nameevent, setNameevent] = useState([]);
  const [url, setUrl] = useState([]);

  const [postImage, setPostImage] = useState({
    imagStr: "",
    fileName: "",
  });

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [detailc, setDetailc] = useState([]);
  const [namec, setNamec] = useState([]);
  const [candidatelist, setCandidatelist] = useState([]);
  const [totalcandidate, setTotalcandidate] = useState(0);
  const [login, setLogin] = useState([]);

  const name_can = localStorage.getItem("namecandidate");
  const surname_can = localStorage.getItem("Surnamecandidate");
  const getname = localStorage.getItem("event");
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");

  useEffect(() => {
    prepare_candidatele();
    check_authen();
  }, []);

   const check_authen = () => {
    Axios.post("http://localhost:3001/authen", {
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

   
  const prepare_candidatele = (e) => {
    Axios.post("http://localhost:3001/Resulcan", {
      getname: getname,
    }).then((res) => {
      setTotalcandidate(res.data.candidatelength);
      console.log(res.data.massage);
      console.log("data.candidate");
    });
  };

  const Naviback = () => {
    window.location = "/MainStaff/Eventmanage/EditEvent";
  };

  //upload img
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileNameWithType = e.target.files[0].name;
    const fileName = fileNameWithType.split(".")[0];
    const type = fileNameWithType.split(".")[1]; 
    if (type === "png") {
      setuserInfo({
        ...userInfo,
        file: e.target.files[0],
        filepreview: URL.createObjectURL(e.target.files[0]),
      }); 
      const base64 = await convertToBase64(file);
      setPostImage({ ...postImage, imagStr: base64, fileName: fileName }); //update Img
    } else {
      console.error("รับเฉพาะ ไฟล์ png เท่านั้น");
    }
  };

  //แปลงรูปเป็น base 64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //กด submit เพื่อา่งรูป
  const handleSubmit = (e) => { 
    e.preventDefault();
    if (postImage.fileName !== "" || postImage.imagStr !== "") {
      callApiSaveImg(postImage);
    }
  };

  const callApiSaveImg = (e) => {
    try{
      console.log(postImage)
      if (getname.length > 0 && detailc.length > 0) {
        console.log("resp.data");
        // const formdata = new FormData();
        // formdata.append("avatar", userInfo.file);
        Axios.post(`http://localhost:3001/upload`, postImage)
          .then((res, err) => {
            if (res.data.massage == "Uploadimagefailed.") {
              alert("Check candidate Name");
            } else if(res.data.massage == "Upload"){
              console.log("name post == " , postImage.fileName)
              Axios.post(`http://localhost:3001/createcandidate`, {
                totalcandidate: totalcandidate,
                getname: getname,
                name_can: name_can,
                surname_can: surname_can,
                detailc: detailc,
                img : postImage.fileName ,
              }).then((res, err) => {
                if (res.data.massage == "FailCandidate") {
                  alert("Dupplicate Candidate");
                } else if(res.data.massage == "insertsubmit"){
                  setCandidatelist([
                    ...candidatelist,
                    {
                      totalcandidate: totalcandidate,
                      getname: getname,
                      name_can: name_can,
                      surname_can: surname_can,
                      detailc: detailc,
                    },
                  ]);
                  setTotalcandidate(res.data.lengthdata);
                  console.log("data", res.data);
                  // alert("Add Candidate");
                  window.location = "/MainStaff/Eventmanage/EditEvent";
                } else {
                  alert("DataCheck")
                }
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log(getname.length, detailc.length, userInfo.length);
        alert("dupplicate");
      }
    }catch(err){
      console.log("callApiSaveImg " )
    } 
  };

  return (
    <div>
      <Navmas_staff head={"Staff Add Candidate"} role={login} />
      <div className="Addcan">
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
            >
              การเพิ่มรายชื่อผู้ลงสมัครการเลือกตั้ง
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> ผู้ลงสมัครในการเลือกตั้ง </p>
                <footer className="blockquote-footer">
                  การเลือกตั้ง <cite title="Source Title">{getname}</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
          <Form id="fromcan">
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>ชื่อผู้ลงสมัคร</h3>
                  <Form.Control
                    type="email"
                    value={name_can}
                    disabled={true}
                    placeholder="Candidate"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <h3>นามสกุลผู้ลงสมัคร</h3>
                  <Form.Control
                    type="email"
                    value={surname_can}
                    placeholder="Candidate"
                    disabled={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <h3>รายละเอียดผู้ลงสมัคร</h3>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setDetailc(e.target.value);
                }}
              />
            </Form.Group>
            <h3>แสดงรูปภาพ</h3>
            <div>
              {/* <input type="file" onChange={handleFileUpload} /> */}
              <input
                type="file"
                label="Image"
                name="myFile"
                accept="image/png"
                onChange={(e) => handleFileUpload(e)}
                // onClick={(e) => handleSubmit()}
              />
            </div>
            {/* <img id="imgcan" src={require("../image/ResultsDetail/d3.png")} />
             */}
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
            <br />
            <br />
            <Row>
              <Col>
                <Button
                  id="button_h_o"
                  onClick={Naviback}
                  variant="outline-secondary"
                >
                  กลับ
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-secondary"
                  id="button_h_o"
                  onClick={handleSubmit}
                >
                  เพิ่มผู้ลงสมัคร
                </Button>{" "}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}
export default Addcandidatestaff;
