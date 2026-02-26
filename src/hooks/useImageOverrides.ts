import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const useImageOverrides = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [overrides, setOverrides] = useState<Record<string, any>>({});

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setIsAdmin(!!user);
        });

        const unsubscribeFirestore = onSnapshot(doc(db, 'settings', 'image_overrides'), (snapshot) => {
            if (snapshot.exists()) {
                setOverrides(snapshot.data());
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeFirestore();
        };
    }, []);

    const getImageUrl = (defaultUrl: string, key: string) => {
        return overrides[key] || defaultUrl;
    };

    // 배열 형태의 이미지 리스트를 가져오는 함수 (추가/삭제용)
    const getImageList = (defaultImages: string[], keyPrefix: string) => {
        const list = [...defaultImages];
        // 오버라이드된 개별 이미지 적용
        list.forEach((_, idx) => {
            const key = `${keyPrefix}_${idx}`;
            if (overrides[key]) list[idx] = overrides[key];
        });

        // 추가된 이미지가 있다면 (예: index가 default length보다 큰 경우)
        // 이 부분은 Partners.tsx에서 직접 관리하게 할 수도 있습니다.
        return list;
    };

    const setOverrideValue = async (key: string, value: any) => {
        try {
            const docRef = doc(db, 'settings', 'image_overrides');
            const newOverrides = { ...overrides, [key]: value };
            await setDoc(docRef, newOverrides);
        } catch (error) {
            console.error('Error setting override:', error);
        }
    };

    const deleteOverrideValue = async (key: string) => {
        try {
            const docRef = doc(db, 'settings', 'image_overrides');
            const { [key]: _, ...rest } = overrides;
            await setDoc(docRef, rest);
        } catch (error) {
            console.error('Error deleting override:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return { isAdmin, getImageUrl, getImageList, overrides, logout, setOverrides, setOverrideValue, deleteOverrideValue };
};
