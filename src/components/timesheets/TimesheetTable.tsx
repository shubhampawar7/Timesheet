import { Link } from 'react-router-dom';
import type { TimesheetWeek } from '../../types';
import { Badge } from '../ui/Badge';
import { format, parseISO } from 'date-fns';
import { ArrowDown } from 'lucide-react';

interface TimesheetTableProps {
    weeks: TimesheetWeek[];
}

export function TimesheetTable({ weeks }: TimesheetTableProps) {
    const formatDateRange = (start: string, end: string) => {
        const s = parseISO(start);
        const e = parseISO(end);
        return `${format(s, 'd')} - ${format(e, 'd MMMM, yyyy')}`;
    };

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                                    WEEK # <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-4 py-3">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                                    DATE <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-4 py-3">
                                <div className="flex items-center gap-2 cursor-pointer hover:text-gray-700">
                                    STATUS <ArrowDown size={14} />
                                </div>
                            </th>
                            <th className="px-4 py-3 text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {weeks.map((week) => (
                            <tr key={week.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900">{week.weekNumber}</td>
                                <td className="px-4 py-3">{formatDateRange(week.startDate, week.endDate)}</td>
                                <td className="px-4 py-3">
                                    <Badge status={week.status} />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {week.status === 'completed' ? (
                                        <Link
                                            to={`/timesheets/${week.id}`}
                                            className="text-brand-600 hover:text-brand-700 font-medium"
                                        >
                                            View
                                        </Link>
                                    ) : week.status === 'incomplete' ? (
                                        <Link
                                            to={`/timesheets/${week.id}`}
                                            className="text-brand-600 hover:text-brand-700 font-medium"
                                        >
                                            Update
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/timesheets/${week.id}`}
                                            className="text-brand-600 hover:text-brand-700 font-medium"
                                        >
                                            Create
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {weeks.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No timesheets found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
