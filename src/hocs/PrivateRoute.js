import { Route, Navigate } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({
    element: Element,
    auth: { isAuthenticated, loading },
    ...rest
}) => {
    <Route>
        {...rest}
        render = {props => !isAuthenticated && !loading ?
            (
                <Navigate to='/login' />
            )
            :
            (
                <Element {...props} />
            )
        }
    </Route>
}

const mapStateToProps = state => ({
    auth: state.Auth
})

export default connect(mapStateToProps, {

})(PrivateRoute)