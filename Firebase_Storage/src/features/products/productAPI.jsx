import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

const productCollection = collection(db, "product")

console.log('productCollection', productCollection);


// fetch data

export const fetchProductAPI = async () => {
    const ProductData = await getDocs(productCollection)

    const product = ProductData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    return product
}

// add product

export const addProductAPI = async (product) => {

    console.log('addproductapi', product);

    const docRef = await addDoc(productCollection, product)

    console.log('docRef', docRef);

    return {
        id: docRef.id,
        ...product
    }
}

// update docs

export const updateProductAPI = async ({ id, data }) => {
    const productRef = doc(db, "product", id)

    await updateDoc(productRef, data)

    return { id, data }
}

// deletedoc

export const deleteProductAPI = async (id) => {
    await deleteDoc(doc(db, "product", id))

    return id
}