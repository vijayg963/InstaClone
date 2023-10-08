import { BiDotsHorizontalRounded, BiPaperPlane } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { RiChat3Line } from 'react-icons/ri';
import { GoPrimitiveDot } from 'react-icons/go';
import { CgPentagonDown } from 'react-icons/cg';
import DummyWork from './dummywork';
import { addLike, getFeed, removeLike } from "../firebase/image"
import { useEffect } from 'react'
import { connect } from "react-redux";
import { updateFeeds, updateLikes } from '../redux/action';
import Loader from './loader';

function MainUi(props) {
	const { feeds, dispatch, userInfo } = props;

	useEffect(() => {
		if (userInfo) {
			getFeed().then((feeds) => dispatch(updateFeeds(feeds.data)));
		}
	}, [userInfo]);
	// console.log(feeds);
	const handleLike = (feed,index) => {
		if(feed.likes?.includes(userInfo.uid) ){
			removeLike(feed.uid, userInfo.uid)
			.then(res => {
				const updatedFeeds = [...feeds];
				updatedFeeds[index] = res.data
				dispatch(updateLikes(updatedFeeds))
			})

			// userPostLikes("","",id,userInfo.uid);
		}else{
			addLike(feed.uid, userInfo.uid)
			.then(res => {
				const updatedFeeds = [...feeds];
				updatedFeeds[index] = res.data
				dispatch(updateLikes(updatedFeeds))
			})
		}
	}

	if (!feeds) {
		return <Loader />
	}

	return (
		<section className="container margin-tb" >
			<div className="main-ui" >
				<ul className="ui" >
					{
						feeds.map((feed,index) => {

							return (
								<li key={feed.uid} className="li" >
									<header className="header-li flex-between-center" >
										<div className='info flex-center-center' >
											<div className='flex-center-center' >
												<img src='https://png.pngtree.com/png-vector/20211218/ourmid/pngtree-photography-logo-for-photographer-camera-png-image-png-image_4062788.png' alt="" />
											</div>
											<p className='flex-column-center-center' >
												<span>{feed.name}</span>
												<span className='city' >London, United Kingdom</span>
											</p>
										</div>
										<div className='flex-center-center' ><BiDotsHorizontalRounded className='BiDotsHorizontalRounded' /></div>
									</header>
									<div className='image' >
										<img src={feed.url} alt="" />
									</div>
									<div className='all-icons flex-between-center' >
										<div className='flex-between-center' >
											<FiHeart onClick={ () => handleLike(feed,index)} className={`three-icons ${feed.likes?.includes(userInfo.uid) ? "active-heart" : ""}`} />
											<RiChat3Line className='three-icons rotate-45' />
											<BiPaperPlane className='three-icons' />
										</div>
										<div className='two-dot-icon' >
											<GoPrimitiveDot className='bsdot-1' />
											<GoPrimitiveDot className='bsdot-2' />
										</div>
										<div className='' >
											<CgPentagonDown className='save-icon' />
										</div>
									</div>
									<div className='likes' >
										{feed.likes?.length || 0} likes
									</div>
									<div className='name-description' >
										<span className='first' >{feed.name}</span>
										<span className='second' >{feed.description}</span>
									</div>
								</li>

							)
						})
					}
				</ul>
				<section className='dummy-work' >
					<DummyWork />
				</section>
			</div>
		</section>
	)
}

const mapsStateToProps = (state) => ({ ...state })

export default connect(mapsStateToProps)(MainUi);