import { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoggedinRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest}>{user ? <Navigate to='/dashboard'/> :  children}</Route>
    )
}

export default LoggedinRoute;