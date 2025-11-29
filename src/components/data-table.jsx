import React from "react"

import { Button } from "./ui/button"
import {  TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Edit, Trash2 } from "lucide-react"

export function DataTable({
    data,
    columns,
    onEdit,
    onDelete,
}) {


    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={index}>{column.label}</TableHead>
                        ))}
                        {(onEdit || onDelete) && <TableHead className="text-center">الإجراءات</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                                لا توجد بيانات
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item._id}>
                                {columns.map((column, index) => (
                                    <TableCell key={index}>
                                        {column.render ? column.render(item[column.key]) : String(item[column.key] || "-")}
                                    </TableCell>
                                ))}
                                {(onEdit || onDelete) && (
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-2">
                                            {onEdit && (
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}





// <TableRow key={item.id}>
//     {columns.map((column, index) => (
//         <TableCell key={index}>
//             {/* {column.render ? column.render(item) : String(item[column.key] || "-")} */}
//             {column.render ? column.render(item[column.key]) : String(item[column.key] || "-")}
//         </TableCell>
//     ))}
//     {(onEdit || onDelete) && (
//         <TableCell>
//             <div className="flex items-center gap-2">
//                 {onEdit && (
//                     <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
//                         <Edit className="w-4 h-4" />
//                     </Button>
//                 )}
//                 {onDelete && (
//                     <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
//                         <Trash2 className="w-4 h-4 text-destructive" />
//                     </Button>
//                 )}
//             </div>
//         </TableCell>
//     )}
// </TableRow>