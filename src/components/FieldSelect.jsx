import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Label } from './ui/label';

export function FieldSelect({ value, onChange, label, placeholder, disabled, fields = [] }) {
    return (
        <Select value={value} onValueChange={onChange} disabled={disabled} className="min-w-45">
            <div className="flex flex-col gap-3 min-w-45">
                {label && <Label>{label}</Label>}
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder || ""} />
                </SelectTrigger>
            </div>
            <SelectContent>
                {fields.map(field => <SelectItem key={field.key} value={field.key}>{field.label}</SelectItem>)}
            </SelectContent>
        </Select>
    );
}