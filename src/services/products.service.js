import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import {
  PRODUCTS_COLLECTION_NAME,
  SELLS_COLLECTION_NAME,
} from "../constants/products";

export async function getProducts() {
  const productsCollection = collection(db, PRODUCTS_COLLECTION_NAME);

  const productsSnapshot = await getDocs(productsCollection);

  return productsSnapshot.docs.map((productDocument) => ({
    id: productDocument.id,
    ...productDocument.data(),
  }));
}

export async function getProductById(productId) {
  const productDocument = doc(db, PRODUCTS_COLLECTION_NAME, productId);

  const productSnapshot = await getDoc(productDocument);

  return {
    id: productSnapshot.id,
    ...productSnapshot.data(),
  };
}

export async function createSell(sell) {
  const sellsCollection = collection(db, SELLS_COLLECTION_NAME);

  const newSell = await addDoc(sellsCollection, sell);

  return {
    id: newSell.id,
    status: "created",
  };
}
