import { format } from 'date-fns'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Label } from './ui/label'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { formatDayMonthYear, formatMonthYear } from '@/src/lib/utils'
import { ChevronDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


function SelectDate({ showDay }) {
    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const date = searchParams.get("date")

    useEffect(() => {
        if (!date) {
            searchParams.set("date", format(new Date(), "yyyy-MM-dd"));
            setSearchParams(searchParams);
        }
        console.log("useEffect", searchParams.get("date"), formatDayMonthYear(new Date()), format(new Date(), "yyyy-MM-dd"));
    }, [searchParams, setSearchParams])

    console.log("select date", date);

    function handleChange(value) {
        if (!value) return;
        const newDate = value.toISOString();
        searchParams.set("date", newDate);
        setSearchParams(searchParams);

        console.log("handleChange", searchParams.get("date"), newDate, value);
    }

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                الشهر
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal"
                    >
                        {date ?
                            showDay ? formatDayMonthYear(date) : formatMonthYear(date) : "اختر تاريخ"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        timeZone="UTC"
                        selected={format(date, "yyyy-MM-dd")}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            handleChange(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default SelectDate