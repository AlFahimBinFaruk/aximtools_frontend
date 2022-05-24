import { MDBCard, MDBCardBody, MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit"

const Features = () => {
    let features = [
        {
            icon: "truck",
            title: "Fast Delivery"
        },
        {
            icon: "user-tie",
            title: "Good Customer Service"
        },
        {
            icon: "credit-card",
            title: "Easy payment method"
        },
        {
            icon: "retweet",
            title: "Good refund policy"
        }
        ,
        {
            icon: "box-open",
            title: "Good Quality of products"
        }
    ]
    return (
        <div className="business-summary my-5">
            <h4 className="text-center text-dark mb-3">What makes us different from others</h4>
            <MDBRow className="gy-4">
                {features.map((i, index) => {
                    return <MDBCol size="12" md="4" key={index}>
                        <MDBCard className="rounded-0 shadow">
                            <MDBCardBody className="text-center">
                                <MDBIcon fas icon={i.icon} size="4x" />
                                <h5 className="mt-2">{i.title}</h5>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                })}
            </MDBRow>
        </div>
    )
}

export default Features