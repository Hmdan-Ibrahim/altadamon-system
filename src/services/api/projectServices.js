import api from "./api"

export async function getProjects(filter) {
    const res = await api.get(`/projects`, { params: filter })
    return res.data
}

export async function createProject(project) {
    const res = await api.post(`/projects`, project)
    return res.data
}

export async function updateProject({ projectID, project }) {
    const res = await api.patch(`/projects/${projectID}`, project)
    return res.data
}

export async function deleteProject(projectID) {
    const res = await api.delete(`/projects/${projectID}`)
    return res
}
