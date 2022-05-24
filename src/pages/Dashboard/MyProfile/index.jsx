import { MDBBtn, MDBCol } from "mdb-react-ui-kit"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../common_components/LoadingSpinner"
import { updateAccount,logout } from "../../../features/user/userSlice";
import { useGlobalAlertContext } from "../../../contexts/alertContext"
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
    let navigate=useNavigate()
    let { setShowAlert } = useGlobalAlertContext()
    const [formData, setFormData] = useState({
        username: "",
        email: ""
    });

    const { username, email } = formData;

    //handle change of input
    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    //get initial state from tool store
    const { user, isLoading, isError } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch()

    const handleUpdate = () => {
        let data = {
            username: username || user.username,
            email: email || user.email
        }
        try {
            dispatch(updateAccount(data))
            setShowAlert({ msg: "account updated", color: "success" })
            dispatch(logout())
            navigate("/login")
        } catch (error) {
            setShowAlert({ msg: "some error occured", color: "danger" })
        }
    }
    if (isLoading) {
        return <LoadingSpinner />
    }
    
    return (
        <MDBCol size="12" md="8" lg="6" className="mx-auto">
            <h5>Your Profile Info</h5>
            <div className="form">
                {/* email */}
                <div className="email mb-2">
                    <h6>Email Address:{user?.email}</h6>
                    <small>New Email:</small>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your new email address."
                    />
                </div>
                {/* username */}
                <div className="username mb-2">
                    <h6>Username:{user?.username}</h6>
                    <small>New Username:</small>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleChange}
                        placeholder="Enter your new username" />
                </div>
                {/* update btn */}
                <MDBBtn block className="rounded-0" onClick={handleUpdate}>Update</MDBBtn>
            </div>
        </MDBCol>
    )
}

export default MyProfile