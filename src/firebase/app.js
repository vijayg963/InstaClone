import firebaseConfig from './firebase-config';
import { initializeApp } from 'firebase/app';

const app =  initializeApp(firebaseConfig);

export default app;