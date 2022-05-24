import { MDBCol, MDBRadio, MDBBtn, MDBInput, MDBTextArea } from 'mdb-react-ui-kit'
import { useState } from 'react';

const PaymentForm = ({ username, email, phone, address, handleChange, handleSubmit }) => {

    return (
        <MDBCol size="12" md="8" lg="6" className="mx-auto my-5">
            <h6 className="text-dark text-center">Please Fill The Form</h6>
            <div className="form">
                {/* name */}
                <div className="name mb-2">
                    <small>Username:</small>
                    <MDBInput
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                {/* email */}
                <div className="email mb-2">
                    <small>Email:</small>
                    <MDBInput
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                {/* phone */}
                <div className="phone mb-2">
                    <small>Phone:</small>
                    <MDBInput
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handleChange}
                        placeholder='Enter your phone number'
                    />
                </div>
                {/* address */}
                <div className="address mb-2">
                    <small>Address:</small>
                    <MDBTextArea
                        rows={4}
                        id="address"
                        value={address}
                        onChange={handleChange}
                        placeholder="Enter your full address"
                    />
                </div>

                {/* place order btn */}
                <MDBBtn block color="warning" onClick={handleSubmit} className="rounded-0 mt-2">Place Order</MDBBtn>
            </div>
        </MDBCol>
    )
}

export default PaymentForm