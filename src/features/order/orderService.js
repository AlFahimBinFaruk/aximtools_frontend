import axios from "axios";
//api route that i want to call
const API_URL = `${process.env.REACT_APP_API_ROOT_URL}/api/order/`;

//getAllOrderList
const getAllOrderList = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "admin-order-list", config);
    //retrun response
    return response.data;
};

//getMyOrderList
const getMyOrderList = async (token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + "my-order-list", config);
    //retrun response
    return response.data;
};


//add new order
const addNewOrder = async (orderDetails, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    //add new tool
    const response = await axios.post(API_URL + "add-new-order", orderDetails, config);
    //return response
    return response.data;
};

//checkout
const checkout = async (checkoutDetails, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    //add new tool
    const response = await axios.post(API_URL + "checkout", checkoutDetails, config);
    //return response
    return response.data;
};

//delete order
const deleteOrder = async (id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    //delete tool
    const response = await axios.delete(API_URL + "delete-order/" + id, config);
    //return response
    return response.data;
};

//ship order
const shipOrder = async (id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };

    //ship order
    const response = await axios.get(API_URL + "ship-order/" + id, config);
    // //return response
    return response.data;
};

//export order service
const orderService = {
    getAllOrderList,
    getMyOrderList,
    addNewOrder,
    checkout,
    deleteOrder,
    shipOrder
};

export default orderService;