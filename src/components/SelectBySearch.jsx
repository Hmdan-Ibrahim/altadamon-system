import * as React from "react"
import { ChevronsDown } from "lucide-react"
import { Button } from "./ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command"
import { Label } from "./ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const SelectBySearch = ({ label, value, onValueChange, selectItems, disabled }) => {
    const [open, setOpen] = React.useState(false)

    const selectedLabel =
        selectItems.find((item) => item.key === value)?.label || ""

    return (
        <div className="min-w-45">
            <Dialog open={open} onOpenChange={disabled ? () => { } : setOpen}>
                <Label className="mb-2.5 pr-1.5 text-2xl">{label}</Label>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        disabled={disabled}
                        role="combobox"
                        className="w-full justify-between"
                    >
                        {selectedLabel || `أختر ${label}`}
                        <ChevronsDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                </DialogTrigger >

                {!disabled && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{`${label}`}</DialogTitle>
                        </DialogHeader>
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
                    </DialogContent >
                )}
            </Dialog >
        </div>
    )
}

export default SelectBySearch
