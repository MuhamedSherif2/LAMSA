import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import type { FieldError } from "react-hook-form";

interface IProps {
    label: string;
    type?: "text" | "file";
    placeholder?: string;
    error?: FieldError;

    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    ref?: React.Ref<HTMLInputElement>;
}

function UiInputCategory({
    label,
    name,
    type = "text",
    placeholder,
    error,
    onChange,
    onBlur,
    ref,
}: IProps) {
    return (
        <div className="space-y-2">

            <Label htmlFor={name}>
                {label}
            </Label>

            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error.message}
                </p>
            )}

        </div>
    );
}

export default UiInputCategory;