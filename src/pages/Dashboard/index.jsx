import { useEffect, useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import MyOrders from './MyOrders';
import AddReview from './AddReview';
import MyProfile from './MyProfile';
import AddProduct from './Admin/AddProduct';
import ManageProducts from './Admin/ManageProducts';
import ManageOrders from './Admin/ManageOrders';
import MakeAdmin from './Admin/MakeAdmin';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    let navigate = useNavigate()
    const [verticalActive, setVerticalActive] = useState('my-profile');

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }

        setVerticalActive(value);
    };

    //get initial state from tool store
    const { user } = useSelector(
        (state) => state.user
    );
    

    return (
        <>
            <MDBRow>
                <MDBCol size='12' md="2">
                    <MDBTabs className='flex-column text-center'>
                        {user && user.isAdmin == true ? <>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleVerticalClick('add-product')} active={verticalActive === 'add-product'}>
                                    Add a product
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleVerticalClick('manage-products')} active={verticalActive === 'manage-products'}>
                                    Manage Products
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleVerticalClick('manage-orders')} active={verticalActive === 'manage-orders'}>
                                    Manage all orders
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleVerticalClick('make-admin')} active={verticalActive === 'make-admin'}>
                                    Make Admin
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </> : <>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleVerticalClick('my-orders')} active={verticalActive === 'my-orders'}>
                                    My Orders
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleVerticalClick('add-review')} active={verticalActive === 'add-review'}>
                                    Add A Review
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </>}
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleVerticalClick('my-profile')} active={verticalActive === 'my-profile'}>
                                My Profile
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                </MDBCol>
                <MDBCol size='12' md="10">
                    <MDBTabsContent>
                        <MDBTabsPane show={verticalActive === 'add-product'}>
                            <AddProduct />
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'manage-products'}>
                            <ManageProducts />
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'manage-orders'}>
                            <ManageOrders />
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'make-admin'}>
                            <MakeAdmin />
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'my-orders'}>
                            <MyOrders />
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'add-review'}>
                            <AddReview />
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === 'my-profile'}>
                            <MyProfile />
                        </MDBTabsPane>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default Dashboard