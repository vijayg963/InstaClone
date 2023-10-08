import {Switch,Route} from 'react-router-dom';
import PageNotFound from './pagenotfound';
import Signin from './signin';
import Signup from './signup';


function UnAuthenticatedApp(){
    return (
        <Switch>
            <Route exact path='/signin' component={Signin} />
            <Route exact path='/signup' component={Signup} />
            <Route path='*' component={PageNotFound} />
        </Switch>
    )
}

export default UnAuthenticatedApp;