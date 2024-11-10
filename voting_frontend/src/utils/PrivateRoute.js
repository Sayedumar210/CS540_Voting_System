import { Children } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {
    const isAuthenticated = false
    return(
        <Route {...rest}>{!isAuthenticated ? <Redirect to='/login'/> :  children}</Route>
    )
}

export default PrivateRoute;