import * as React from 'react';
import { X } from 'lucide-react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />
            <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <div className="px-6 py-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
