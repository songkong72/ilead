import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Notice {
    id?: string;
    title: string;
    content: string;
    author: string;
    date: string;
    views: number;
    createdAt?: Timestamp;
}

const COLLECTION = 'notices';

export const getNotices = async (): Promise<Notice[]> => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Notice[];
};

export const addNotice = async (notice: Omit<Notice, 'id'>) => {
    return await addDoc(collection(db, COLLECTION), {
        ...notice,
        createdAt: Timestamp.now(),
    });
};

export const updateNotice = async (id: string, data: Partial<Notice>) => {
    const docRef = doc(db, COLLECTION, id);
    return await updateDoc(docRef, data);
};

export const deleteNotice = async (id: string) => {
    const docRef = doc(db, COLLECTION, id);
    return await deleteDoc(docRef);
};
