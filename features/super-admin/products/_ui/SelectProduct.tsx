import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import type { FieldError } from 'react-hook-form';

interface Option {
    _id: string;
    name: string;
}

interface IProps {
    label: string;
    name: string;
    placeholder?: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    error?: FieldError;
    disabled?: boolean;
    emptyMessage?: string;
}

function SelectProduct({ label, name, placeholder = 'choose', value, options, onChange, error, disabled = false, emptyMessage = "there is no options", }: IProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>

            <Select
                value={value}
                onValueChange={(val) => {
                    if (val !== null) onChange(val);
                }}
                disabled={disabled}
            >
                <SelectTrigger id={name}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {options.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                            {emptyMessage}
                        </div>
                    ) : (
                        options.map((option) => (
                            <SelectItem key={option._id} value={option._id}>
                                {option.name}
                            </SelectItem>
                        ))
                    )}
                </SelectContent>
            </Select>

            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
}

export default SelectProduct;