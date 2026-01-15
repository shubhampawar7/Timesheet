import type { TimesheetEntry, TimesheetWeek, User } from '../types';

export const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Shubham Pawar',
        email: 'shubham@gmail.com',
        avatarUrl: 'https://ui-avatars.com/api/?name=Shubham+Pawar&background=2563EB&color=fff',
    },
    {
        id: '2',
        name: 'Test User',
        email: 'test@gmail.com',
        avatarUrl: 'https://ui-avatars.com/api/?name=Test+User&background=random',
    }
];

export const MOCK_WEEKS: TimesheetWeek[] = [
    {
        id: 'week-1',
        weekNumber: 1,
        startDate: '2026-01-01',
        endDate: '2026-01-05',
        status: 'completed',
    },
    {
        id: 'week-2',
        weekNumber: 2,
        startDate: '2026-01-08',
        endDate: '2026-01-12',
        status: 'completed',
    },
    {
        id: 'week-3',
        weekNumber: 3,
        startDate: '2026-01-15',
        endDate: '2026-01-19',
        status: 'incomplete', // ~20 hours
    },
    {
        id: 'week-4',
        weekNumber: 4,
        startDate: '2026-01-22',
        endDate: '2026-01-26',
        status: 'completed',
    },
    {
        id: 'week-5',
        weekNumber: 5,
        startDate: '2026-01-29',
        endDate: '2026-02-02',
        status: 'missing', // 0 hours
    },
    {
        id: 'week-0',
        weekNumber: 52,
        startDate: '2025-12-22',
        endDate: '2025-12-26',
        status: 'completed',
    }
];

export const MOCK_ENTRIES: TimesheetEntry[] = [
    // Week 0 - Last Month (Dec 2025)
    { id: '0001', weekId: 'week-0', date: '2025-12-22', projectName: 'Legacy Project', workType: 'Maintenance', description: 'Bug fixing', hours: 8 },
    { id: '0002', weekId: 'week-0', date: '2025-12-23', projectName: 'Legacy Project', workType: 'Maintenance', description: 'Bug fixing', hours: 8 },
    { id: '0003', weekId: 'week-0', date: '2025-12-24', projectName: 'Legacy Project', workType: 'Maintenance', description: 'Bug fixing', hours: 8 },
    { id: '0004', weekId: 'week-0', date: '2025-12-25', projectName: 'Legacy Project', workType: 'Maintenance', description: 'Off', hours: 0 },
    { id: '0005', weekId: 'week-0', date: '2025-12-26', projectName: 'Legacy Project', workType: 'Maintenance', description: 'Bug fixing', hours: 8 },

    // Week 1 - Completed (40 hours)
    { id: '001', weekId: 'week-1', date: '2026-01-01', projectName: 'Website Redesign', workType: 'Development', description: 'Frontend implementation', hours: 8 },
    { id: '002', weekId: 'week-1', date: '2026-01-02', projectName: 'Website Redesign', workType: 'Development', description: 'Frontend implementation', hours: 8 },
    { id: '003', weekId: 'week-1', date: '2026-01-03', projectName: 'Website Redesign', workType: 'Development', description: 'Frontend implementation', hours: 8 },
    { id: '004', weekId: 'week-1', date: '2026-01-04', projectName: 'Website Redesign', workType: 'Development', description: 'Frontend implementation', hours: 8 },
    { id: '005', weekId: 'week-1', date: '2026-01-05', projectName: 'Website Redesign', workType: 'Development', description: 'Frontend implementation', hours: 8 },

    // Week 2 - Completed (40 hours)
    { id: '011', weekId: 'week-2', date: '2026-01-08', projectName: 'Mobile App', workType: 'Design', description: 'UI Design for Profile', hours: 8 },
    { id: '012', weekId: 'week-2', date: '2026-01-09', projectName: 'Mobile App', workType: 'Design', description: 'UI Design for Profile', hours: 8 },
    { id: '013', weekId: 'week-2', date: '2026-01-10', projectName: 'Mobile App', workType: 'Design', description: 'UI Design for Settings', hours: 8 },
    { id: '014', weekId: 'week-2', date: '2026-01-11', projectName: 'Mobile App', workType: 'Design', description: 'UI Design for Settings', hours: 8 },
    { id: '015', weekId: 'week-2', date: '2026-01-12', projectName: 'Mobile App', workType: 'Design', description: 'UI Design for Settings', hours: 8 },

    // Week 3 - Incomplete
    { id: '101', weekId: 'week-3', date: '2026-01-15', projectName: 'Homepage Development', workType: 'Development', description: 'Hero section', hours: 4 },
    { id: '102', weekId: 'week-3', date: '2026-01-15', projectName: 'Homepage Development', workType: 'Development', description: 'Hero section', hours: 4 },

    { id: '103', weekId: 'week-3', date: '2026-01-16', projectName: 'Homepage Development', workType: 'Development', description: 'Header navigation', hours: 4 },
    { id: '104', weekId: 'week-3', date: '2026-01-16', projectName: 'Homepage Development', workType: 'Development', description: 'Header navigation', hours: 4 },

    // No entries for 17th

    { id: '105', weekId: 'week-3', date: '2026-01-18', projectName: 'Homepage Development', workType: 'Development', description: 'Footer', hours: 4 },

    // Week 4 - Completed (40 hours)
    { id: '201', weekId: 'week-4', date: '2026-01-22', projectName: 'Homepage Development', workType: 'Development', description: 'Feature implementation', hours: 8 },
    { id: '202', weekId: 'week-4', date: '2026-01-23', projectName: 'Homepage Development', workType: 'Development', description: 'Feature implementation', hours: 8 },
    { id: '203', weekId: 'week-4', date: '2026-01-24', projectName: 'Homepage Development', workType: 'Development', description: 'Feature implementation', hours: 8 },
    { id: '204', weekId: 'week-4', date: '2026-01-25', projectName: 'Homepage Development', workType: 'Development', description: 'Feature implementation', hours: 8 },
    { id: '205', weekId: 'week-4', date: '2026-01-26', projectName: 'Homepage Development', workType: 'Development', description: 'Feature implementation', hours: 8 },
];
