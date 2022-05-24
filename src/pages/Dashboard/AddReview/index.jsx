import { MDBBtn, MDBCol, MDBTextArea } from 'mdb-react-ui-kit'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGlobalAlertContext } from '../../../contexts/alertContext'
import { addReview } from "../../../features/review/reviewSlice"
const AddReview = () => {
    let { setShowAlert } = useGlobalAlertContext()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        ratings: "",
        desc: "",
    });

    const { ratings, desc } = formData;

    //handle change of input
    const handleChange = (e) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    //handle submit
    const handleSubmit = () => {
        if (ratings && desc) {
            let review = {
                ratings,
                desc
            }
            try {
                dispatch(addReview(review))
                setShowAlert({ msg: "review added", color: "success" })
            } catch (error) {
                setShowAlert({ msg: "some error occured", color: "danger" })
            }
        } else {
            setShowAlert({ msg: "provide all info", color: "danger" })
        }
    }
    return (
        <MDBCol size="12" md="8" lg="6" className="add-review mx-auto">
            <h5>Add a review.</h5>
            <div className="form">
                {/* ratings */}
                <div className="ratings mb-2">
                    <small>Select Your Ratings:</small>
                    <select
                        className="form-select"
                        id="ratings"
                        aria-label="Default select example"
                        onChange={handleChange}>
                        <option value="1-ok">1-ok</option>
                        <option value="2-good">2-Good</option>
                        <option value="4-best">4-Best</option>
                        <option value="5-excellent">4-Excellent</option>
                    </select>
                </div>
                {/* desc */}
                <MDBTextArea
                    rows={4}
                    id="desc"
                    value={desc}
                    onChange={handleChange} label="Review Description." className='mb-3' />
                {/* submit */}
                <MDBBtn block className='rounded-0' onClick={handleSubmit}>Submit Review</MDBBtn>
            </div>
        </MDBCol>
    )
}

export default AddReview