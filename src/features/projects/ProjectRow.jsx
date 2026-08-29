import React from 'react'
import AddEditProject from './AddEditProject'
import DeleteProject from './DeleteProject'
import { TableCell, TableRow } from '@/src/components/ui/table'
import AuthFeature from '@/src/components/gards/AuthFeature'
import { Roles } from '@/src/lib/utils/Entities'

function ProjectRow({ project, index }) {
    const { _id: projectId, name, manager = {} } = project

    return (
        <TableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{manager?.name || '-'}</TableCell>
            <TableCell>{manager?.phone || '-'}</TableCell>
            <AuthFeature roles={[Roles.ADMIN]}>
                <TableCell>
                    <div className="flex items-center justify-center gap-2">
                        <AddEditProject project={project} />
                        <DeleteProject projectName={name} projectID={projectId} />
                    </div>
                </TableCell>
            </AuthFeature>
        </TableRow>
    )
}

export default ProjectRow