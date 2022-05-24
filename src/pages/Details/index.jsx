import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToolDetails } from "../../features/tool/toolSlice";
import { addNewOrder } from "../../features/order/orderSlice"
import { useNavigate, useParams } from 'react-router-dom'
import PaymentForm from './components/PaymentForm'
import ProductDetails from './components/ProductDetails'
import Summary from './components/Summary'
import LoadingSpinner from '../../common_components/LoadingSpinner'
import { useGlobalAlertContext } from "../../contexts/alertContext"
const Details = () => {
    let { id } = useParams();
    let { setShowAlert } = useGlobalAlertContext()
    let navigate = useNavigate();
    //get initial state from user store
    const { user } = useSelector(
        (state) => state.user
    );
    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email,
        phone: "",
        address: ""
    });
    let { phone, address } = formData;

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
        if (toolDetails && phone && address) {
            if (Number(orderQty) > Number(toolDetails.availQty) || Number(orderQty) < Number(toolDetails.minQty)) {
                setShowAlert({ msg: "Qty have to be between minqty and availqty", color: "danger" })
            } else {
                let { name, price } = toolDetails;
                let orderDetails = {
                    productName: name,
                    price,
                    qty: orderQty,
                    address, phone
                }
                try {
                    dispatch(addNewOrder(orderDetails))
                    setShowAlert({ msg: "order added successful", color: "success" })
                } catch (error) {
                    setShowAlert({ msg: "some error occured", color: "danger" })
                }
            }
        } else {
            setShowAlert({ msg: "provide all info", color: "danger" })
        }
    }
    //get initial state from tool store
    const { toolDetails, isLoading, isError } = useSelector(
        (state) => state.tool
    );
    //orderqty
    const [orderQty, setOrderQty] = useState(toolDetails.minQty || 0)
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && user) {
            dispatch(getToolDetails(id))
        }
        else {
            navigate("/login")
        }
    }, [id])

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (isError) {
        return <h4>Some error occured.</h4>
    }
    return (
        <div className="details">
            {toolDetails &&
                <>
                    <MDBRow>
                        <MDBCol size="12" lg="8">
                            <ProductDetails {...toolDetails} />
                        </MDBCol>
                        <MDBCol size="12" lg="4">
                            <Summary price={toolDetails.price} orderQty={orderQty} setOrderQty={setOrderQty} />
                        </MDBCol>
                    </MDBRow>
                    <PaymentForm {...formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                </>}
        </div>
    )
}

export default Details