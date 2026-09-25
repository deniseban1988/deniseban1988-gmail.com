import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

const FIRESTORE_DB_ID = 'dev-ivoirexpress';

async function checkConnections() {
  const firebaseProjectIdEnv = process.env.FIREBASE_PROJECT_ID;
  if (!firebaseProjectIdEnv) {
    console.error('FIREBASE_PROJECT_ID manquant');
    return;
  }

  const serviceAccount = JSON.parse(firebaseProjectIdEnv);
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key
      .replace('-----DEBUT PRIVÉ CLÉ-----', '-----BEGIN PRIVATE KEY-----')
      .replace('-----END CLÉ PRIVÉE-----', '-----END PRIVATE KEY-----')
      .replace(/\\n/g, '\n');
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id
    });
  }

  const db = getFirestore(getApps()[0], FIRESTORE_DB_ID);
  
  console.log('--- MONITORING CONNEXIONS APK (Dernières 24h) ---');
  const snap = await db.collection('connection_tests')
    .orderBy('timestamp', 'desc')
    .limit(20)
    .get();

  if (snap.empty) {
    console.log('Aucune connexion APK détectée pour le moment.');
  } else {
    snap.forEach(doc => {
      const data = doc.data();
      console.log(`${data.timestamp} | ${data.method} ${data.path} | IP: ${data.ip}`);
    });
  }
}

checkConnections().catch(console.error);
