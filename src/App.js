import "./App.css";
import { Button} from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/Home";
import Result from "./Result/Result";
import Detail from "./Result/Detail";
import Statistics from "./Result/Statistics";
import Main from "./Admin/Main";
import Eventcreate from "./Admin/Eventcreate"; 
import Eventmanage from "./Admin/Eventmanage"; 
import Submit from "./Admin/Submit"; 
import Usermain from "./Admin/Usermain" 
import Addcandidate from "./Admin/Addcandidate";
import Addcandidateedit from "./Admin/Addcandidateedit";
import Adduser from "./Admin/Adduser" 
import EditEvent from "./Admin/EditEvent"; 
import Eventstat from "./Admin/Eventstat"; 
import Approve from "./Admin/Approve"; 
import DeleteCan from "./Admin/DeleteCan";
// import Usermain  from "./User/Usermain";
import Election from "./User/Election";
import Result_user from "./Admin/Result_user";
import StaffCreate from "./Admin/StaffCreate";
import Eventmain from "./Admin/Eventmain";
import Usermanage from "./Admin/Usermanage";
import Testimage from "./Home/Testimage";   
import UserNamelist from './Admin/UserNamelist'; 
import Navmas from './Navmaster/Navmas';
import Useraddlist from './Admin/Useraddlist';
import Eventaddrole from "./Admin/Eventaddrole";
import Eventsum from "./Admin/Eventsum";
import Eventedit from "./Admin/Eventedit";
import Usermain_E from "./User/Usermain_E";
import EventDetail from "./Admin/EventDetail";
import Staffmain from "./Staff/Staffmain";
import Staffevent from './Staff/Staffevent';
import Staffhistory from './Staff/Staffhistory';
import Staffsum from "./Staff/Staffsum";
import ParDetail from "./Result/ParDetail"; 
import StaffDetail from "./Staff/StaffDetail";
import Adminmanage from "./Admin/Adminmanage"; 
import EventDetail3 from "./Admin/EventDetail3";
import EventDetail2 from "./Admin/EventDetail2";
import StaffDetail3 from './Staff/StaffDetail3';
import StaffDetail22 from './Staff/StaffDetail2';
import Addcandidatestaff from './Staff/Addcandidatestaff';

 

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/Result" element={<Result />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/MainAdmin" element={<Main/>} /> 

        <Route path="/MainAdmin/Event" element={<Eventmain/>} />
        <Route path="/MainAdmin/Event/EventManagement/EventCreate" element={<Eventcreate/>} />
        <Route path="/MainAdmin/Event/EventManagement/EditEvent" element={<Eventedit/>} />
        <Route path="/MainAdmin/Event/EventManagement" element={<Eventmanage/>} /> 
        <Route path="/MainAdmin/Event/EventManagement/EventCreate/AddRole" element={<Eventaddrole/>} />
        <Route path="/MainAdmin/Event/EventManagement/EventCreate/AddRole/Eventsum" element={<Eventsum/>} />
        <Route path="/MainAdmin/Event/EventManagement/EventCreate/AddRole/Eventsum/AddCandidate" element={<Addcandidate/>} /> 
        <Route path="/MainAdmin/Event/EventManagement/EditEvent/Addcandidate" element={<Addcandidateedit/>} />
         

        <Route path="/adminmanage" element={<Adminmanage/>} /> 

        <Route path="/Submit" element={<Submit/>} /> 
        <Route path="/MainAdmin/Usermain" element={<UserNamelist/>} />
        <Route path="/MainAdmin/Usermain/NameListuser" element={<UserNamelist/>} /> 
        <Route path="/MainAdmin/Usermain/UserAdlist" element={<Useraddlist/>} />
        {/* <Route path="/MainAdmin/Usermain/UserManage/StaffCreate" element={<Adduser/>} /> */}
        <Route path="/MainAdmin/Usermain/NameListuser/UserAdlist" element={<Useraddlist/>} />

        <Route path="/MainStaff" element={<Staffmain/>} />   
        <Route path="/MainStaff/Eventmanage" element={<Staffevent/>} />   
        <Route path="/MainStaff/Eventmanage/EditEvent" element={<Staffsum/>} />   
        <Route path="/MainStaff/historyevent" element={<Staffhistory/>} />   
        <Route path="/MainStaff/historyevent/detail" element={<StaffDetail/>} />   
        <Route path="/MainStaff/historyevent/detail/detail2" element={<StaffDetail22/>} />   
        <Route path="/MainStaff/historyevent/detail/detail2/detail3" element={<StaffDetail3/>} />   
        <Route path="/MainStaff/Eventmanage/EditEvent/Addcandidatestaff"  element={<Addcandidatestaff/>} />   


        <Route path="/Result/detail" element={<ParDetail/>} />   

 


        <Route path="/MainAdmin/Event/Eventstat" element={<Eventstat/>} />   
        <Route path="/MainAdmin/Event/Eventstat/detail/detail2/detail3" element={<EventDetail3/>} />   
        <Route path="/MainAdmin/Event/Eventstat/detail/detail2" element={<EventDetail2/>} />   
        <Route path="/MainAdmin/Event/Eventstat/detail" element={<EventDetail/>} />   

 

        <Route path="/Adduser" element={<Adduser/>} />   
        <Route path="/MainAdmin/Event/EditEvent" element={<EditEvent/>} />  
        <Route path="/DeleteCan" element={<DeleteCan/>} />  
        <Route path="/Approve" element={<Approve/>} />  
        <Route path="/Usermain" element={<Usermain_E/>} />   
        <Route path="/Election" element={<Election/>} />   
        <Route path="/Result_user" element={<Result_user/>} />   
        <Route path="/MainAdmin/Staff/StaffCreate" element={<StaffCreate/>} />   
        <Route path="/Testimage" element={<Testimage/>} />    

        
 

      </Routes>
    </div>
  ); 

  function Error() {
    return (
      <div>
        <nav>
          <ul>
            <Navmas></Navmas>
            <Link to="/aaa">Home</Link>
          </ul>
        </nav>
      </div>
    );
  }
}
export default App;
