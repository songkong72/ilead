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

export interface GalleryPost {
    id?: string;
    title: string;
    content: string;
    thumbnail: string;
    images: string[];
    author: string;
    date: string;
    views: number;
    createdAt?: Timestamp;
}

const COLLECTION = 'gallery';

export const getGalleryPosts = async (): Promise<GalleryPost[]> => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as GalleryPost[];
};

export const addGalleryPost = async (post: Omit<GalleryPost, 'id'>) => {
    return await addDoc(collection(db, COLLECTION), {
        ...post,
        createdAt: Timestamp.now(),
    });
};

export const updateGalleryPost = async (id: string, data: Partial<GalleryPost>) => {
    const docRef = doc(db, COLLECTION, id);
    return await updateDoc(docRef, data);
};

export const deleteGalleryPost = async (id: string) => {
    const docRef = doc(db, COLLECTION, id);
    return await deleteDoc(docRef);
};
