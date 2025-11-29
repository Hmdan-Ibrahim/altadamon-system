import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { useDailyOrders } from './useDailyOrders';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import AddEditOrder from './AddEditOrder';
import DailyOrderRow from './DailyOrderRow';
import { format } from 'date-fns';
import PrintPortal from '@/src/components/layout/PrintPortal';


function DailyOrdersTable() {

    const [searchTerm, setSearchTerm] = useState("")
    const { isLoading, dailyOrders, date, error } = useDailyOrders()
    const beforeToday = format(date, "dd MM yyyy") < format(new Date(), "dd MM yyyy")

    const filteredOrders = dailyOrders.filter((order) => String(order?.school.name).toLowerCase().includes(searchTerm.toLowerCase()))

    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />
    // if (!searchParams.has("project")) return <h1 className='text-center p-10'>حدد المشروع</h1>


    return (
        <>
            <div className="flex flex-wrap gap-3.5 my-4">
                <div className="relative w-md">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={`بحث عن مدرسة ...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                {!beforeToday && <AddEditOrder />}
            </div>
            <PrintPortal>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow className='min-w-fit'>
                                <TableHead>م</TableHead>
                                <TableHead>المدرسة</TableHead>
                                <TableHead>المشرف</TableHead>
                                <TableHead className='min-w-fit'>السائق/المقاول</TableHead>
                                <TableHead>السيارة</TableHead>
                                <TableHead>المشغل</TableHead>
                                <TableHead>زمن التبليغ</TableHead>
                                <TableHead>زمن التنفيذ</TableHead>
                                <TableHead>البئر</TableHead>
                                <TableHead>السعة</TableHead>
                                <TableHead>السعر</TableHead>
                                {/* <TableHead>المبلغ</TableHead> */}
                                <TableHead>ملاحظات</TableHead>
                            </TableRow>
                        </TableHeader>
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
                                {/* <TableCell >{reports.grandTotalOrders}</TableCell>
                            <TableCell >{reports.grandTotalCapacity}</TableCell>
                            <TableCell >{reports.grandTotalPrice}</TableCell> */}
                            </TableRow>
                        </TableFooter>}
                    </Table>
                </div>
            </PrintPortal>
        </>
    )
}

export default DailyOrdersTable