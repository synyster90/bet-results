import { Routes, RouterModule } from '@angular/router';

import { Home } from './components/home/home.component';

const appRoutes: Routes = [
    { path: '', component: Home },
    { path: '**', redirectTo: '/' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);