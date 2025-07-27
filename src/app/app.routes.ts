import { Routes } from '@angular/router';
import { AUTH_ROUTE, ROUTES } from './shared/constants/routes/routes.constants';

export const routes: Routes = [
    {
        path: "",
        pathMatch:"full",
        redirectTo: ROUTES.home,
    },
    {
        path: "",
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then((m) => m.default),
        children: [
            {
                path: ROUTES.home,
                loadComponent: () => import('./views/home/home.component').then((m) => m.HomeComponent)
            },
            {
                path: AUTH_ROUTE.login,
                loadComponent: () => import('./views/login/login.component/login.component').then((m) => m.LoginComponent)
            }
        ],
    }
];
