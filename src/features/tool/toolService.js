import axios from "axios";
//api route that i want to call
const API_URL = `${process.env.REACT_APP_API_ROOT_URL}/api/tool/`;

//getToolList
const getToolList = async () => {
    const response = await axios.get(API_URL + "tool-list");
    //retrun response
    return response.data;
};

//getToolDetails
const getToolDetails = async (id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    //get tool details
    const response = await axios.get(API_URL + "tool-details/" + id, config);
    //return response
    return response.data;
};

//add tool
const addTool = async (tool, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    //add new tool
    const response = await axios.post(API_URL + "add-tool", tool, config);
    //return response
    return response.data;
};

//delete tool
const deleteTool = async (id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    //delete tool
    const response = await axios.delete(API_URL + "delete-tool/" + id, config);
    //return response
    return response.data;
};

//export toolService
const toolService = {
    getToolList,
    getToolDetails,
    addTool,
    deleteTool
};

export default toolService;