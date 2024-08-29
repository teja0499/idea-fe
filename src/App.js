import './App.css';
import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from './components/alert';
import Login from './components/login';
import Register from './components/register';
import AdminLogin from './components/admin_login';
import Navbar from './components/navbar';
import New_Applications from './components/new_applications';
import Create_Job from './components/create_job';
import Existing_Job from './components/existing_job';
import Past_Application from './components/User/past_application';
import Current_Job from './components/User/current_job';
import All_Past_Application from './components/all_past_application';
import Edit_User_Application from './components/edit_user_application';




function App() {
  const [alert, setAlert] = useState(null);
 
 
  const showAlert = (message, type)=>{
    console.log("hi");
    
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <Router>
      
      {/* <div className="App container my-3 " > */}
          <Navbar showAlert={showAlert}   />
        <Alert alert={alert}/>
        <Routes>
         
          <Route path="/" element={<Login showAlert={showAlert} />} />
          <Route path="/user-register" element={<Register showAlert={showAlert}   />} />
          <Route path="/user/jobs" element={<Current_Job showAlert={showAlert}   />} />
          <Route path="/user/past-application" element={<Past_Application showAlert={showAlert}   />} />


          <Route path="/admin-login" element={<AdminLogin showAlert={showAlert}   />} />
          <Route path="/admin/new-application" element={<New_Applications showAlert={showAlert}   />} />
          <Route path="/admin/new-job" element={<Create_Job showAlert={showAlert}   />} />
          <Route path="/admin/existing-job" element={<Existing_Job showAlert={showAlert}   />} />
          {/* <Route path="/admin/past-application" element={<Past_Application showAlert={showAlert}   />} /> */}
          <Route path="/admin/allpast-application" element={<All_Past_Application showAlert={showAlert}   />} />
          <Route path="/admin/update-user-application" element={<Edit_User_Application showAlert={showAlert}   />} />
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
