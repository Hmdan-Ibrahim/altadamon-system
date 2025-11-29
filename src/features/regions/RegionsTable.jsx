import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import React from 'react'
import RegionRow from './RegionRow';
import { useRegions } from './useRegions';
import { handleError } from '@/src/services/api/api';

function RegionTable() {
    const { isLoading, regions, error } = useRegions()

    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />

    return (
        <>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>م</TableHead>
                            <TableHead>الاسم</TableHead>
                            <TableHead>المدير</TableHead>
                            <TableHead>المحمول</TableHead>
                            <TableHead>الاجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {regions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5 + 1} className="text-center text-muted-foreground py-8">
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        ) : (
                            regions.map((region, index) => <RegionRow key={region._id} region={region} index={index + 1} />)
                        )
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>الاجمالي</TableCell>
                            <TableCell colSpan={2}>{regions.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    )
}

export default RegionTable