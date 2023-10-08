import React,{ forwardRef } from 'react';
import {useDropzone} from 'react-dropzone';
// import {uploadImage} from "../firebase/image";
// import { connect } from "react-redux";
// import { updateUserInfo } from '../redux/action';

function Dropzone({setError,setUploadMessage},ref) {
  // let allFilesRef = useRef("");
  const { getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (files) => {
      ref.current = files;
      setUploadMessage("File uploaded successfully !!!");
      // console.log(ref.current);
      // allFilesRef.current = files;
        //   uploadImage(files,"This is description", userInfo)
        // .then(url => {
        //   let userImages = userInfo.images ? userInfo.images.concat({url}) : [{url}]
        //   dispatch(updateUserInfo({...userInfo,images : userImages}))
        // })
    }
  });
  // console.log(getInputProps,getRootProps);

  return (
    <section className="dropzone_container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button className="btn" onClick={() => {setError("");setUploadMessage("")}} >click to select files</button>
      </div>
    </section>
  );
}

export default forwardRef(Dropzone);