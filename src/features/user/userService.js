import axios from "axios";

//api route that i want to call
const API_URL = `${process.env.REACT_APP_API_ROOT_URL}/api/user/`;

//getUserList 
const getUserList = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "user-list", config);
    return response.data;
};


//register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    //if we get data in response we will save it to localstorage
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

//login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    //if we get data in response we will save it to localstorage
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

//login with google
const loginWithGoogle = async (userData) => {
    const response = await axios.post(API_URL + "login-with-google", userData);
    //if we get data in response we will save it to localstorage
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

//make admin
const makeAdmin = async (id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "make-admin/" + id, config);
    return response.data;
};

//updateAccount
const updateAccount = async (data, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + "update-account", data, config);
    return response.data;
};

//logout user
const logout = () => {
    localStorage.removeItem("user");
};

//export all these functions
const userService = {
    getUserList,
    register,
    login,
    logout,
    loginWithGoogle,
    makeAdmin,
    updateAccount
};

export default userService;