import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../../../common_components/LoadingSpinner';
import { getUserList, makeAdmin } from "../../../../features/user/userSlice"
const MakeAdmin = () => {
    //get initial state from order store
    const { userList, isLoading, isError } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserList())
    }, [])

    if (isLoading) {
        return <LoadingSpinner />
    }
    
    return (
        <div className="make-admin">
            <h5>Userlist</h5>
            <div className="user-list overflow-x-scroll ">
                <MDBTable striped>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {userList && userList.map((i, index) => {
                            return (
                                <tr>
                                    <th scope='row'>{index}</th>
                                    <td>{i.username}</td>
                                    <td>{i.email}</td>
                                    <td>
                                        {i.isAdmin
                                            ?
                                            <>
                                                <p> <small>Admin</small></p>
                                            </>
                                            :
                                            <>
                                                <p><small>User</small></p>
                                                <MDBBtn
                                                    size='sm'
                                                    className='rounded-0' color='danger'
                                                    onClick={() => dispatch(makeAdmin(i._id))}
                                                >Make Admin</MDBBtn>
                                            </>}
                                    </td>
                                </tr>

                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    )
}

export default MakeAdmin