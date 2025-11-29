import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label";

const SelectCom = ({ label, value, onValueChange, selectItems, disabled }) => {
    console.log("SelectCom", label, selectItems, value);
    const labelVal = selectItems.find(item => item.key === value)?.label

    return (
        <div className="min-w-45">
            <Label className={"mb-2.5 pr-1.5 text-2xl"}>{label}</Label>
            <Select
                value={value ?? ""}
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectTrigger>
                    <SelectValue placeholder={!selectItems.length ? `لا يوجد` : `أختر ${label}`}>{labelVal}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {selectItems.map((item) => <SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>)}
                </SelectContent>
            </Select>
        </div >
    )
}

export default SelectCom