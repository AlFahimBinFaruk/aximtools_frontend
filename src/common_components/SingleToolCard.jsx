import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useGlobalAlertContext } from "../contexts/alertContext"
import { deleteTool } from "../features/tool/toolSlice"
const SingleToolCard = ({ _id, name, price, thumbURL, minQty, availQty, shortDesc, admin = false }) => {
    let { setShowAlert } = useGlobalAlertContext();
    let navigate = useNavigate()
    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        try {
            dispatch(deleteTool(id))
            setShowAlert({ msg: "deleted successfully", color: "success" })
        } catch (error) {
            setShowAlert({ msg: "some error occured", color: "danger" })
        }
    }
    return (
        <MDBCard className="shadow rounded-0 h-100">
            <h4>url ={thumbURL}</h4>
            <MDBCardImage className="rounded-0" src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
            <MDBCardBody>
                <h6 className="text-dark">{name}</h6>
                <h6 className="text-muted"><small>{shortDesc}.</small></h6>
                <h6>
                    <small className="text-dark">Per unit price:
                        <span className="text-danger">${price}</span>
                    </small>
                </h6>
                <h6>
                    <small className="text-dark">Minimum order quantity:
                        <span className="text-danger">{minQty}</span>
                    </small>
                </h6>
                <h6>
                    <small className="text-dark">Available order quantity:
                        <span className="text-danger">{availQty}</span>
                    </small>
                </h6>
                {admin ?
                    <>
                        {/*delete product btn */}
                        <MDBBtn block className="mt-3 rounded-0" color="danger" onClick={() => handleDelete(_id)}>Delete Product</MDBBtn>
                    </>
                    :
                    <>{/* see details btn */}
                        <MDBBtn block className="mt-3 rounded-0" onClick={() => navigate(`/details/${_id}`)}>See Details</MDBBtn>
                    </>}
            </MDBCardBody>
        </MDBCard>
    )
}

export default SingleToolCard