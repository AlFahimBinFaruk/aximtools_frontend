import { MDBCol, MDBRow } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import SingleManageOrderCard from "./components/SingleManageOrderCard"
import { getAllOrderList } from "../../../../features/order/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "../../../../common_components/LoadingSpinner"
const ManageOrders = () => {
    //get initial state from order store
    const { orderList, isLoading } = useSelector(
        (state) => state.order
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrderList())
    }, [])

    if (isLoading) {
        return <LoadingSpinner />
    }
    
    return (
        <div className="manage-orders">
            <h5>Manage Orders</h5>
            <div className="order-list">
                <MDBRow className="gy-4">
                    {orderList && orderList.map((i, index) => {
                        return (
                            <MDBCol size="12" md="6" key={index}>
                                <SingleManageOrderCard {...i} />
                            </MDBCol>
                        )
                    })}
                </MDBRow>
            </div>
        </div>
    )
}

export default ManageOrders