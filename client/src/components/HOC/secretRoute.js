import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const SecretRoute = ({ component: Component, isLogin , ...rest}) => (
    <Route
      {...rest}
      render={
        (props) => (
            isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location },
            }} />
          )
        )
      }
    />
  );
const mapStatetoProps = state => ({
    isLogin: state.user.isLogIn
});
  export default connect(mapStatetoProps,null)(SecretRoute);