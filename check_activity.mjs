import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

const FIRESTORE_DB_ID = 'dev-ivoirexpress';

async function checkRecentActivity() {
  const firebaseProjectIdEnv = process.env.FIREBASE_PROJECT_ID;
  if (!firebaseProjectIdEnv) return;

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
  
  console.log('--- DERNIÈRE ACTIVITÉ USERS ---');
  const userSnap = await db.collection('users').orderBy('createdAt', 'desc').limit(5).get();
  if (userSnap.empty) {
    console.log('Aucun utilisateur trouvé.');
  } else {
    userSnap.forEach(doc => {
      const data = doc.data();
      console.log(`User: ${data.email} | Role: ${data.role} | Created: ${data.createdAt} | Env: ${data.env}`);
    });
  }

  console.log('\n--- ACTIVITÉ RÉCENTE APK & API ---');
  const connSnap = await db.collection('connection_tests')
    .orderBy('timestamp', 'desc')
    .limit(500)
    .get();
    
  if (connSnap.empty) {
    console.log('Aucune connexion trouvée.');
  } else {
    const filtered = connSnap.docs
      .map(doc => doc.data())
      .filter(data => 
        data.userAgent.includes('IVOIReXpress-APK') || 
        data.path.startsWith('/api/')
      );

    if (filtered.length === 0) {
      console.log('Aucun trafic APK ou API détecté dans les 100 derniers logs.');
    } else {
      filtered.forEach(data => {
        console.log(`${data.timestamp} | ${data.method} ${data.path} | UA: ${data.userAgent.substring(0, 30)}... | Auth: ${data.headers.authorization}`);
      });
    }
  }
}

checkRecentActivity().catch(console.error);
