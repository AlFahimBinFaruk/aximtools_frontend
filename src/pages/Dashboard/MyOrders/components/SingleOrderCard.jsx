import { MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { checkout, deleteOrder } from "../../../../features/order/orderSlice";
import { useGlobalAlertContext } from "../../../../contexts/alertContext"
import { useEffect } from 'react';
import LoadingSpinner from '../../../../common_components/LoadingSpinner';
const SingleOrderCard = ({ _id, productName, price, qty, address, phone, paymentStatus, orderStatus, tranId }) => {
    let { setShowAlert } = useGlobalAlertContext()
    const dispatch = useDispatch();

    //handle checkout
    const handleCheckout = () => {
        if (_id && productName && price && qty) {
            let checkoutDetails = {
                orderId: _id,
                name: productName,
                price,
                qty
            }
            try {
                dispatch(checkout(checkoutDetails))
                setShowAlert({ msg: "Please wait", color: "warning" })
            } catch (error) {
                setShowAlert({ msg: "some error occured", color: "danger" })
            }
        } else {
            setShowAlert({ msg: "provide all info", color: "danger" })
        }
    }

    //get initial state from order store
    const { redirectURL, isLoading, isError } = useSelector(
        (state) => state.order
    );

    //handle delete
    const handleDeleteOrder = (id) => {
        try {
            dispatch(deleteOrder(id))
            setShowAlert({ msg: "order deleted", color: "success" })
        } catch (error) {
            setShowAlert({ msg: "some error occured", color: "danger" })
        }
    }
    useEffect(() => {
        if (redirectURL) {
            console.log("url",redirectURL)
            window.location = redirectURL
        }
    }, [redirectURL])

    if (isLoading) {
        return <LoadingSpinner />
    }
   
    return (
        <MDBCard className='h-100 rounded-0 shadow'>
            <MDBCardBody>
                <h6 className='text-dark'>{productName}</h6>
                <h6><small>Price:${price}</small></h6>
                <h6><small>Ordered Qty:{qty}</small></h6>
                <h6><small>Subtotal:${Number(price) * Number(qty)}</small></h6>
                <h6><small>Address:{address}</small></h6>
                <h6><small>Phone:{phone}</small></h6>
                <h6>
                    <small>Payment status:
                        {paymentStatus == "succeeded" ?
                            <span className='text-dark'>Paid</span>
                            :
                            <span className='text-danger'>Unpaid</span>}
                    </small>
                </h6>
                <h6>
                    <small>Order status:<span className='text-dark'>{orderStatus}</span>
                    </small>
                </h6>
                <div className="mt-3">
                    {paymentStatus == "succeeded" ? <>
                        <h6 className='text-dark'>Trans id: <span className="text-success">{tranId}</span> </h6>
                    </> : <div className='d-flex justify-content-between align-items-end'>
                        {/* pay now */}
                        <MDBBtn
                            size='sm'
                            className='rounded-0'
                            color='success'
                            onClick={handleCheckout}>Pay Now</MDBBtn>
                        {/* cancel order */}
                        <MDBBtn
                            size='sm'
                            className='rounded-0'
                            onClick={() => handleDeleteOrder(_id)}
                            color='danger'>Cancel Order</MDBBtn>
                    </div>}
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}

export default SingleOrderCard