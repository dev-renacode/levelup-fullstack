import { db } from "./firebase";
import { collection, addDoc, getDoc, query, where } from "firebase/firestore";

export async function addUser(user) {
    return await addDoc(collection(db, "user"), { ...user, createdAt: new Date() });
}

export async function getProduct(email) {
    const snap = await getDoc(collection(db, "productos"));
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}