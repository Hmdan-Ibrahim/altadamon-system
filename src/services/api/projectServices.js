import api from "./api"

export async function getProjects(filter) {
    const res = await api.get(`/projects`, { params: filter })
    console.log("getProjects", res.data);
    return res.data
}

export async function createProject(project) {
    const res = await api.post(`/projects`, project)
    console.log("createProject", res.data);
    return res.data
}

export async function updateProject({ projectID, project }) {
    const res = await api.patch(`/projects/${projectID}`, project)
    console.log("updateProject", res.data);
    return res.data
}

export async function deleteProject(projectID) {
    const res = await api.delete(`/projects/${projectID}`)
    console.log("deleteProject", res);
    return res
}
