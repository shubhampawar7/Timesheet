import { useEffect, useState } from 'react';
import { TimesheetTable } from '../components/timesheets/TimesheetTable';
import { Select } from '../components/ui/Select';
import type { TimesheetWeek } from '../types';
import * as timesheetApi from '../api/timesheets';
import { Loader2 } from 'lucide-react';

export function Dashboard() {
    const [weeks, setWeeks] = useState<TimesheetWeek[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('this-month');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const fetchWeeks = async () => {
            setLoading(true);
            try {
                const data = await timesheetApi.getWeeklyTimesheets(
                    statusFilter !== 'all' ? statusFilter : undefined,
                    dateFilter
                );
                setWeeks(data);
                // Reset to page 1 on filter change
                setCurrentPage(1);
            } catch (error) {
                console.error('Failed to fetch timesheets', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeeks();
    }, [statusFilter, dateFilter]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWeeks = weeks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(weeks.length / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(p => p - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(p => p + 1);
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Your Timesheets</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-48">
                    <Select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    >
                        <option value="this-month">This Month</option>
                        <option value="last-month">Last Month</option>
                        <option value="all-time">All Time</option>
                    </Select>
                </div>
                <div className="w-full sm:w-48">
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                        <option value="missing">Missing</option>
                    </Select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
                </div>
            ) : (
                <>
                    <TimesheetTable weeks={currentWeeks} />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                        <div className="w-full sm:w-auto">
                            <Select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="w-full sm:w-32 bg-gray-50 border-transparent"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                            </Select>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-900 border rounded-l-md border-r-0 hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            {/* Simple pagination for demo - can be more complex if needed */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 text-sm border-t border-b ${currentPage === page
                                        ? 'bg-brand-50 text-brand-600 border border-brand-200 font-medium z-10'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 bg-white'
                                        } ${page !== 1 ? 'border-l-0' : 'border-l'}`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-900 border rounded-r-md border-l hover:bg-gray-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}
