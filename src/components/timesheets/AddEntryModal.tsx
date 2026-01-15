import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import type { TimesheetEntry } from '../../types';
import { Info, Minus, Plus } from 'lucide-react';

const entrySchema = z.object({
    projectName: z.string().min(1, 'Project is required'),
    workType: z.string().min(1, 'Type of work is required'),
    description: z.string().min(1, 'Description is required'),
    hours: z.coerce.number().min(0, 'Minimum 0 hours').max(24, 'Maximum 24 hours'),
});

type EntryFormData = z.infer<typeof entrySchema>;

interface AddEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EntryFormData) => Promise<void>;
    initialData?: TimesheetEntry | null;
    date: string;
}

export function AddEntryModal({ isOpen, onClose, onSubmit, initialData }: AddEntryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EntryFormData>({
        resolver: zodResolver(entrySchema) as any,
        defaultValues: {
            projectName: '',
            workType: '',
            description: '',
            hours: 0,
        },
    });

    const hours = watch('hours');

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                reset({
                    projectName: initialData.projectName,
                    workType: initialData.workType || 'Bug fixes',
                    description: initialData.description || '',
                    hours: initialData.hours,
                });
            } else {
                reset({
                    projectName: '',
                    workType: '',
                    description: '',
                    hours: 0,
                });
            }
        }
    }, [isOpen, initialData, reset]);

    const handleFormSubmit = async (data: EntryFormData) => {
        await onSubmit(data);
        onClose();
    };

    const handleIncrement = () => {
        if (hours < 24) setValue('hours', hours + 1);
    };

    const handleDecrement = () => {
        if (hours > 0) setValue('hours', hours - 1);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? 'Edit Entry' : 'Add New Entry'}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Project Select */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <label className="text-sm font-semibold text-gray-900">Select Project *</label>
                        <Info size={14} className="text-gray-400" />
                    </div>
                    <Select
                        className="w-full text-gray-900 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        {...register('projectName')}
                    >
                        <option value="" disabled hidden>Project Name</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Internal Tool">Internal Tool</option>
                    </Select>
                    {errors.projectName && <p className="mt-1 text-xs text-red-500">{errors.projectName.message}</p>}
                </div>

                {/* Type of Work */}
                <div>
                    <div className="flex items-center gap-1 mb-2">
                        <label className="text-sm font-semibold text-gray-900">Type of Work *</label>
                        <Info size={14} className="text-gray-400" />
                    </div>
                    <Select
                        className="w-full text-gray-900 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        {...register('workType')}
                    >
                        <option value="" disabled hidden>Bug fixes</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Testing">Testing</option>
                        <option value="Bug fixes">Bug fixes</option>
                    </Select>
                    {errors.workType && <p className="mt-1 text-xs text-red-500">{errors.workType.message}</p>}
                </div>

                {/* Task Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Task description *</label>
                    <textarea
                        {...register('description')}
                        className="w-full h-32 px-3 py-2 text-gray-900 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
                        placeholder="Write text here ..."
                    />
                    <p className="mt-1 text-xs text-gray-500">A note for extra info</p>
                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                </div>

                {/* Hours Counter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Hours *</label>
                    <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md bg-white">
                            <button
                                type="button"
                                onClick={handleDecrement}
                                className="p-3 text-gray-600 hover:bg-gray-50 rounded-l-md border-r border-gray-200"
                            >
                                <Minus size={16} />
                            </button>
                            <input
                                type="number"
                                className="w-16 text-center border-none p-0 focus:ring-0 text-gray-900 font-medium"
                                {...register('hours')}
                                readOnly
                            />
                            <button
                                type="button"
                                onClick={handleIncrement}
                                className="p-3 text-gray-600 hover:bg-gray-50 rounded-r-md border-l border-gray-200"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                    {errors.hours && <p className="mt-1 text-xs text-red-500">{errors.hours.message}</p>}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 font-medium shadow-sm"
                    >
                        {initialData ? 'Update entry' : 'Add entry'}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg py-2.5 font-medium"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
