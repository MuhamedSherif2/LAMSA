import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    fieldDescription?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputsFeild({
    label,
    name,
    type,
    placeholder,
    fieldDescription,
    value,
    onChange,
}: IProps) {
    return (
        <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>

            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />

            {fieldDescription && (
                <FieldDescription>{fieldDescription}</FieldDescription>
            )}
        </Field>
    );
}

export default InputsFeild;