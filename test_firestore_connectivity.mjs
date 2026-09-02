import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_PROJECT_ID);

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore(app);

async function test() {
  console.log('Testing connectivity to Firestore...');
  console.log('Project ID:', serviceAccount.project_id);
  
  try {
    const collections = await db.listCollections();
    console.log('Successfully connected to Firestore!');
    console.log('Number of collections:', collections.length);
    collections.forEach(c => console.log(' - Collection:', c.id));
  } catch (err) {
    console.error('Failed to connect to Firestore:', err.message);
    if (err.code === 7) {
      console.log('PERMISSION_DENIED: Check if the Service Account has owner/editor/firestore-user role.');
    }
  }
}

test().catch(console.error);
