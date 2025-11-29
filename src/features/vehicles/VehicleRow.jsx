import { TableCell, TableRow } from '@/src/components/ui/table'
import React from 'react'

function VehicleRow({ vehicle, index }) {
    console.log("VehicleRow");

    const { _id: vehicleID, plateNumber, capacity, driver } = vehicle

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{plateNumber}</TableCell>
            <TableCell>{capacity}</TableCell>
            <TableCell>{driver || '-'}</TableCell>
            <TableCell>
                <div className="flex items-center justify-enter gap-2">
                    {/* <AddEditSchool school={school} /> */}
                    {/* <DeleteSchool schoolName={name} schoolId={vehicleID} /> */}
                </div>
            </TableCell>
        </TableRow>
    )
}

export default VehicleRow