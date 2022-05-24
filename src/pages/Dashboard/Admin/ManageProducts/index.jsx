import { MDBRow, MDBCol } from "mdb-react-ui-kit"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingSpinner from "../../../../common_components/LoadingSpinner"
import SingleToolCard from "../../../../common_components/SingleToolCard"
import { getToolList } from "../../../../features/tool/toolSlice"
const ManageProducts = () => {
    //get initial state from order store
    const { toolList, isLoading, isError } = useSelector(
        (state) => state.tool
    );
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getToolList())
    }, [])
    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isError) {
        return <h4>Some error occured.</h4>
    }
    return (
        <div className="manage-products">
            <h5>Manage Products</h5>
            <MDBRow className="gy-4">
                {toolList && toolList.map((i, index) => {
                    return <MDBCol size="12" lg="4" xxl="3" key={index}>
                        <SingleToolCard {...i} admin />
                    </MDBCol>
                })}
            </MDBRow>
        </div>
    )
}

export default ManageProducts