import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <Outlet />
            </main>
            <footer className="max-w-7xl mx-auto px-4 sm:px-8 pb-8">
                <div className="bg-white py-6 rounded-lg border border-gray-200 shadow-sm text-center text-sm text-gray-400">
                    © 2024 tentwenty. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
