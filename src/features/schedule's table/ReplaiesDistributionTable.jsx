import React from 'react'
import HeaderTable from './HeaderTable'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog'
import { useSearchParams } from 'react-router-dom';
import { format, getDaysInMonth } from 'date-fns';
import { Table, TableBody } from '@/src/components/ui/table';
import ScheduleTableRow from './ScheduleTableRow';
import { useCreateOrder as useCreateOrders } from '../daily-orders/useCreateOrder';
import { Button } from '@/src/components/ui/button';


function generateRandomDistribution(numOfReplies, RequiredCapacity, date) {
    let remaining = numOfReplies;
    const distribution = [];
    const uniqeNums = []

    const numDays = getDaysInMonth(date)

    let i = 0
    while (remaining > 0) {
        const randomDay = Math.floor(Math.random() * numDays);

        if (randomDay != 0 && !uniqeNums.includes(randomDay)) {
            const dayDate = new Date(date).setDate(randomDay)
            uniqeNums.push(randomDay)
            distribution.push({ day: format(dayDate, "yyyy-MM-dd"), totalOrders: RequiredCapacity });
            remaining--;
            i++
        }
    }

    return distribution;
}

function ReplaiesDistributionTable({ title, data, open, onOpenChange }) {
    const { school, numOfReplies, RequiredCapacity } = data

    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")
    const { loading, createNewOrder: createNewOrders } = useCreateOrders()
    const monthLength = getDaysInMonth(date)

    const Days = Array.from({ length: monthLength }, (_, i) => i + 1)
    const detailsOfDays = generateRandomDistribution(+numOfReplies, +RequiredCapacity, date)
    const replyAfterDays = { ...data, detailsOfDays, school: title }

    const handleSave = () => {
        const finalResult = detailsOfDays.map(day => ({ school, RequiredCapacity, sendingDate: new Date(day.day) }))
        createNewOrders(
            finalResult,
            {
                onSuccess: (data) => {
                    onOpenChange(false)
                },
            }
        );
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl mx-auto">
                <DialogHeader>
                    <DialogTitle>{`التوزيع الشهري ل${title}`}</DialogTitle>
                </DialogHeader>
                <Table>
                    <HeaderTable Days={Days} />
                    <TableBody>
                        <ScheduleTableRow report={replyAfterDays} />
                    </TableBody>
                </Table>
                <DialogFooter>
                    <Button type="button" disabled={loading} variant="outline" onClick={() => { onOpenChange(false) }}>
                        إلغاء
                    </Button>
                    <Button type="submit" disabled={loading} onClick={handleSave}>حفظ</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default React.memo(ReplaiesDistributionTable)