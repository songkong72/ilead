import React, { useState, useRef } from 'react';
import { Upload, Loader2, Trash2 } from 'lucide-react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';

interface AdminImageManagerProps {
    children: React.ReactNode;
    isAdmin: boolean;
    uploadKey: string;
    variant?: 'replace' | 'add';
    isDefault?: boolean;
    showDelete?: boolean;
}

const AdminImageManager: React.FC<AdminImageManagerProps> = ({ children, isAdmin, uploadKey, variant = 'replace', isDefault = false, showDelete = true }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [, setDragCounter] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isAdmin) return <>{children}</>;

    const handleUpload = async (file: File) => {
        try {
            setIsUploading(true);
            setUploadProgress(20);

            // ImgBB는 일반적으로 32MB 파일 제한을 가집니다. (안전을 위해 15MB 제한)
            if (file.size > 15 * 1024 * 1024) {
                alert('이미지 크기가 너무 큽니다. (최대 15MB)');
                setIsUploading(false);
                return;
            }

            const formData = new FormData();
            formData.append('image', file);

            // ImgBB API 호출
            const IMGBB_API_KEY = "4a58aae2abcd405b96dbc95a72307063";
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            setUploadProgress(60);
            const data = await response.json();

            if (data.success) {
                const downloadURL = data.data.url;

                // Firestore 통합 관리 문서 업데이트 (텍스트 업로드는 정상 작동하므로 텍스트로 저장)
                const docRef = doc(db, 'settings', 'image_overrides');
                const docSnap = await getDoc(docRef);
                const currentData = docSnap.exists() ? docSnap.data() : {};

                await setDoc(docRef, {
                    ...currentData,
                    [uploadKey]: downloadURL
                });

                setUploadProgress(100);
                alert('이미지가 성공적으로 교체/추가되었습니다.');
            } else {
                alert(`업로드 실패: ${data.error?.message || '알 수 없는 오류'}`);
            }

        } catch (error) {
            console.error('Upload catch error:', error);
            if (error instanceof Error) {
                alert(`에러 발생: ${error.message}`);
            } else {
                alert('업로드 완료 후 데이터를 저장하는 중 알 수 없는 오류가 발생했습니다.');
            }
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!window.confirm('기본 이미지로 되돌리시겠습니까?')) return;

        try {
            setIsUploading(true);
            const docRef = doc(db, 'settings', 'image_overrides');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                await updateDoc(docRef, {
                    [uploadKey]: deleteField()
                });
            }
            alert('기본 이미지로 복원되었습니다.');
            window.location.reload(); // 확실한 UI 초기화를 위한 새로고침 처리
        } catch (error) {
            console.error('Delete error:', error);
            alert(`삭제 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div
            className={`relative group/admin-img w-full h-full ${isDragOver ? 'ring-4 ring-emerald-500 ring-inset scale-[0.99] transition-transform' : ''}`}
            onDragEnter={(e) => {
                e.preventDefault();
                setDragCounter((prev) => prev + 1);
                setIsDragOver(true);
            }}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setDragCounter((prev) => {
                    const newCount = prev - 1;
                    if (newCount === 0) {
                        setIsDragOver(false);
                    }
                    return newCount;
                });
            }}
            onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragCounter(0);
                setIsDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    handleUpload(file);
                } else {
                    alert('이미지 파일만 업로드 가능합니다.');
                }
            }}
            onClick={() => {
                if (variant === 'add' && !isUploading) {
                    fileInputRef.current?.click();
                }
            }}
        >
            {children}

            {/* 추가(add) 모드일 때 사용할 숨겨진 input */}
            {variant === 'add' && (
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleUpload(file);
                        }
                        e.target.value = '';
                    }}
                />
            )}

            {/* 드래그 중이거나 업로드 중일 때만 전체 화면을 덮는 오버레이 */}
            {/* z-index를 높이고 레이아웃 구조를 확실히 잡습니다 */}
            <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[999] flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none rounded-inherit ${isDragOver || isUploading ? 'opacity-100' : 'opacity-0'}`}>
                {isUploading ? (
                    <div className="flex flex-col items-center space-y-3">
                        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
                        <span className="text-white font-black text-sm bg-black/60 px-3 py-1 rounded-full">{uploadProgress}% 업로드 중...</span>
                    </div>
                ) : isDragOver ? (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="bg-emerald-500 p-4 rounded-full shadow-2xl animate-bounce">
                            <Upload className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-white text-base md:text-lg font-black uppercase tracking-wider bg-black/80 px-4 py-2 rounded-full backdrop-blur-md whitespace-nowrap border border-white/20 shadow-2xl">
                            {variant === 'replace' ? '이 자리에 사진 교체' : '새 슬라이드 사진 추가'}
                        </span>
                    </div>
                ) : null}
            </div>

            {/* 평상시 마우스 오버 상태일 때 우측 상단에 작게 표시되는 UI (교체 모드에서만 표시) */}
            {!isDragOver && !isUploading && variant === 'replace' && (
                <div className="absolute top-3 right-3 z-[998] flex items-center gap-2 opacity-0 group-hover/admin-img:opacity-100 transition-all duration-300 transform translate-y-[-4px] group-hover/admin-img:translate-y-0">
                    {isDefault && (
                        <div className="bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-lg shadow-lg border border-yellow-500/50 flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 bg-black rounded-full" />
                            기본 이미지
                        </div>
                    )}
                    <label className="flex items-center gap-1.5 bg-black/70 hover:bg-emerald-600 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 pointer-events-auto cursor-pointer shadow-xl transition-all hover:scale-105 active:scale-95 text-white">
                        <Upload size={12} />
                        <span className="text-[10px] font-black tracking-tight whitespace-nowrap">
                            사진 교체
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleUpload(file);
                                }
                                e.target.value = '';
                            }}
                        />
                    </label>
                    {showDelete && (
                        <button
                            onClick={handleDelete}
                            className="p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 pointer-events-auto border border-red-400/50"
                            title="삭제"
                        >
                            <Trash2 size={12} />
                        </button>
                    )}
                </div>
            )}
        </div >
    );
};

export default AdminImageManager;
