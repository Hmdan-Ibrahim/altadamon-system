import { Table, TableBody, TableCell, TableRow } from '@/src/components/ui/table';
import { useMemo, useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { useSchools } from './useSchools';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import SchoolRow from './SchoolRow';
import AddEditSchool from './AddEditSchool';
import SchoolsTableHeader from './schoolsTableHeader';
import SelectCom from '@/src/components/SelectCom';


const schoolFields = [
    { key: "name", label: "المدرسة" },
    { key: "supervisor", label: "المشرف" },
    { key: "district", label: "المنطقة" },
    { key: "neighborhood", label: "الحي" },
    { key: "ministerialNumber", label: "الرقم الوزاري" },
]

function SchoolsTable() {
    const [searchBy, setSearchBy] = useState("name");

    const { isLoading, schools, error } = useSchools()
    const [searchTerm, setSearchTerm] = useState("")
    const filteredSchools = useMemo(() => {
        return (
            schools?.filter((school) => {
                return String(school?.[searchBy])
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            }) || []
        );
    }, [schools, searchTerm]);
    if (isLoading) return <h1>جاري التحميل....</h1>
    if (error) return <Error text={handleError(error.message)} />

    return (
        <>
            <div className="flex flex-col flex-wrap gap-3.5 md:flex-row my-4 items-end">
                <SelectCom
                    label={"حقل البحث"}
                    value={searchBy}
                    onValueChange={setSearchBy}
                    selectItems={schoolFields || []}
                />
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={`بحث عن مدرسة ...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                <AddEditSchool />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <SchoolsTableHeader />
                    <TableBody>
                        {filteredSchools.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredSchools.map((school, index) => <SchoolRow key={school._id} school={school} index={index + 1} />)
                        )
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default SchoolsTable