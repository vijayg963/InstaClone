import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reAuthUser } from '../firebase/user';
import { updateUserInfo } from '../redux/action';
import AuthenticatedApp from './authenticatedapp';
import Loader from './loader';
import UnAuthenticatedApp from './unauthenticatedapp';

function App({userInfo}) {
  let [loading, setLoading] = useState(true)
  let [isLoggedIn,setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  useEffect(() => {
    if(userInfo) {
      setLoading(false);
      setIsLoggedIn(true);
      history.push("/")
    } else {
      reAuthUser().then((user) => {
        dispatch(updateUserInfo(user.data))
        setLoading(false);
        setIsLoggedIn(true);
        
        history.push("/")
      }).catch(() => {
        setLoading(false);
        setIsLoggedIn(false);
        history.push("/signin")
      })
    }
  }, [userInfo])
  if(!isLoggedIn && loading){
    return <Loader />
  }else{
    return isLoggedIn && !loading ? <AuthenticatedApp /> : <UnAuthenticatedApp />
  }
}

const mapStateToProps = (state) => ({...state})

export default connect(mapStateToProps)(App);
