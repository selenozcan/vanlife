import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import bcrypt from "bcryptjs";
import { auth, db } from "./firebase";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  updateDoc
} from "firebase/firestore/lite";

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export async function getHostVans(hostId) {
  try {
    const vansCollectionRef = collection(db, "vans");

    const q = query(vansCollectionRef, where("hostId", "==", hostId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching host vans:", error.message);
    throw error;
  }
}

export const rentVan = async (vanId, userId) => {
  try {
    if (!userId) {
      throw new Error("User is not logged in.");
    }

    const vanDocRef = doc(db, "vans", vanId);

    const vanSnapshot = await getDoc(vanDocRef);
    if (!vanSnapshot.exists()) {
      throw new Error("Van not found.");
    }

    await updateDoc(vanDocRef, { hostId: userId });

    console.log(`Van ${vanId} is now rented by user ${userId}`);
    return { success: true, message: "Van rented successfully!" };
  } catch (error) {
    console.error("Error renting van:", error.message);
    throw error;
  }
};

export const registerUser = async (email, password, name) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully!");
    return user;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

export const loginUser = async (loginFormData) => {
  try {
    const { email, password } = loginFormData;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("Login successful!", user);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  await signOut(auth);
  console.log("User logged out successfully!");
};
