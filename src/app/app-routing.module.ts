import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardPageModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'verify',
        loadChildren: './verify/verify.module#VerifyPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
