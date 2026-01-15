import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, label, error, id, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <select
                    id={id}
                    className={cn(
                        'flex h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-red-500',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);
Select.displayName = 'Select';

export { Select };
