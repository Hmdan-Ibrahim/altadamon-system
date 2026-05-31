import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';

export function SearchBySelect({ value, onChange }) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="نوع البحث" />
            </SelectTrigger>

            <SelectContent>

                <SelectItem value={"school"}>المدرسة</SelectItem>
                <SelectItem value="operator">المشغل</SelectItem>
                <SelectItem value="supervisor">المشرف</SelectItem>
                <SelectItem value="transporter">الموصل</SelectItem>
                <SelectItem value="orderType">نوع الطلب</SelectItem>
                <SelectItem value="status">حالة الطلب</SelectItem>
            </SelectContent>
        </Select>
    );
}