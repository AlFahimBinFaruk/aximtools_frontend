import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit"
import { useEffect } from "react"
import { getReviews } from "../../../features/review/reviewSlice"
import { useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "../../../common_components/LoadingSpinner"

const Reviewlist = () => {
    const dispatch = useDispatch();

    //get initial state from review store
    const { reviewList, isLoading, isError } = useSelector(
        (state) => state.review
    );
    
    useEffect(() => {
        dispatch(getReviews())
    }, [])

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (isError) {
        return <h4>Some Error occured</h4>
    }

    return (
        <div className="review-list my-5">
            <h4 className="text-center text-dark mb-3">Customer reviews</h4>
            <MDBRow className="gy-4">
                {reviewList && reviewList.map((i, index) => {
                    return <MDBCol size="12" md="4" xxl="3" key={index}>
                        <MDBCard className="rounded-0 shadow h-100">
                            <MDBCardBody>
                                <div className="d-flex">
                                    <img src="https://mdbootstrap.com/img/new/standard/nature/184.webp" width={50} height={50} alt="" srcset="" className="rounded-circle me-3" />
                                    <div>
                                        <h6 className="text-dark">{i.username}</h6>
                                        <h6><small>{i.createdAt.slice(0, 10)}</small></h6>
                                    </div>
                                </div>
                                <p>Ratings:{i.ratings}</p>
                                <p>{i.desc}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                })}
            </MDBRow>
        </div>
    )
}

export default Reviewlist