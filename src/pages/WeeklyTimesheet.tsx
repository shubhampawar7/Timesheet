import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eachDayOfInterval, format, parseISO, isSameDay } from 'date-fns';
import type { TimesheetWeek, TimesheetEntry } from '../types';
import * as timesheetApi from '../api/timesheets';
import { Button } from '../components/ui/Button';
import { AddEntryModal } from '../components/timesheets/AddEntryModal';
import { ArrowLeft, MoreHorizontal, Plus, Loader2, Trash2, Edit2 } from 'lucide-react';
import { cn } from '../utils/cn';

export function WeeklyTimesheet() {
    const { weekId } = useParams<{ weekId: string }>();
    const navigate = useNavigate();

    const [week, setWeek] = useState<TimesheetWeek | null>(null);
    const [entries, setEntries] = useState<TimesheetEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, [weekId]);

    const fetchData = async () => {
        if (!weekId) return;
        setLoading(true);
        try {
            const data = await timesheetApi.getWeekDetails(weekId);
            setWeek(data.week);
            setEntries(data.entries);
        } catch (error) {
            console.error('Error fetching week details:', error);
            navigate('/dashboard');
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = (date: string) => {
        setSelectedDate(date);
        setEditingEntry(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (entry: TimesheetEntry) => {
        setSelectedDate(entry.date);
        setEditingEntry(entry);
        setIsModalOpen(true);
        setMenuOpenId(null);
    };

    const handleDeleteClick = async (id: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            await timesheetApi.deleteEntry(id);
            fetchData();
        }
        setMenuOpenId(null);
    };

    const handleModalSubmit = async (data: { projectName: string; hours: number }) => {
        if (editingEntry) {
            await timesheetApi.updateEntry(editingEntry.id, data);
        } else {
            if (weekId) {
                await timesheetApi.createEntry({
                    weekId,
                    date: selectedDate,
                    ...data,
                });
            }
        }
        fetchData();
    };

    if (loading || !week) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
            </div>
        );
    }

    const days = eachDayOfInterval({
        start: parseISO(week.startDate),
        end: parseISO(week.endDate),
    });

    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
    const progressPercentage = Math.min((totalHours / 40) * 100, 100);

    return (
        <div>
            <div className="mb-8">
                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-brand-600 mb-2" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">This week's timesheet</h1>

                    <div className="w-full sm:w-64">
                        <div className="flex justify-between text-sm font-medium mb-1">
                            <span className="text-gray-500">{totalHours}/40 hrs</span>
                            <span className="text-gray-900">{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-400 transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                    {format(parseISO(week.startDate), 'd')} - {format(parseISO(week.endDate), 'd MMMM, yyyy')}
                </p>
            </div>

            <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {days.map((day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const dayEntries = entries.filter((e) => e.date === dateStr);
                    const isToday = isSameDay(day, new Date());

                    return (
                        <div key={dateStr} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                {/* Date Column */}
                                <div className="md:col-span-2 py-2">
                                    <span className={cn("text-sm font-semibold", isToday ? "text-brand-600" : "text-gray-900")}>
                                        {format(day, 'MMM d')}
                                    </span>
                                </div>

                                {/* Entries Column */}
                                <div className="md:col-span-10 space-y-3">
                                    {dayEntries.map((entry) => (
                                        <div
                                            key={entry.id}
                                            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 hover:border-gray-300 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-700">{entry.projectName}</span>

                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-gray-500 font-medium">{entry.hours} hrs</span>
                                                <span className="px-2 py-1 bg-blue-50 text-brand-700 text-xs rounded font-medium">Project Name</span>

                                                <div className="relative">
                                                    <button
                                                        onClick={() => setMenuOpenId(menuOpenId === entry.id ? null : entry.id)}
                                                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                                    >
                                                        <MoreHorizontal size={16} />
                                                    </button>

                                                    {menuOpenId === entry.id && (
                                                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                                                            <button
                                                                onClick={() => handleEditClick(entry)}
                                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                            >
                                                                <Edit2 size={14} /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(entry.id)}
                                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                            >
                                                                <Trash2 size={14} /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => handleAddClick(dateStr)}
                                        className="flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-3 text-sm font-medium text-gray-500 hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add new task
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <AddEntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingEntry}
                date={selectedDate}
            />
        </div>
    );
}
