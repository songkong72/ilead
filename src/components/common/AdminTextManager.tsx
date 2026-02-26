import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AdminTextManagerProps {
    text: string;
    isAdmin: boolean;
    contentKey: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span';
    multiline?: boolean;
    placeholder?: string;
}

const AdminTextManager: React.FC<AdminTextManagerProps> = ({
    text: defaultText,
    isAdmin,
    contentKey,
    className = "",
    as: Component = 'span',
    multiline = false,
    placeholder = "내용을 입력하세요..."
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(defaultText);

    useEffect(() => {
        setText(defaultText);
    }, [defaultText]);

    if (!isAdmin) return <Component className={className}>{defaultText || ""}</Component>;

    const handleSave = async (newText: string) => {
        try {
            const docRef = doc(db, 'settings', 'image_overrides');
            const docSnap = await getDoc(docRef);
            const currentData = docSnap.exists() ? docSnap.data() : {};

            await setDoc(docRef, {
                ...currentData,
                [contentKey]: newText
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Text save error:', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    };

    if (isEditing) {
        return multiline ? (
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => handleSave(text)}
                className={`text-black px-3 py-2 rounded-xl border-2 border-emerald-500 bg-white outline-none w-full min-h-[150px] ${className}`}
                autoFocus
                placeholder={placeholder}
            />
        ) : (
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={() => handleSave(text)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave(text);
                    if (e.key === 'Escape') {
                        setText(defaultText);
                        setIsEditing(false);
                    }
                }}
                className={`text-black px-2 py-1 rounded-lg border-2 border-emerald-500 bg-white outline-none w-full ${className}`}
                autoFocus
                placeholder={placeholder}
            />
        );
    }

    return (
        <Component
            className={`${className} cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-all rounded px-1 -mx-1 group relative`}
            onClick={() => setIsEditing(true)}
            title="클릭하여 수정"
        >
            {defaultText || (
                <span className="text-gray-300 italic flex items-center gap-2">
                    {placeholder}
                </span>
            )}
            <span className="absolute -top-6 left-0 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">클릭하여 편집</span>
        </Component>
    );
};

export default AdminTextManager;
