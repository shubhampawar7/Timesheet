import type { User } from '../types';
import { MOCK_USERS } from './mock-data';

const DELAY_MS = 500;

export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Dummy check
            const user = MOCK_USERS.find(u => u.email === email);

            if (user && password === 'password123') { // Simple password check for demo
                const token = btoa(JSON.stringify({ userId: user.id, email: user.email, exp: Date.now() + 3600000 }));
                resolve({ user, token });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, DELAY_MS);
    });
}

export async function getUserFromToken(token: string): Promise<User | null> {
    return new Promise((resolve) => {
        setTimeout(() => {
            try {
                const decoded = JSON.parse(atob(token));
                const user = MOCK_USERS.find(u => u.id === decoded.userId);
                resolve(user || null);
            } catch (e) {
                resolve(null);
            }
        }, DELAY_MS);
    });
}
