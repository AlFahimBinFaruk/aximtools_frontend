import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect } from 'react'
import SingleOrderCard from './components/SingleOrderCard'
import { getMyOrderList } from "../../../features/order/orderSlice"
import { useDispatch, useSelector } from 'react-redux'
import LoadingSpinner from '../../../common_components/LoadingSpinner'
const MyOrders = () => {
    const dispatch = useDispatch()
    //get initial state from order store
    const { orderList, isLoading, isError } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        dispatch(getMyOrderList())
    }, []);

    if (isLoading) {
        return <LoadingSpinner />
    }



    return (
        <div className="my-orders">
            <h5 className='mb-3'>My Orders</h5>
            <MDBRow className='gy-4'>
                {orderList && orderList.map((i, index) => {
                    return (
                        <MDBCol size="12" md="6" key={index}>
                            <SingleOrderCard {...i} />
                        </MDBCol>
                    )
                })}
            </MDBRow>
        </div>
    )
}

export default MyOrders