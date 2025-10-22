import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc, increment, setDoc } from "firebase/firestore";

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

export async function getAllProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "producto"));
        return querySnapshot.docs.map((doc) => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
    }
}

export async function getProductById(productId) {
    try {
        const productDoc = await getDoc(doc(db, "producto", productId));
        if (productDoc.exists()) {
            return { id: productDoc.id, ...productDoc.data() };
        }
        return null;
    } catch (error) {
        console.error("Error al obtener producto:", error);
        throw error;
    }
}

export async function updateProductStock(productId, quantityChange) {
    try {
        const productRef = doc(db, "producto", productId);
        await updateDoc(productRef, {
            stock: increment(-quantityChange)
        });
        return true;
    } catch (error) {
        console.error("Error al actualizar stock del producto:", error);
        throw error;
    }
}

export async function restoreProductStock(productId, quantity) {
    try {
        const productRef = doc(db, "producto", productId);
        await updateDoc(productRef, {
            stock: increment(quantity)
        });
        return true;
    } catch (error) {
        console.error("Error al restaurar stock del producto:", error);
        throw error;
    }
}

// Funciones para manejar carrito en Firebase
export async function getUserCart(userId) {
    try {
        const cartRef = doc(db, "carritos", userId);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
            return cartDoc.data().items || [];
        }
        return [];
    } catch (error) {
        console.error("Error al obtener carrito del usuario:", error);
        throw error;
    }
}

export async function saveUserCart(userId, cartItems) {
    try {
        const cartRef = doc(db, "carritos", userId);
        await setDoc(cartRef, {
            userId: userId,
            items: cartItems,
            lastUpdated: new Date()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error al guardar carrito del usuario:", error);
        throw error;
    }
}

export async function clearUserCart(userId) {
    try {
        const cartRef = doc(db, "carritos", userId);
        await setDoc(cartRef, {
            userId: userId,
            items: [],
            lastUpdated: new Date()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error al limpiar carrito del usuario:", error);
        throw error;
    }
}