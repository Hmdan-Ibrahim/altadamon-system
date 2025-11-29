import api from "./api"

export async function getProjects(filter) {
    // try {
    const res = await api.get(`/projects`, { params: filter })
    console.log("getProjects", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error getProjects", error);
    //     return error
    // }
}

export async function createProject(project) {
    console.log("createProject", project);
    // try {
    const res = await api.post(`/projects`, project)
    console.log("createProject", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error createProject", error);
    //     return error
    // }
}

export async function updateProject({ projectID, project }) {
    console.log("updateProject", project);
    // try {
    const res = await api.patch(`/projects/${projectID}`, project)
    console.log("updateProject", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error updateProject", error);
    //     return error
    // }
}

export async function deleteProject(projectID) {
    console.log("deleteProject", projectID);
    // try {
    const res = await api.delete(`/projects/${projectID}`)
    console.log("deleteProject", res);
    return res

    // } catch (error) {
    //     console.log("Error deleteProject", error);
    //     return error
    // }
}
