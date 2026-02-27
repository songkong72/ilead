
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, deleteField } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// .env 파일 로드
dotenv.config({ path: 'e:/project/workspace/엘이에이디홈페이지/.env' });

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function resetPhoenixOverride() {
    try {
        const docRef = doc(db, 'settings', 'image_overrides');
        await updateDoc(docRef, {
            'partners_resort_1_main_0': deleteField()
        });
        console.log('✅ 휘닉스 리조트 이미지 설정이 초기화되었습니다. 새 기본 이미지가 표시됩니다.');
        process.exit(0);
    } catch (error) {
        console.error('❌ 설정 초기화 중 오류 발생:', error);
        process.exit(1);
    }
}

resetPhoenixOverride();
