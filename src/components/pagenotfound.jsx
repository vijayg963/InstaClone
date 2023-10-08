import { Link } from "react-router-dom"

export default function PageNotFound(){
    return (
    <section className="error-page flex-column-center-center" >
    <h1>Sorry, this page isn't available.</h1>
    <p>The link you followed may be broken, or the page may have been removed. <Link to='/' className="go-back" >Go back to Instagram.</Link> </p>
    </section> 
    )
}