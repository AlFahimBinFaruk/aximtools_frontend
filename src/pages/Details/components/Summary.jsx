import { MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit"

const Summary = ({ price, orderQty, setOrderQty }) => {
  return (
    <MDBCard className="rounded-0 shadow">
      <MDBCardBody>
        <h5>Your Order Summary</h5>
        <div className="qty">
          <MDBInput type="number" value={orderQty} onChange={(e) => setOrderQty(e.target.value)} label="Select order quantity:" />
        </div>
        {/* total */}
        <div className="total my-3 text-dark">
          <h6>
            <span className="me-1">Order Total:</span>
            <span>{orderQty}</span>
            <span className="mx-1">X</span>
            <span>${price}</span>
            <span className="ms-1 fw-bold">=${Number(orderQty) * Number(price)}</span>
          </h6>
        </div>

      </MDBCardBody>
    </MDBCard>

  )
}

export default Summary