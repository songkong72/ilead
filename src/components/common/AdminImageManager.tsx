import React, { useState } from 'react';
import { Upload, Loader2, Trash2 } from 'lucide-react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';

interface AdminImageManagerProps {
    children: React.ReactNode;
    isAdmin: boolean;
    uploadKey: string;
    variant?: 'replace' | 'add';
}

const AdminImageManager: React.FC<AdminImageManagerProps> = ({ children, isAdmin, uploadKey, variant = 'replace' }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    if (!isAdmin) return <>{children}</>;

    const handleUpload = async (file: File) => {
        try {
            setIsUploading(true);
            const storagePre = uploadKey.split('_')[0]; // page prefix
            const storageRef = ref(storage, `site_images/${storagePre}/${uploadKey}_${Date.now()}`);

            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Firestore 통합 관리 문서 업데이트
            const docRef = doc(db, 'settings', 'image_overrides');
            const docSnap = await getDoc(docRef);
            const currentData = docSnap.exists() ? docSnap.data() : {};

            await setDoc(docRef, {
                ...currentData,
                [uploadKey]: downloadURL
            });

            alert('이미지가 성공적으로 반영되었습니다.');
        } catch (error) {
            console.error('Upload error:', error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('기본 이미지로 되돌리시겠습니까?')) return;

        try {
            setIsUploading(true);
            const docRef = doc(db, 'settings', 'image_overrides');
            await updateDoc(docRef, {
                [uploadKey]: deleteField()
            });
            alert('기본 이미지로 복원되었습니다.');
        } catch (error) {
            console.error('Delete error:', error);
            alert('삭제 중 오류가 발생했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div
            className={`relative group/admin-img ${isDragOver ? 'ring-4 ring-emerald-500 ring-inset scale-[0.99] transition-transform' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    handleUpload(file);
                }
            }}
        >
            {children}

            {/* Admin Interaction Overlay */}
            <div className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] z-40 flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none ${isDragOver ? 'opacity-100' : 'opacity-0 group-hover/admin-img:opacity-100'}`}>
                {isUploading ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                    <>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="bg-emerald-500 p-2.5 rounded-full shadow-lg">
                                <Upload className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-white text-[10px] font-black uppercase tracking-wider bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                                드래그하여 {variant === 'add' ? '추가' : '교체'}
                            </span>
                        </div>

                        {/* 삭제 버튼 - 추가 모드일 때는 보이지 않음 */}
                        {variant === 'replace' && (
                            <button
                                onClick={handleDelete}
                                className="absolute top-4 right-4 p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-xl transition-all hover:scale-110 active:scale-95 pointer-events-auto"
                                title="기본 이미지로 복원"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminImageManager;
