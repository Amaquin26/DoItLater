export const AUTH_API_ROUTE = {
    signup: "Auth/SignUp",
    signin: "Auth/SignIn",
}

export const TASK_API_ROUTE = {
    getAllUserOwned: 'TodoTask/GetAllUserOwned',
    getById: (id: number | string) => `TodoTask/GetById/${id}`,
    add: 'TodoTask/Add',
    update: 'TodoTask/Update',
    delete: (id: number | string) => `TodoTask/Delete/${id}`,
}

export const SUBTASK_API_ROUTE = {
    getAll: 'Subtask/GetAll',
    getAllByTaskId: (taskId: number | string) => `Subtask/GetAllByTaskId/${taskId}`,
    getById: (id: number | string) => `Subtask/GetById/${id}`,
    toggleCheck: (id: number | string) => `Subtask/ToggleCheck/${id}`,
    add: 'Subtask/Add',
    update: 'Subtask/Update',
    delete: (id: number | string) => `Subtask/Delete/${id}`,
}