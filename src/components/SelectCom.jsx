// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";

// const SelectCom = ({ label, value, onValueChange, selectItems, disabled }) => {
//     console.log("SelectCom", label, selectItems, value);
//     const labelVal = selectItems.find(item => item.key === value)?.label

//     return (
//         <div className="min-w-45">
//             <Label className={"mb-2.5 pr-1.5 text-2xl"}>{label}</Label>
//             <Input />
//             <Select
//                 value={value ?? ""}
//                 onValueChange={onValueChange}
//                 disabled={disabled}

//             >
//                 <SelectTrigger>
//                     <SelectValue placeholder={!selectItems.length ? `لا يوجد` : `أختر ${label}`}>{labelVal}</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent className="overflow-auto max-h-100">
//                     {selectItems.map((item) => <SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>)}
//                 </SelectContent>
//             </Select>
//         </div >
//     )
// }

import * as React from "react"
import { ChevronsDown, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"
import { Label } from "./ui/label"

const SelectCom = ({ label, value, onValueChange, selectItems, disabled }) => {
    const [open, setOpen] = React.useState(false)

    const selectedLabel =
        selectItems.find((item) => item.key === value)?.label || ""

    return (
        <div className="min-w-45">
            <Label className="mb-2.5 pr-1.5 text-2xl">{label}</Label>

            <Popover open={open} onOpenChange={disabled ? () => { } : setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        role="combobox"
                        className="w-full justify-between"
                    >
                        {selectedLabel || `أختر ${label}`}
                        <ChevronsDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>

                {!disabled && (
                    <PopoverContent className="w-full p-0">
                        <Command>
                            {selectItems?.length > 8 && <CommandInput placeholder={`ابحث عن ${label}...`} />}

                            <CommandList className="max-h-72 overflow-auto pointer-events-auto">
                                <CommandEmpty>لا يوجد نتائج</CommandEmpty>

                                <CommandGroup>
                                    {selectItems.map((item) => (
                                        <CommandItem
                                            key={item.key}
                                            onSelect={() => {
                                                onValueChange(item.key)
                                                setOpen(false)
                                            }}
                                        >
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    )
}

export default SelectCom
