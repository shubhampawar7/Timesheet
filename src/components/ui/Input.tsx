import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-900">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={id}
                    className={cn(
                        'flex h-12 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                        error && 'border-red-500 focus:ring-red-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
