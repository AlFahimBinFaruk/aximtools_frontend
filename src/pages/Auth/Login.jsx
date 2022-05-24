import { useEffect, useState } from 'react';
import {
    MDBInput,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
import LoadingSpinner from '../../common_components/LoadingSpinner';
import LoginWithGoogleBtn from './components/LoginWithGoogleBtn';
//alert context
import { useGlobalAlertContext } from "../../contexts/alertContext"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//
import { login, reset } from "../../features/user/userSlice"

const Login = () => {
    let { setShowAlert } = useGlobalAlertContext()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    //handle change of input
    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //get initial state from user store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.user
    );

    //handle submit
    const handleSubmit = () => {
        //see if user provided all info
        if (email && password) {
            //see if passwords match
            const userData = {
                email,
                password,
            };
            dispatch(login(userData));
        } else {
            setShowAlert({ msg: "Provide all info", color: "danger" });
        }
    };

    //listen for change
    useEffect(() => {
        //if there are error
        if (isError) {
            setShowAlert({
                msg: message,
                color: "danger",
            });
        }

        //if login is successfull
        if (isSuccess) {
            setShowAlert({
                msg: "login successful",
                color: "success",
            });
            navigate(from, { replace: true });
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, setShowAlert]);

    //if the page is loading
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <MDBCol size="12" md="6" lg="4" className="mx-auto vh-100">
            <h6 className='text-center mb-3'>Login to get started.</h6>
            {/* email */}
            <MDBInput
                className='mb-2'
                type='email'
                id='email'
                value={email}
                onChange={handleChange}
                label='Email address'
                required />
            {/* password */}
            <MDBInput
                className='mb-3'
                type='password'
                id='password'
                value={password}
                onChange={handleChange}
                label='Password'
                required />
            <MDBBtn type='submit' onClick={handleSubmit} className='mb-4' block>
                Login
            </MDBBtn>
            <div className='text-center'>
                <p>
                    Not a member? <Link to="/register">
                        Register
                    </Link>
                </p>
                <p>or Login with:</p>
                <LoginWithGoogleBtn />
            </div>
        </MDBCol>
    )
}

export default Login