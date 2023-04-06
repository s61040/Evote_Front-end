import React, { Component } from 'react'
import { Space, Table, Tag ,Input  } from "antd";
import {  InputGroup,  FormControl,  Navbar,  Nav, Button , Container} from "react-bootstrap";
import  './CssResults/Statistics.css';


const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;
 const data = [
  {
    key: '1',
    Name: 'kmutnb',
    Winer: 3,
    Point: 20,
    User: 1000,
    Use: 800,
    Per: '80%'  
  },
  {
    key: '2',
    Name: 'Sport',
    Winer: 2,
    Point: 158,
    User: 1000,
    Use: 800,
    Per: '80%'  

 
  },
  {
    key: '3',
    Name: 'Music',
    Winer: 1,
    Point: 200,
    User: 1000,
    Use: 800,
    Per: '80%'  

  },
];


class Statistics extends Component {
  render() {
    return (
        <div>
             <header className='HeaderStat'>
                <h1>Election Statistics</h1>
            </header>
            <div>
           
            <Container>
              <Table dataSource={data}>
                <Column title="ครั้งที่" dataIndex="Name" key="Name" />
                <Column title="Name" dataIndex="Name" key="Name" />
                <Column title="Winer" dataIndex="Winer" key="Winer" />
                <Column title="Point" dataIndex="Point" key="Point" />
                <Column title="User" dataIndex="User" key="User" />
                <Column title="Use" dataIndex="Use" key="Use" />
                <Column title="Per" dataIndex="Per" key="Per" /> 
              </Table>
              <div classname = 'displayButton' >
                <Button
                  href="/"
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 300 }}
                >
                  Home
                </Button>
                <Button
                  href="/Result"
                  variant="primary"
                  type="submit"
                  style={{ width: 200, marginLeft: 200 }}
                >
                  Back
                </Button>
              </div>
            </Container>
          </div>
        </div>
    )
  }
}

export default Statistics;
