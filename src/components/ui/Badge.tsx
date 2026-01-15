import * as React from 'react';
import { cn } from '../../utils/cn';
import type { TimesheetStatus } from '../../types';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    status: TimesheetStatus;
}

export function Badge({ status, className, ...props }: BadgeProps) {
    const variants = {
        completed: 'bg-green-100 text-green-700 border-green-200',
        incomplete: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        missing: 'bg-red-50 text-red-600 border-red-100',
    };

    const labels = {
        completed: 'COMPLETED',
        incomplete: 'INCOMPLETE',
        missing: 'MISSING',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
                variants[status],
                className
            )}
            {...props}
        >
            {labels[status]}
        </div>
    );
}
