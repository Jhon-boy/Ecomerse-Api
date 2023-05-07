import { addDoc, collection, getDocs  ,getFirestore } from "firebase/firestore"
import { db } from "./firebase"


export const AñadirUsuario = user => {
    return addDoc(collection(db, 'usuarios'), user);
  
  } 

  export const getUsuario = async user => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const userE = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    const x = userE.find(doc => doc.correo === user);
    // console.log("Lo encontramos + ", x, 'Y su correo es ', x.nombre);
    return x.nombre;
  }
  
  export const DevolverUser = async user => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const userE = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    const x = userE.find(doc => doc.correo === user);
    console.log('Devolviendo:' + x.nombre);
    return x;
  }

  export const getAllUsers = async () => {
    const db = getFirestore();
    const usersRef = collection(db, 'usuarios');
    const querySnapshot = await getDocs(usersRef);
    const usersArray = [];
    querySnapshot.forEach((doc) => {
      usersArray.push({ id: doc.id, ...doc.data() });
    });
    return usersArray;
  };


//D:\Proyectos\NodeJS\curso-node\src\img
