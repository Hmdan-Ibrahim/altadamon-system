import { TableCell, TableRow } from '@/src/components/ui/table'
import React from 'react'
import AddEditRegion from './AddEditRegion'
import DeleteRegion from './DeleteRegion'
import AuthFeature from '@/src/components/gards/AuthFeature'
import { Roles } from '@/src/lib/utils/Entities'

function RegionRow({ region, index }) {
    const { _id: regionId, name, manager = {} } = region

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{manager?.name || '-'}</TableCell>
            <TableCell>{manager?.phone}</TableCell>
            <AuthFeature roles={[Roles.ADMIN]}>
                <TableCell>
                    <div className="flex items-center justify-center gap-2">
                        {/* <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    </Button> */}
                        <AddEditRegion region={region} />
                        <DeleteRegion regionName={name} regionID={regionId} />
                    </div>
                </TableCell>
            </AuthFeature>
        </TableRow>
    )
}

export default RegionRow