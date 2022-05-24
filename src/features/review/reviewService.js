import axios from "axios";
//api route that i want to call
const API_URL = `${process.env.REACT_APP_API_ROOT_URL}/api/review/`;
//getReviews
const getReviews = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
//add review
const addReview = async (review, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + "add-review", review, config);
    return response.data;
};
//export all these functions
const reviewService = {
    getReviews,
    addReview
};
export default reviewService;