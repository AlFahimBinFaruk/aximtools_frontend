import { MDBCard, MDBCardBody, MDBIcon } from 'mdb-react-ui-kit'
const Banner = () => {
    return (
        <MDBCard className='my-5 rounded-0 shadow'>
            <MDBCardBody className='d-flex align-items-center justify-content-evenly flex-wrap flex-column-reverse flex-md-row'>
                <div className='col-12 col-md-8 mt-4 mt-md-0'>
                    <h4>AximTools</h4>
                    <p><small>Axim tools is a Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum error, quia atque provident illum saepe. Nesciunt quae rem alias! Ipsum dolorum natus, est temporibus vero a delectus eaque accusantium at quidem mollitia! Placeat.</small></p>
                </div>
                <div>
                    <MDBIcon fas icon="tools" size='6x' />
                </div>
            </MDBCardBody>
        </MDBCard>
    )
}

export default Banner