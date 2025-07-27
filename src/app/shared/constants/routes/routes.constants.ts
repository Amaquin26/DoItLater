export const AUTH_ROUTE = {
    login: "auth/login",
    register: "auth/register",
}

export const ROUTES = {
    home: "home",
    task: "task/:id",
    getTask: (id: string | number) => `task/${id}`,
    createTask: "task/action/create",
    editTask: "task/action/edit/:id",
    editTaskRoute: (id: string | number) => `task/action/edit/${id}`,
}
