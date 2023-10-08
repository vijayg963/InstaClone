import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import app from "../app";
export const auth = getAuth();
export const db = getFirestore(app);

export const createAuthUser = async (email, password) => {
	try {
		const {user} = await createUserWithEmailAndPassword(auth, email, password);
		await setPersistence(auth, browserLocalPersistence)
		return { data: { email, uid: user.uid } };
	} catch (error) {
		return { error: error.message };
	}
};

export const signInUser = async (email, password) => {
	try {
		const {user} = await signInWithEmailAndPassword(auth, email, password);
		await setPersistence(auth, browserLocalPersistence)
		return { data:  { email, uid: user.uid } };
	} catch (error) {
		return { error: error.message };
	}
}

export const createUser = async (email, username, name, uid) => {
	try {
		const docRef = doc(db, 'users', uid);
		await setDoc(docRef, {
			email,
			username,
			name,
		});

		return { data: { email, username, name, uid } };
	} catch (error) {
		return { error: error.message };
	}
};


export const getUserInfo = async (uid) => {
	try {
		const docRef = doc(db, "users", uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return { data: {...docSnap.data(), uid} }
		} else {
			throw new Error("No User info found")
		}
	} catch (error) {
		return { error: error.message };
	}

}

export const updateUserInfo = async (info, uid) => {
	const isUserInfo = await getUserInfo(auth)
	const userDocRef = doc(db, "users", uid);
	// try {
	// 	const docRef = await addDoc(collection(db, "users"), {
	// 		email,
	// 		username,
	// 		name,
	// 	});

	// 	return { data: { email, username, name } };
	// } catch (error) {
	// 	console.log(error);
	// 	return { error: error.message };
	// }
}

export const addUpdateUserInfoArray = async (key, value, uid) => {
	try {
		const docRef = doc(db, "users", uid);
		await updateDoc(docRef, {
			[key]: arrayUnion(value)
		});
		return {data: {value}}
	} catch (error) {
		console.log(error)
		return { error: error.message };
	}
}

export const reAuthUser =  () => {
	return new Promise((res, rej) => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				await setPersistence(auth, browserLocalPersistence)
				const info = await getUserInfo(user.uid)
				res(info)
			} else {
				logout();
				rej()
			}
		})
	})
}

export const logout = () => {
	signOut(auth);
	console.log("Logging Out")
};