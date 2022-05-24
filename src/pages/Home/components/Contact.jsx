import { MDBCol, MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit"

const Contact = () => {
    return (
        <MDBCol size="12" md="8" lg="4" className="mx-auto">
            <h5 className="text-center text-dark">Contact Us</h5>
            <div className="form">
                <MDBInput type="text" label="Name" className="mb-2" />
                <MDBInput type="email" label="Email Address" className="mb-2" />
                <MDBTextArea rows={4} label="Subject" className="mb-3" />
                {/* submit btn */}
                <MDBBtn block color="success" className="rounded-0">Submit</MDBBtn>
            </div>
        </MDBCol>
    )
}

export default Contact