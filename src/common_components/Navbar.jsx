import { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../features/user/userSlice"
import { useGlobalAlertContext } from '../contexts/alertContext';
const Navbar = () => {
    const [showNavSecond, setShowNavSecond] = useState(false);
    let { setShowAlert } = useGlobalAlertContext()
    let navigate = useNavigate()
    const dispatch = useDispatch()
    //get initial state from user store
    const { user } = useSelector(
        (state) => state.user
    );
    //handle logout
    const handleLogout = () => {
        try {
            dispatch(logout())
            setShowAlert({ msg: "logout successful", color: "warning" })
            navigate("/login")
        } catch (error) {
            setShowAlert({ msg: "some error occured", color: "danger" })
        }
    }
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <Link to="/"><MDBNavbarBrand href='#'>Axim Tools</MDBNavbarBrand></Link>
                <MDBNavbarToggler
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavSecond(!showNavSecond)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNavSecond}>
                    <MDBNavbarNav className='ms-auto w-auto'>
                        {user ? <>
                            <MDBNavbarLink >
                                {user?.username}
                            </MDBNavbarLink>
                            <Link to="/dashboard">
                                <MDBNavbarLink active aria-current='page' href='#'>
                                    Dashboard
                                </MDBNavbarLink>
                            </Link>
                            <MDBNavbarLink active aria-current='page' onClick={handleLogout}>
                                <MDBBtn size='sm'>Logout</MDBBtn>
                            </MDBNavbarLink>
                        </> : <>
                            <Link to="/login">
                                <MDBNavbarLink active aria-current='page' href='#'>
                                    Login
                                </MDBNavbarLink>
                            </Link>
                        </>}

                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Navbar