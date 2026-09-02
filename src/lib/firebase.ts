import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, getFirestore, Firestore, collection, getDocs, addDoc, setDoc, doc, onSnapshot, query, limit, orderBy, writeBatch } from 'firebase/firestore';
import { getAuth, Auth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import firebaseConfigJson from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let isFirebaseConfigured = false;

// Détermination de l'ID de la base de données selon l'environnement
const isProduction = import.meta.env.PROD;
const FIRESTORE_DB_ID = isProduction 
  ? (firebaseConfigJson.firestoreDatabaseId || '(default)')
  : '(default)';

try {
  // Configuration Firebase dynamique chargée depuis firebase-applet-config.json
  const firebaseConfig = {
    apiKey: firebaseConfigJson.apiKey,
    authDomain: firebaseConfigJson.authDomain,
    projectId: firebaseConfigJson.projectId,
    storageBucket: firebaseConfigJson.storageBucket,
    messagingSenderId: firebaseConfigJson.messagingSenderId,
    appId: firebaseConfigJson.appId,
  };

  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  const firestoreSettings = {
    experimentalForceLongPolling: true,
    ignoreUndefinedProperties: true,
    useFetchStreams: false, // Prevents "unavailable" errors in some restricted environments
  };

  try {
    console.log('[Firebase] Tentative d’initialisation Firestore pour le projet:', firebaseConfigJson.projectId, 'BDD:', FIRESTORE_DB_ID);
    if (FIRESTORE_DB_ID && FIRESTORE_DB_ID !== '(default)') {
      db = initializeFirestore(app, firestoreSettings, FIRESTORE_DB_ID);
    } else {
      db = initializeFirestore(app, firestoreSettings);
    }
  } catch (initErr) {
    console.warn('[Firebase] initializeFirestore a échoué, tentative de récupération de l’instance existante:', initErr);
    // Si déjà initialisé, récupération de l’instance existante
    if (FIRESTORE_DB_ID && FIRESTORE_DB_ID !== '(default)') {
      db = getFirestore(app, FIRESTORE_DB_ID);
    } else {
      db = getFirestore(app);
    }
  }

  auth = getAuth(app);
  // signInAnonymously(auth).catch(() => {}); // Désactivé pour éviter les conflits d'identité au démarrage
  isFirebaseConfigured = true;
  console.log('[Firebase] Cloud Firestore & Auth initialisés avec succès (Long Polling actif):', firebaseConfigJson.projectId, 'BDD:', FIRESTORE_DB_ID);
} catch (error) {
  console.warn('[Firebase] Erreur d’initialisation Firebase (Mode In-Memory de secours actif):', error);
}

export { app, db, auth, isFirebaseConfigured, FIRESTORE_DB_ID };

// Firestore Synchronization Helpers (Ensuring clean data without mock data injection)
export async function seedInitialFirestoreData(force: boolean = false) {
  if (!isFirebaseConfigured || !db) return;

  try {
    // Note: Profiling real users with hardcoded UIDs (u-admin-01) causes mismatches with Firebase Auth UIDs.
    // Real profiles are now auto-provisioned upon login in FirestoreAuthRepositoryAdapter.
    console.log('[Firebase] System ready. Initial profiles will be auto-provisioned on first login.');
  } catch (err) {
    console.error('[Firebase] Erreur lors de l’initialisation des utilisateurs Firestore:', err);
  }
}
