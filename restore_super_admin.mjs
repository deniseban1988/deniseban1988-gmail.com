import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = {
  "type": "service_account",
  "project_id": "studio-2569273626-e2093",
  "private_key_id": "2d40729928254d8f478f2756a4b5e469775ee7a8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCmA38hgLSuxGO5\n5jobW/m4T1KdtX3BGiZZgIgTQnUBeRdpkMpH1cu4uRONvMDLNdpeJ1K6C1dkCJ1p\npnr+KfrKQRSQzkmsX3pOp9lKNQRKyj5ylAiiHuJ2gS3eBLxxMJ4mlkq1OewYBfYv\nqNG Dvn9fCWs1xvz4Kr+CIqpa+RvSyxEPzd8UkmXQT8MVTyssUxRHCAPykYQsN1wq\nGW/jE9y7nvv3qSr32HRhWgMIKKZYZMAhTYq7MwvvUj/ g5WkOxFjfdi1JqijWdBa7\nSHlJaJRarkIMspThXpxczn/UIpV5NIV2toK4ApbF0SDYD+eh5lZZ3cqPkKHQgf7U\na6knJfMLAgMBAAECg gEAAaW6kZA1ECA+G8PPbc1oLqOy3oJvi1wBZ2qhbwzTcRP3\nidei+jrX468KekyWM9ixSwqO2pkZi+eTUE9o8bQO8LTb9GKSU+s6oSSElnpCNE/K\nINmb4FKizVQ+KpwswTQfTaNjfbrjvzVH78nNZ8ZF00vvoWqma1FZRyb66R4xtXzE\nSMHeq73ldSaXlJru10ApPTQfgeSaaj2 VE7/D7rnZxphaY0AZxQP9Kb0hfA4HDIbC\nljCMtY6obAbaFG3O1BQ7U8u/qOVFXzuQ7JfQ0JyHxVF2j5hdTkMqW9xzQL0GDJNJ\naeJXr 0OIfRRdtyVTwzCrJoApSa3mAu7PzMFsVjPqQQKBgQDQmPQMn9o4419y02qr\nC0xPd/WjpQVrCH8dJkQowCBtwMoND5tjaXfyRdjx5+xAy qzFPFikye9q9goT7k8l\nwIwtfYJzcW/5EKw6nJK0AaDLgF/kU+NvM53C5yesaIBL7/q6RF3awTVDbcR6zVNQ\nmIzt1iej9rcP+6NHPg fbFnrCIQKBgQDLvUCoOflxI4EmMOUcuic/nRFPG4LKvA+k\nLqvO4bD4+TTbpIxk1j8b/5IrCIwA0zTaHEaNuVp35X3tgpLhmFUCCgIchu bCiOvh\n1K0UwnYmVlfcc9HPfH5Xak+nhT5BCKJgUhCoYagG3fIXvB9MslC+yYa7+3M2cPQ1\n2u1ps6tnqwKBgBztGOqnQBujbBkAOEp/xpU+jVGkEJxHEVl5dPoxqk2N7nbhMysV\n9Qwjo3HoN1rEwDCZrbEsT4cFl2AsK82QZd/pB636jQx8w2VdUPqlPyb5JlMDTwac\nocPlSh seYqwlGx+5W0p6gGhZUGW3E1aZ0PEqQVT7YWdV/c5jS7OV6nABAoGAPmfH\nqD+pwhfn9TTA2N3EK94GcT6x/zs/Z0DMa2AB/yEGKcjrH+ /oAMF1mizSBWasJ6rF\niZ+esF7hBaEbMHKihy9dmjNP94JNDi1Anr05x2BnJSVsvKsbX9c2cs+DVBQ6+Fnq\ntEjFWOUexFphE/MCfI3p 8SaCEcjjZKOcWOYpuGUCgYAbBg5Za/kmDIgkAnAmnFBN\n6/oTh/zEGKh0PV36YAoE94k1pjmcU6kCVd5jzF0MsXbniy6KRbn8ZB1YsEq7 FFBg\nFELzAjjLVEtJYf/w75d3bHLzL9XPS4LGQyKiVcVixpj/o/SIec1rkA28P83v2fnH\nac6kiDnmpWAe6JIDcNhzqw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@studio-2569273626-e2093.iam.gserviceaccount.com"
};

const app = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(app);
const db = getFirestore(app);

async function run() {
  const email = 'fabriceallechi@gmail.com';
  console.log('--- RESTAURATION SUPER ADMIN ---');
  
  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log('Utilisateur Auth trouvé:', user.uid);
  } catch (e) {
    console.log('Utilisateur Auth non trouvé, création...');
    user = await auth.createUser({
      email,
      password: 'TemporaryPassword123!', // User should change this
      emailVerified: true,
      displayName: 'Super Admin'
    });
    console.log('Utilisateur Auth créé:', user.uid);
  }

  const userDocRef = db.collection('users').doc(user.uid);
  const userDoc = await userDocRef.get();

  const superAdminData = {
    uid: user.uid,
    email: email,
    displayName: 'Super Admin',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    createdAt: userDoc.exists ? userDoc.data().createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await userDocRef.set(superAdminData, { merge: true });
  console.log('Document Firestore mis à jour avec role: SUPER_ADMIN');
  
  console.log('--- TERMINÉ ---');
}

run().catch(console.error);
