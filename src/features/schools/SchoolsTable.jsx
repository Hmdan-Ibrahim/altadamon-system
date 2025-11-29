import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { useSchools } from './useSchools';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import SchoolRow from './SchoolRow';
import AddEditSchool from './AddEditSchool';
import { useSearchParams } from 'react-router-dom';


function SchoolsTable() {

    const { isLoading, schools, error } = useSchools()
    const [searchTerm, setSearchTerm] = useState("")
    // const newParams = new URLSearchParams(searchParams);

    const [searchParams] = useSearchParams()
    const filteredSchools = schools.filter((school) => String(school?.name).toLowerCase().includes(searchTerm.toLowerCase()))

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
                <AddEditSchool />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>م</TableHead>
                            <TableHead>اسم المدرسة</TableHead>
                            <TableHead>المشرف</TableHead>
                            <TableHead>الاجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
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