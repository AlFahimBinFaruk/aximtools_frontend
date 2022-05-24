import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    let navigate = useNavigate()
    //get initial state from tool store
    const { user } = useSelector(
        (state) => state.user
    );
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])

    return children
}

export default RequireAuth