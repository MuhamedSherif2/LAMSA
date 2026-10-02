import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
    label: string;
    name: string;
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

function InputProduct({ label, name, type = 'text', placeholder, registration, error, }: IProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input id={name} type={type} placeholder={placeholder} {...registration} />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}

export default InputProduct;