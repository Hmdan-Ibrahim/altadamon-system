import { TableCell, TableRow } from '@/src/components/ui/table'
import React from 'react'
import AddEditSchool from './AddEditSchool'
import DeleteSchool from './DeleteSchool'

function SchoolRow({ school, index }) {
    const { _id: schoolId, name, supervisor, district, neighborhood, ministerialNumber } = school

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{supervisor?.name || '-'}</TableCell>
            <TableCell>{district}</TableCell>
            <TableCell>{neighborhood}</TableCell>
            <TableCell>{ministerialNumber}</TableCell>
            <TableCell>
                <div className="flex items-center justify-center gap-2">
                    <AddEditSchool school={school} />
                    <DeleteSchool schoolName={name} schoolID={schoolId} />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default SchoolRow