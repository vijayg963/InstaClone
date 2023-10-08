import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import app from "../app"
import { addUpdateUserInfoArray, db } from "../user";

const storage = getStorage(app);
console.log(storage);

export const createFeed = async (username, name, uid, url,description) => {
	try {
		const docRef = doc(db, 'feeds', `${uid}`);
		await setDoc(docRef, {
			username,
			name,
			url,
      description,
      likes : [],
		});

		return { data: { username,
			name,
			url,
      description, } };

	} catch (error) {
    console.log(error);
		return { error: error.message };
	}
};

export const uploadImage = async (file, description = "", userInfo) => {
  try {
    const name = Date.now();
    const storageRef = ref(storage, `images/${name}`);
    const fileInfo = await uploadBytes(storageRef, file[0], {
      contentType: file[0].mimetype
    });
    console.log(fileInfo);
    const url = await getDownloadURL(fileInfo.ref)
    await addUpdateUserInfoArray("images", {url, description}, userInfo.uid);
    const feed = await createFeed(userInfo.username,userInfo.name, name, url,description );
    console.log(feed);
    return url;
  } catch (error) {
    console.log(error)
    return {error: error.message}
  }
}

export const getFeed = async () => {
  try {
    // const storageRef = ref(storage, 'images/');
    // const lists =  await list(storageRef, {maxResults: 20});
    // const feeds = await Promise.all(lists.items.map((ref) => getDownloadURL(ref)));
    const feedsCollection = await getDocs(collection(db, "feeds"));
    let feeds = [];
    feedsCollection.forEach(doc => feeds.push({...doc.data(),uid: doc.id}))
    return {data: feeds.reverse()}
  } catch (error) {
    // console.log(error)
    return {error: error.message}
  }
}


export const addLike = async (docID,userID) => {
    try {
      const docRef = doc(db, "feeds", docID);
      await updateDoc(docRef, {
        likes: arrayUnion(userID)
      });
      const updatedDoc = await getDoc(docRef);
      // console.log(updatedDoc);
      return {data : {...updatedDoc.data(),uid: docID}}
    } catch (error) {
      console.log(error)
      return { error: error.message };
    }
}

export const removeLike = async (docID,userID) => {
  try {
    const docRef = doc(db, "feeds", docID);
    await updateDoc(docRef, {
      likes: arrayRemove(userID)
    });
    const updatedDoc = await getDoc(docRef);
      // console.log(updatedDoc);
      return {data : {...updatedDoc.data(),uid: docID}}
  } catch (error) {
    console.log(error)
    return { error: error.message };
  }
}
