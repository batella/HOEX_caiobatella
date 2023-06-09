import './styles.css';
import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout
} from './ui'

import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "dummy-apiKey",
  authDomain: "dummy-authDomain.firebaseapp.com",
  projectId: "dummy-project-id",
  storageBucket: "dummy-authDomain.firebaseapp.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:7c7abae699b868b7f896ec",
  measurementId: "G-ABCDEFGHIJ"
});

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value

  // step 1: try doing this w/o error handling, and then add try/catch
  

  // step 2: add error handling
   try {
     await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
   }
   catch(error) {
     console.log(`There was an error: ${error}`)
     showLoginError(error)
   }
}

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  } 
}

// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user)
      showApp()
      showLoginState(user)

      hideLoginError()
      hideLinkError()
    }
    else {
      showLoginForm()
      lblAuthState.innerHTML = `You're not logged in.`
    }
  })
}

// Log out
const logout = async () => {
  await signOut(auth);
}

btnLogin.addEventListener("click", loginEmailPassword) 
btnSignup.addEventListener("click", createAccount)
btnLogout.addEventListener("click", logout)

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9099");

monitorAuthState();

/*import { initializeApp } from 'firebase/app';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAu-WS9MEhiVltcSpv9g0Bff0qJmgUvoVs",
    authDomain: "hoex-caiobatella.firebaseapp.com",
    projectId: "hoex-caiobatella",
    storageBucket: "hoex-caiobatella.appspot.com",
    messagingSenderId: "801107046301",
    appId: "1:801107046301:web:d2959e42c400d4a84b8974",
    measurementId: "G-RF65ZTGRJQ"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
db.collection('todos').getDocs();
const todosCol = collection(db,'todos');
const snapshot = await getDocs(todosCol);

//detectar status de login
onAuthStateChanged(auth, user =>{
    if(user =! null) {
        console.log("Está logado!");
    } else {
        console.log("Não está logado");
    }
});*/