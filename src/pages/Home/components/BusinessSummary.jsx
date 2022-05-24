import { MDBCard, MDBCardBody, MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit"

const BusinessSummary = () => {
    let businessSummary = [
        {
            icon: "users",
            title: "1200+ customers"
        },
        {
            icon: "hand-holding-usd",
            title: "120M+ Annual revenue"
        },
        {
            icon: "user-edit",
            title: "33K+ Reviews"
        }
    ]
    return (
        <div className="business-summary my-5">
            <h4 className="text-center text-dark mb-3">Business summary</h4>
            <MDBRow className="gy-4">
                {businessSummary.map((i, index) => {
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

export default BusinessSummary