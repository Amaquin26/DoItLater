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