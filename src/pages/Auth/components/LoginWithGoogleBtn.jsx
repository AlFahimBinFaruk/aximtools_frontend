import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../../../features/user/userSlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext";
const LoginWithGoogleBtn = () => {
    let { setShowAlert } = useGlobalAlertContext();
    const dispatch = useDispatch();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    //handleLoginWithGoogle
    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const user = result.user;
                if (user) {
                    const userData = {
                        username: user.displayName,
                        email: user.email,
                    };
                    dispatch(loginWithGoogle(userData));
                }
            })
            .catch((error) => {
                // Handle Errors here.
                setShowAlert({ msg: error.message, color: "danger" });
            });
    };
    return (
        <MDBBtn floating className='mx-1' onClick={handleLoginWithGoogle}>
            <MDBIcon fab icon='google' />
        </MDBBtn>
    )
}

export default LoginWithGoogleBtn