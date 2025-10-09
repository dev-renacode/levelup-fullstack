import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, getDoc, query, where } from "firebase/firestore";

export async function addUser(userData) {
    try {
        const docRef = await addDoc(collection(db, "users"), { 
            ...userData, 
            createdAt: new Date(),
            role: "user"
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        throw error;
    }
}

export async function getUserById(userId) {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
    }
}

export async function getAllUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

export async function getUserByEmail(email) {
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error al obtener usuario por email:", error);
        throw error;
    }
}