import type { TimesheetEntry, TimesheetWeek } from '../types';
import { MOCK_ENTRIES, MOCK_WEEKS } from './mock-data';

const DELAY_MS = 300;

// In-memory store for the session
let weeksStore = [...MOCK_WEEKS];
let entriesStore = [...MOCK_ENTRIES];

import { isSameMonth, subMonths, parseISO } from 'date-fns';

export async function getWeeklyTimesheets(statusFilter?: string, dateFilter: string = 'this-month'): Promise<TimesheetWeek[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredWeeks = weeksStore;

            // Apply Status Filter
            if (statusFilter && statusFilter !== 'all') {
                filteredWeeks = filteredWeeks.filter(w => w.status === statusFilter);
            }

            // Apply Date Filter
            const now = new Date();
            if (dateFilter === 'this-month') {
                filteredWeeks = filteredWeeks.filter(w =>
                    isSameMonth(parseISO(w.startDate), now) || isSameMonth(parseISO(w.endDate), now)
                );
            } else if (dateFilter === 'last-month') {
                const lastMonth = subMonths(now, 1);
                filteredWeeks = filteredWeeks.filter(w =>
                    isSameMonth(parseISO(w.startDate), lastMonth) || isSameMonth(parseISO(w.endDate), lastMonth)
                );
            }

            resolve(filteredWeeks);
        }, DELAY_MS);
    });
}

export async function getWeekDetails(weekId: string): Promise<{ week: TimesheetWeek; entries: TimesheetEntry[] }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const week = weeksStore.find(w => w.id === weekId);
            if (!week) {
                reject(new Error('Week not found'));
                return;
            }
            const entries = entriesStore.filter(e => e.weekId === weekId);
            resolve({ week, entries });
        }, DELAY_MS);
    });
}

export async function createEntry(entry: Omit<TimesheetEntry, 'id'>): Promise<TimesheetEntry> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newEntry: TimesheetEntry = {
                ...entry,
                id: Math.random().toString(36).substr(2, 9),
            };
            entriesStore.push(newEntry);
            updateWeekStatus(entry.weekId);
            resolve(newEntry);
        }, DELAY_MS);
    });
}

export async function updateEntry(id: string, updates: Partial<TimesheetEntry>): Promise<TimesheetEntry> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = entriesStore.findIndex(e => e.id === id);
            if (index === -1) {
                reject(new Error('Entry not found'));
                return;
            }
            entriesStore[index] = { ...entriesStore[index], ...updates };
            updateWeekStatus(entriesStore[index].weekId);
            resolve(entriesStore[index]);
        }, DELAY_MS);
    });
}

export async function deleteEntry(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const entry = entriesStore.find(e => e.id === id);
            if (!entry) {
                reject(new Error('Entry not found'));
                return;
            }
            const weekId = entry.weekId;
            entriesStore = entriesStore.filter(e => e.id !== id);
            updateWeekStatus(weekId);
            resolve();
        }, DELAY_MS);
    });
}

function updateWeekStatus(weekId: string) {
    const entries = entriesStore.filter(e => e.weekId === weekId);
    const totalHours = entries.reduce((acc, curr) => acc + curr.hours, 0);

    const weekIndex = weeksStore.findIndex(w => w.id === weekId);
    if (weekIndex !== -1) {
        let status: 'completed' | 'incomplete' | 'missing' = 'missing';
        if (totalHours >= 40) status = 'completed';
        else if (totalHours > 0) status = 'incomplete';

        weeksStore[weekIndex] = { ...weeksStore[weekIndex], status };
    }
}
