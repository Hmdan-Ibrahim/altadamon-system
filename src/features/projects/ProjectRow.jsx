import React from 'react'
import AddEditProject from './AddEditProject'
import DeleteProject from './DeleteProject'
import { TableCell, TableRow } from '@/src/components/ui/table'

function ProjectRow({ project, index }) {
    const { _id: projectId, name, manager = {} } = project

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{manager?.name || '-'}</TableCell>
            <TableCell>{manager?.phone || '-'}</TableCell>
            <TableCell>
                <div className="flex items-center justify-center gap-2">
                    <AddEditProject project={project} />
                    <DeleteProject projectName={name} projectID={projectId} />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ProjectRow