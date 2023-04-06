import React, { Component } from 'react' 
import "./Css/Submit.css"; 
import { Space, Table, Tag ,Input  } from "antd";
import "antd/dist/antd.css";
import {  InputGroup,  FormControl,  Navbar,  Nav, Button , Container} from "react-bootstrap";


const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;
 const data = [
  {
    key: '1',
    Name: 'kmutnb', 
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    Name: 'Sport', 
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    Name: 'Music',
    firstName: 'Joe',
    lastName: 'Black', 
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export class Submit extends Component {
  render() {
    return (
      <div>
         <header id="Headermain">
          <h1 id = 'main'> Election </h1>


          <div id = 'Number'>
            <p>..............</p>
            <a href="/">Logout</a>
          </div> 
        </header>
        <div>
            <Search   
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              style={{
                width: 304,
                marginLeft: 1000,
                paddingTop: 20
              }}
              onSearch={onSearch}
            />
            
            <Container style={{ padding: 20 }}>
              <Table dataSource={data}>
                <Column title="Name" dataIndex="Name" key="Name" /> 
                <Column
                  title="Action"
                  key="action"
                  render={(_, record) => (
                    <Space size="middle">
                      <a href="/Approve">Detail</a>
                    </Space>
                  )}
                />
              </Table>
              <div style={{ display: "flex" }}>
                <Button
                  href="/"
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 200 }}
                >
                  Home
                </Button>
                <Button
                  href="/Statistics"
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 500 }}
                >
                  Statistics
                </Button>
              </div>
            </Container>
          </div>
        </div> 
    )
  }
}
export default Submit;
