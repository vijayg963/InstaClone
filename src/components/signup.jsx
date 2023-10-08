import { useEffect, useState } from "react";
import {ImFacebook2} from 'react-icons/im';
import { useDispatch } from "react-redux";
import { NavLink,Link, useHistory } from 'react-router-dom';
import { createAuthUser, createUser, reAuthUser } from "../firebase/user";
import { updateUserInfo } from "../redux/action";

function Signup() {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (event) => {
      event.preventDefault();
      if(email && name && username && password) {
        const {data, error} = await createAuthUser(email, password);
        if(error) {
          setError(error)
        } else {
          const user = await createUser(email, username, name, data.uid)
          dispatch(updateUserInfo(user.data));
          history.push("/")
        }
      }
    }

    return (
      <>
      <section className="signup-form" >
        <h1 className="instagram-name flex-center-center" >
          <img src="https://www.dafont.com/forum/attach/orig/7/3/737566.png?1" alt="instagram" />
        </h1>
        <p className="p" >
        Sign up to see photos and videos from your friends.
        </p>
        <div className="login-with-facebook flex-center-center" >
          <ImFacebook2  />
          <span>Log in with Facebook</span>
        </div>
        <div className="or" >
          <span className="hr"></span>
          <div>OR</div>
          <span className="hr" ></span>
        </div>
          <p>{error}</p>
          <form className="form" onSubmit={handleSubmit} >
              <input type="email" name="signup-email" value={email} onChange={(e) => setEmail(e.target.value) } placeholder="Enter your email" />
              <input type="text" name="signup-name" value={name}  onChange={(e) => setName(e.target.value) } placeholder="Full Name" />
              <input type="text" name="signup-username" value={username}  onChange={(e) => setUsername(e.target.value) } placeholder="Username" />
              <input type="password" name="signup-password" value={password}  onChange={(e) => setPassword(e.target.value) } placeholder="Password" />
              <input type="submit"  id="submit" value='Sign up' />
          </form>
          <div className="agree-terms-conditions" >
          By signing up, you agree to our <span>Terms</span> , <span>Data Policy</span> and <span>Cookies Policy</span>.
          </div>
      </section>
      <section className="have-an-account" >
        Have an account? <Link to='/signin' className="link" >Log in</Link>
      </section>
      </>
    )
  }

  export default Signup;
