import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const from = (location.state as any)?.from?.pathname || '/dashboard';
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setServerError(null);
            await login(data.email, data.password);
            navigate(from, { replace: true });
        } catch (error) {
            setServerError('Invalid email or password');
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side - Form */}
            <div className="flex w-full md:w-1/2 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        {serverError && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="text-sm text-red-700">{serverError}</div>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            className="w-full bg-brand-600 hover:bg-brand-700"
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden w-1/2 bg-brand-600 md:flex flex-col justify-center px-12 text-white relative overflow-hidden">
                {/* Decorative circle/gradient could go here */}
                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-bold mb-6">ticktock</h1>
                    <p className="text-lg text-brand-100 leading-relaxed theme-font">
                        Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
                    </p>
                </div>
            </div>
        </div>
    );
}
