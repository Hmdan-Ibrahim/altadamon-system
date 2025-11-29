import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { useVehicles } from './useVehicles';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import AddEditVehicle from './AddEditVehicle';
import VehicleRow from './VehicleRow';

function VehiclesTable() {
    const { isLoading, vehicles, error } = useVehicles()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredVehicles = vehicles.filter((vehicle) => String(vehicle?.name).toLowerCase().includes(searchTerm.toLowerCase()))

    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />


    return (
        <>
            {/* <SelectCom label={"حقل البحث"}
                value={fieldFilter.label}
                onValueChange={setFieldFilter}
                selectItems={columns}
            /> */}
            <div className="relative  flex gap-3.5 my-4">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder={`بحث عن سيارة ...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                />
                <AddEditVehicle />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>م</TableHead>
                            <TableHead>رقم السيارة</TableHead>
                            <TableHead>السعة</TableHead>
                            <TableHead>السائق</TableHead>
                            <TableHead>الاجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredVehicles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredVehicles.map((vehicle, index) => <VehicleRow key={vehicle._id} vehicle={vehicle} index={index + 1} />)
                        )
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default VehiclesTable