import { useState, useRef } from "react";
import { connect } from "react-redux";
import { Link,useHistory } from "react-router-dom";
import { uploadImage } from "../firebase/image";
import { updateUserInfo } from "../redux/action";
import Dropzone from "./Dropzone";
import Loader from "./loader";


function AddImageDescription({userInfo,dispatch}){
    let history = useHistory();
    let [description, setDescription] = useState("");
    let [error, setError] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let [uploadMessage, setUploadMessage] = useState("");
    let inputRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(inputRef.current);
        if(inputRef.current){
            setIsLoading(true);
            uploadImage(inputRef.current, description ? description : "This is description" , userInfo)
            .then(url => {
              let userImages = userInfo.images ? userInfo.images.concat({url}) : [{url}];
              dispatch(updateUserInfo({...userInfo,images : userImages}));
              history.push("/");
            })
        }else{
            setError("Need to drop any image !!!")
        }

    }

    return <section className="main-add-image-description flex-column-center-center" >
        <p className="err-msg" >{uploadMessage}</p>
        <h1 className="err-msg" >{error}</h1>
        <Dropzone ref={inputRef} setError={() => setError("")} setUploadMessage={(msg) => setUploadMessage(msg)} />
        <form  className="form-desc" onSubmit={handleSubmit} >
           <label htmlFor="desc">
                Description:
            </label>
                <input id="desc" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' />
                {
                    isLoading ? <div className="relative-loader" ><Loader /></div> :
                <button type="submit" className={ error ?  "submit err" : "submit"} disabled={error ? true : false} >submit</button>
                }
        </form>
    </section>
}

const mapsStateToProps = (state) => ({...state});

export default connect(mapsStateToProps)(AddImageDescription);