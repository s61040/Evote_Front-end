import React, { Component } from 'react' 
import "./Css/Edit.css";
import { Space, Table, Tag ,Input  } from "antd";
import "antd/dist/antd.css";
import {  InputGroup,  FormControl,  Navbar,  Nav, Button , Container} from "react-bootstrap";


const { Search } = Input;
const onSearch = (value) => console.log(value);
const { Column, ColumnGroup } = Table;
 const data = [
  {
    key: '1',
    Name: 'C', 
    firstName: 'Boy',
    lastName: 'Cosmo', 
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    Name: 'B', 
    firstName: 'Sita',
    lastName: 'Manaja', 
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    Name: 'A',
    firstName: 'Joe',
    lastName: 'Black', 
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];



export class DeleteCan extends Component {
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
               <Column title="firstName" dataIndex="firstName" key="firstName" /> 
               <Column title="lastName" dataIndex="lastName" key="lastName" /> 
               <Column title="address" dataIndex="address" key="address" /> 
               <Column
                 title="Action"
                 key="action"
                 render={(_, record) => (
                   <Space size="middle">
                     <a href="/ ">Delete</a>
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
                 href="/EditEvent"
                 variant="primary"
                 type="submit"
                 style={{ width: 200, marginLeft: 500 }}
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
 

export default DeleteCan
