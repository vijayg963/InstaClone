import { IoIosSettings } from 'react-icons/io';
import { connect } from 'react-redux';

function Profile(props){
    let {feeds,userInfo} = props;
    return (
        <section className="container margin-tb" >
            <div className="profile" >
                <div className="profile-img" >
                    <img src="https://png.pngtree.com/png-vector/20211218/ourmid/pngtree-photography-logo-for-photographer-camera-png-image-png-image_4062788.png" alt="" />
                </div>
                <div className="profile-info" >
                    <div className="name" >
                        <span className='p-name' >{userInfo.username}</span>
                        <button className='edit-btn' >Edit Profile</button>
                        <span className='settings-icon' ><IoIosSettings /></span>
                    </div>
                    <div className="p-f-f" >
                        <span>48 <span>posts</span></span>
                        <span>121 <span>followers</span></span>
                        <span>74 <span>following</span></span>
                    </div>
                    <div className="status-box" >
                        <span>Naman Aggarwal</span>
                        <span>❤️Indian 🇮🇳 | | 22🤘 | | 5'9'' | | 🕉 namah shivaay!!!</span>
                        <a href="www.facebook.com/namanaggarwal3798">www.facebook.com/namanaggarwal3798</a>
                    </div>
                </div>
            </div>
            <ul className='photo-grid' >
                {
                    !userInfo.images ? "" :
                    userInfo.images.reverse().map((feed,index) => {
                        return (
                            <li key={index} className='feed' >
                                <img src={feed.url} alt={index} />
                            </li>
                        )
                    })  
                }
            </ul>
        </section>
    )
}

const mapsStateToProps = (state) => ({...state})

export default connect(mapsStateToProps)(Profile);