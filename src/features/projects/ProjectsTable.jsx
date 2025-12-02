import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table';
import { useState } from 'react'
import { handleError } from '@/src/services/api/api';
import { useProjects } from './useProjects';
import ProjectRow from './ProjectRow';
import { Search } from 'lucide-react';
import { Input } from '@/src/components/ui/input';
import AddEditProject from './AddEditProject';

function ProjectTable() {

    const { isLoading, projects, error } = useProjects()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProjects = projects.filter((project) => String(project?.name).toLowerCase().includes(searchTerm.toLowerCase()))

    if (isLoading) return <h1>Loading.....</h1>
    if (error) return <Error text={handleError(error)} />


    return (
        <>
            <div className="flex flex-col flex-wrap gap-3.5 md:flex-row my-4">
                <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder={`بحث عن مشروع ...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>
                <AddEditProject />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>م</TableHead>
                            <TableHead>اسم المشروع</TableHead>
                            <TableHead>المدير</TableHead>
                            <TableHead>المحمول</TableHead>
                            <TableHead>الاجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProjects.map((project, index) => <ProjectRow key={project._id} project={project} index={index + 1} />)
                        )
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default ProjectTable