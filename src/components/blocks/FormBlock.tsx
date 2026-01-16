/**
 * FormBlock - Contact/newsletter form
 */

import { useState } from 'react';
import type { FormBlockProps, FormField } from '../../types/directus';

interface Props {
    props: FormBlockProps;
}

export function FormBlock({ props }: Props) {
    const { form_type, fields, submit_text, success_message } = props;
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // TODO: Submit to Directus or custom endpoint
        console.log('Form submitted:', { form_type, data });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto text-center py-12">
                <div className="text-4xl text-uan-accent mb-4">✓</div>
                <p className="text-xl text-uan-foreground">{success_message}</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white dark:bg-uan-secondary/10 rounded-lg p-6 shadow-md"
        >
            {fields.map((field, index) => (
                <FormFieldComponent key={index} field={field} />
            ))}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-uan-accent text-white py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {loading ? 'Submitting...' : submit_text}
            </button>
        </form>
    );
}

function FormFieldComponent({ field }: { field: FormField }) {
    const baseClass = "w-full px-4 py-2 border border-uan-border rounded-lg focus:outline-none focus:ring-2 focus:ring-uan-accent mb-4 bg-white dark:bg-uan-background";

    switch (field.type) {
        case 'textarea':
            return (
                <div>
                    <label className="block text-sm font-medium text-uan-foreground mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                        name={field.name}
                        required={field.required}
                        rows={4}
                        className={baseClass}
                    />
                </div>
            );

        case 'select':
            return (
                <div>
                    <label className="block text-sm font-medium text-uan-foreground mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <select name={field.name} required={field.required} className={baseClass}>
                        <option value="">Select...</option>
                        {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            );

        case 'checkbox':
            return (
                <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        name={field.name}
                        required={field.required}
                        className="w-4 h-4 text-uan-accent"
                    />
                    <span className="text-sm text-uan-foreground">{field.label}</span>
                </label>
            );

        default:
            return (
                <div>
                    <label className="block text-sm font-medium text-uan-foreground mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        className={baseClass}
                    />
                </div>
            );
    }
}

export default FormBlock;
