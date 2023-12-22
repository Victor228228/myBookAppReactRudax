import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAdHfW-Ph-UOuZhIpU-OFVk8izoFVHN3wc",
    authDomain: "appbook-932c6.firebaseapp.com",
    databaseURL: "https://appbook-932c6-default-rtdb.firebaseio.com",
    projectId: "appbook-932c6",
    storageBucket: "appbook-932c6.appspot.com",
    messagingSenderId: "260712021049",
    appId: "1:260712021049:web:2b47f3ab02c46410e361e8",
    measurementId: "G-H46GGDLMWJ"
};
const app = initializeApp(firebaseConfig);
export const fireBaseStorage = getStorage(app);
