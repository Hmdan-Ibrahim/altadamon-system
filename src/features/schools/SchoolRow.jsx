import { TableCell, TableRow } from '@/src/components/ui/table'
import React from 'react'
import AddEditSchool from './AddEditSchool'
import DeleteSchool from './DeleteSchool'
import AuthFeature from '@/src/components/gards/AuthFeature'
import { Roles } from '@/src/lib/utils/Entities'

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
            <AuthFeature roles={[Roles.ADMIN]}>
                <TableCell>
                    <div className="flex items-center justify-center gap-2">
                        <AddEditSchool school={school} />
                        <DeleteSchool schoolName={name} schoolID={schoolId} />
                    </div>
                </TableCell>
            </AuthFeature>
        </TableRow>
    )
}

export default SchoolRow