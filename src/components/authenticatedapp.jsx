import {Switch,Route} from 'react-router-dom';
import AddImageDescription from './addimagedesc';
import Header from './header';
import MainUi from './mainui';
import PageNotFound from './pagenotfound';
import Profile from './profile';

function AuthenticatedApp(){
    return (
        <>
        <Header />
        <Switch>
            <Route path='/' component={MainUi}  exact />
            <Route  path='/add-image-description' component={AddImageDescription} exact />
            <Route path='/profile' component={Profile}  exact />
            <Route path='*' component={PageNotFound} />
        </Switch>
        </>
    )
}

export default AuthenticatedApp;