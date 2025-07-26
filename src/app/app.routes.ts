import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        pathMatch:"full",
        redirectTo: "home",
    },
    {
        path: "",
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then((m) => m.default),
        children: [
            {
                path:"home",
                loadComponent: () => import('./views/home/home.component').then((m) => m.HomeComponent)
            }
        ]
    }
];
