import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import ScheduleTableRow from './ScheduleTableRow';
import AddEditScheduleSchool from './AddEditScheduleSchool';
import { format, getDaysInMonth } from 'date-fns';
import HeaderTable from './HeaderTable';
import ReadExelFile from '@/src/components/ReadExelFile';
import { useSchools } from '../schools/useSchools';
import { useSearchParams } from 'react-router-dom';

function ScheduleTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dataFromFile, setDataFromFile] = useState([])
    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")

    const { isLoading, schools, error } = useSchools()

    const numMonth = getDaysInMonth(new Date(date))
    const Days = Array.from({ length: numMonth }, (_, i) => i + 1)
    const isThisMonthAndAfter = format(date, "MM yyyy") >= format(new Date(), "MM yyyy")

    const filteredReports = dataFromFile?.filter((data) => String(data?.school).toLowerCase().includes(searchTerm.toLowerCase()))
    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />


    return (
        <>
            <div className="flex flex-wrap gap-3.5 my-4">
                <div className="relative w-md">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={`بحث ...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                <ReadExelFile setDataFromFile={setDataFromFile} />
                {isThisMonthAndAfter && <AddEditScheduleSchool />}
            </div>
            <div className="border rounded-lg">
                <Table className="table-auto">
                    <HeaderTable Days={Days} />
                    <TableBody>
                        {filteredReports?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8 + Days.length} className="text-center text-muted-foreground py-8">
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredReports?.map((report, index) => <ScheduleTableRow key={index} schoolId={schools.find(school => school.name === report.school)?._id} date={date} Days={Days} report={report} index={index + 1} />)
                        )
                        }
                    </TableBody>
                    {filteredReports?.length !== 0 && <TableFooter>
                        <TableRow>
                            {/* <TableCell className="text-start pr-50 text-lg" colSpan={5 + Days.length}>الإجمالي الشهري للمشروع</TableCell>
                            <TableCell >{reports.grandTotalOrders}</TableCell>
                            <TableCell >{reports.grandTotalCapacity}</TableCell>
                            <TableCell >{reports.grandTotalPrice}</TableCell> */}
                        </TableRow>
                    </TableFooter>}
                </Table>
            </div>
        </>
    )
}

export default ScheduleTable