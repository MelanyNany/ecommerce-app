import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFVVfNmVs9YuzECMoom_vkAA04MevPnwA",
    authDomain: "ecommerce-app-f22c8.firebaseapp.com",
    projectId: "ecommerce-app-f22c8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);