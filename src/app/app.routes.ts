import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { guardGuard } from './guard/guard.guard';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"browse",
        component:BrowseComponent,
        canActivate:[guardGuard]
    },
    {
        path:"**",
        redirectTo:"login"
    }
];
