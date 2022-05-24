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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//
import { register, reset } from "../../features/user/userSlice"


const Register = () => {
    let { setShowAlert } = useGlobalAlertContext()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { username, email, password } = formData;

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
        if (username && email && password) {
            //see if passwords match
            const userData = {
                username,
                email,
                password,
            };
            dispatch(register(userData));
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

        //if register is successfull
        if (isSuccess) {
            setShowAlert({
                msg: "Register successful",
                color: "success",
            });
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, setShowAlert]);

    //if the page is loading
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <MDBCol size="12" md="6" lg="4" className="mx-auto">
            <h6 className='text-center mb-3'>Register to create a new account.</h6>
            {/* username */}
            <MDBInput
                className='mb-2'
                type='text'
                id='username'
                value={username}
                onChange={handleChange}
                label='Username' />
            {/* email */}
            <MDBInput
                className='mb-2'
                type='email'
                id='email'
                value={email}
                onChange={handleChange}
                label='Email address' />
            {/* password */}
            <MDBInput
                className='mb-3'
                type='password'
                id='password'
                value={password}
                onChange={handleChange}
                label='Password' />
            <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
                Register
            </MDBBtn>
            <div className='text-center'>
                <p>
                    Already a member? <Link to="/login">Login</Link>
                </p>
                <p>or Login with:</p>
                <LoginWithGoogleBtn />
            </div>
        </MDBCol>
    )
}

export default Register