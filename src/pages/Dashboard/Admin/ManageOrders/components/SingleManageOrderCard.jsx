import { MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { useGlobalAlertContext } from "../../../../../contexts/alertContext"
import { deleteOrder, shipOrder } from "../../../../../features/order/orderSlice"
const SingleManageOrderCard = ({ _id, email, productName, price, qty, address, phone, paymentStatus, orderStatus, tranId }) => {
  let { setShowAlert } = useGlobalAlertContext()
  const dispatch = useDispatch()
  //handleDeleteOrder
  const handleDeleteOrder = async (id) => {
    let confirmDelete = await swal("Are you sure you want to delete this?", {
      buttons: ["cancel", "Do it"],
    });
    if (confirmDelete) {
      try {
        dispatch(deleteOrder(id));
        setShowAlert({ msg: "order deleted", color: "success" })
      } catch (error) {
        setShowAlert({ msg: "some error occured.", color: "danger" })
      }
    }
  }

  //handle shiporder
  const handleShipOrder = (id) => {
    try {
      
      dispatch(shipOrder(id))
      setShowAlert({ msg: "order shipped", color: "success" })
    } catch (error) {
      setShowAlert({ msg: "some error occured.", color: "danger" })
    }
  }
  return (
    <MDBCard className='h-100 rounded-0 shadow'>
      <MDBCardBody>
        <h6>Order id:{_id}</h6>
        <h6>Email :{email}</h6>
        <h6>Phone:{phone}</h6>
        <h6>Order Total:${Number(price) * Number(qty)}</h6>
        <h6>Details:{productName} ,qty:{qty}</h6>
        <h6>Address:{address}</h6>
        <h6>
          Payment Status:
          {paymentStatus == "succeeded" ?
            <>
              <p><span className="text-success">{paymentStatus}</span></p>
              <p><span className="text-dark">Tran Id:{tranId}</span></p>
            </>
            :
            <span className="text-danger">{paymentStatus}</span>}
        </h6>
        <h6>
          Order Status:
          {paymentStatus == "succeeded" ?
            <>
              {orderStatus == "shipped" ?
                <span className="text-warning">Shipped</span>
                :
                <span className="text-warning">Pending</span>}
            </>
            :
            <span className="text-danger">Unpaid</span>}
        </h6>
        {paymentStatus == "succeeded" ?
          <>
            {orderStatus == "pending"
              &&
              <MDBBtn block color='success' className='rounded-0' onClick={() => handleShipOrder(_id)}>
                Ship Order
              </MDBBtn>}
          </>
          :
          <>
            <MDBBtn block color='danger' className='rounded-0' onClick={() => handleDeleteOrder(_id)}>
              Cancel Order
            </MDBBtn>
          </>}
      </MDBCardBody>
    </MDBCard>
  )
}

export default SingleManageOrderCard