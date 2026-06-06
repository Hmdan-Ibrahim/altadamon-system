import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { useMemo, useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { useDailyOrders } from './useDailyOrders';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import AddEditOrder from './AddEditOrder';
import DailyOrderRow from './DailyOrderRow';
import { isBefore, startOfDay } from 'date-fns';
import PrintPortal from '@/src/components/layout/PrintPortal';
import DailyOrdersTableHeader from './DailyOrdersTableHeader';
import { FieldSelect } from '@/src/components/FieldSelect';

const searchFields = [
    { key: "school", label: "المدرسة" },
    { key: "operator", label: "المشغل" },
    { key: "supervisor", label: "المشرف" },
    { key: "transporter", label: "الموصل" },
    { key: "orderType", label: "نوع الطلب" },
    { key: "well", label: "التحلية" },
    { key: "status", label: "حالة الطلب" },
]

function DailyOrdersTable() {
    const [searchBy, setSearchBy] = useState("school");
    const [searchTerm, setSearchTerm] = useState("")
    const { isLoading, dailyOrders, date, error } = useDailyOrders()
    const beforeToday = isBefore(startOfDay(date), startOfDay(new Date()));

    const filteredOrders = useMemo(() => {
        return (
            dailyOrders?.filter((order) => {
                return String(order?.[searchBy]?.name || order?.[searchBy])
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            }) || []
        );
    }, [dailyOrders, searchTerm]);

    if (isLoading) return <h1 className="text-3xl font-bold mt-2">جاري التحميل.....</h1>
    if (error) return <Error text={handleError(error)} />

    return (
        <>
            <div className="flex flex-col flex-wrap gap-3.5 md:flex-row my-4">
                <FieldSelect value={searchBy} onChange={setSearchBy} fields={searchFields} />
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={`بحث عن مدرسة ...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                <AddEditOrder />
            </div>
            <PrintPortal>
                <div className="border rounded-lg">
                    <Table>
                        <DailyOrdersTableHeader />
                        <TableBody>
                            {filteredOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={13} className="text-center text-muted-foreground py-8">
                                        لا توجد بيانات
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOrders.map((order, index) => <DailyOrderRow key={order._id} order={order} index={index + 1} beforeToday={beforeToday} />)
                            )
                            }
                        </TableBody>
                        {filteredOrders?.length !== 0 && <TableFooter>
                            <TableRow>
                                <TableCell className="text-start pr-50 text-lg" colSpan={9}>الإجمالي</TableCell>
                            </TableRow>
                        </TableFooter>}
                    </Table>
                </div>
            </PrintPortal>
        </>
    )
}

export default DailyOrdersTable
