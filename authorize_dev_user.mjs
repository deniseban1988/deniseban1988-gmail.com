import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

const FIRESTORE_DB_ID = 'dev-ivoirexpress';

async function authorizeUser() {
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
  const email = 'fabriceallechi@gmail.com';
  
  const userSnap = await db.collection('users').where('email', '==', email).get();
  
  if (userSnap.empty) {
    console.log(`Utilisateur ${email} non trouvé.`);
    return;
  }

  const userDoc = userSnap.docs[0];
  await userDoc.ref.update({ env: 'DEV' });
  
  console.log(`✅ Utilisateur ${email} (UID: ${userDoc.id}) autorisé avec succès pour l'environnement DEV.`);
}

authorizeUser().catch(console.error);
