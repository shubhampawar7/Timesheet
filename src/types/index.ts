export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

export type TimesheetStatus = 'completed' | 'incomplete' | 'missing';

export interface TimesheetWeek {
    id: string;
    weekNumber: number;
    startDate: string; // ISO date string "YYYY-MM-DD"
    endDate: string; // ISO date string "YYYY-MM-DD"
    status: TimesheetStatus;
}

export interface TimesheetEntry {
    id: string;
    weekId: string;
    date: string; // ISO date string "YYYY-MM-DD"
    projectName: string;
    description?: string;
    workType?: string;
    hours: number;
}
