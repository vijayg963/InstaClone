import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {ImFacebook2} from 'react-icons/im';
import { NavLink,Link, useHistory } from 'react-router-dom';
import {  getUserInfo, reAuthUser, signInUser } from "../firebase/user"
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/action";

function Signin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = async (event) => {
      event.preventDefault();
      if(email && password) {
        const {data, error} = await signInUser(email, password);
        if(error) {
          setError(error)
        } else {
          const user = await getUserInfo(data.uid);
          console.log(user) // here we have to dispatch user info
          dispatch(updateUserInfo(user.data));
          history.push("/")
        }
      }
    }

    return (
      <>
      <section className="signin-form" >
        <h1 className="instagram-name flex-center-center margin-16-36" >
          <img src="https://www.dafont.com/forum/attach/orig/7/3/737566.png?1" alt="instagram" />
        </h1>
        <p>{error}</p>
          <form className="form" onSubmit={handleLogin} >
              <input type="text" name="signin-email" value={email} onChange={(e) => setEmail(e.target.value) } placeholder="Enter your email" />
              <input type="password" name="signin-password" value={password}  onChange={(e) => setPassword(e.target.value) } placeholder="Password" />
              <input type="submit"  id="login" value='Log in' />
          </form>
          <div className="or margin-10" >
            <span className="hr"></span>
            <div>OR</div>
            <span className="hr" ></span>
          </div>
          <div className="login-with-facebook flex-center-center margin-24" >
            <ImFacebook2  />
            <span>Log in with Facebook</span>
          </div>
      </section>
      <section className="have-an-account" >
        Don't have an account? <NavLink to='/signup' className="link" exact >Sign up</NavLink>
      </section>
      </>
    )
  }

  export default Signin;
