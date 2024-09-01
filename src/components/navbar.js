import React,{useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Adminlogin, user_Login } from '../Service/api';

export default function Navbar() {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/');
    };

    const getNavLinkClass = (path) => (
        pathname === path ? 'nav-link active fw-bold' : 'nav-link'
    );
    const checkUser=async ()=>{
        try {
            const userType=localStorage.getItem('userType')
            if(userType==='admin')
            {
              const data=await  Adminlogin(localStorage.getItem('email'),localStorage.getItem('password'))
              if(data)
              {
                navigate('/admin/new-application');
              }
            }else if(userType==='user')
            {
                const data=await user_Login(localStorage.getItem('email'),localStorage.getItem('password'))
                if(data)
                    {
                        navigate("/user/jobs")
                    }
            }
        } catch (error) {
            localStorage.clear()
            console.log(error);
            
        }
    }
    useEffect(()=>{
        checkUser()
    },[])

    return (
        // <div className='container'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {localStorage.length === 0 && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/')} to="/">
                                        User
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/admin-login')} to="/admin-login">
                                        Admin
                                    </Link>
                                </li>
                            </ul>
                        )}
                        
                        {localStorage.getItem("userType") === "user" && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/user/jobs')} to="/user/jobs">
                                       New Job
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/user/past-application')} to="/user/past-application">
                                       Past application
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {localStorage.getItem("userType") === "admin" && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/admin/new-application')} to="/admin/new-application">
                                        New application
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/admin/new-job')} to="/admin/new-job">
                                       Create new jobs
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className={getNavLinkClass('/admin/existing-job')} to="/admin/existing-job">
                                        Existing job
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link className={getNavLinkClass('/admin/allpast-application')} to="/admin/allpast-application">
                                        Past application
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className={getNavLinkClass('/all_prescription')} to="/all_prescription">
                                        Add admin
                                    </Link>
                                </li> */}
                            </ul>
                        )}
                    </div>
                    {localStorage.length !== 0 && (
                        <button type="button" className="btn btn-danger" onClick={handleLogOut}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>
        // </div>
    );
}
