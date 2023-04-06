import { React, Component, useState, setState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./CssResults/Detail.css";
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
 
  function Detail() {
    const [login, setLogin] = useState([]);
  const authen = localStorage.getItem("user");
  const tokenC = localStorage.getItem("token");
  const Id_event = localStorage.getItem("id_event");
  const par_taotal = localStorage.getItem("no.par");
  const V = localStorage.getItem("Vo");

  const [namestaff, setNamestaff] = useState([]);

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

  var img_win = "";
  var check_H = [];
  var Check_Sub = 0;
  var dataTable = [];

  const { Column, ColumnGroup } = Table;
  const [query, setQuery] = useState("");

  const [detail_c, setDetail_c] = useState([]);

    return (
      <div> 
      <div className="Mainadmin">
        <Card>
          <Card.Header>
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
            {thewin_img.map((item) => ( 
              <Card>
              <Card.Header as="h5">The Winner</Card.Header>
              <Card.Body>
                <Container>
                  {/* {thewin_img.map((item) => ( */}
                  <Card.Img
                    variant="top"
                    // src={require("../images/"+thewin_img)}
                    // src={require("../images/" + item.Img)}
                    src={`http://localhost:3001/img/${item.Img}`} 
                  />
                  {/* // ))}  */}
                  <Card.Title>
                    Name : {item.Name} Lastname : {item.Surname}
                  </Card.Title>
                  <Card.Text>Detai {item.Detail}</Card.Text>
                  <Row>
                    <Col>
                      ได้รับคะแนนโหวต = {item.COUNT} / {par_taotal}
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
            ))} 
            </Col>

            <Col>
              <Card>
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
            <Button> เช็คผลการเลือกตั้งของตนเอง </Button>
          </Row> 
        </div>
      </div>
    </div>
    );
  } 
  export default Detail;