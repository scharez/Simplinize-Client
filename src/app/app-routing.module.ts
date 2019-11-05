import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GroupComponent} from './dashboard/group/group.component';
import {RatingComponent} from './dashboard/rating/rating.component';
import {RaceComponent} from './dashboard/race/race.component';
import {AdminComponent} from './dashboard/admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {ErrorComponent} from './error/error.component';
import {OverviewComponent} from './dashboard/admin/overview/overview.component';
import {FamilyComponent} from './family/family.component';
import {FamilyHomeComponent} from './family/family-home/family-home.component';
import {DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'error', pathMatch: 'full' },
  { path: 'login', component: LoginComponent}, // ContactPerson and SkiTeacher
  { path: 'register', component: RegisterComponent}, // ContactPerson
  { path: 'error', component: ErrorComponent},
  { path: 'family', component: FamilyComponent, children: [
        { path: 'home', component: FamilyHomeComponent},
      ]},
  { path: 'dashboard', component: DashboardComponent, children: [ // SkiTeacher
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: DashboardHomeComponent},
      { path: 'group', component: GroupComponent},
      { path: 'rating', component: RatingComponent},
      { path: 'race', component: RaceComponent},
      { path: 'admin', component: AdminComponent, children: [
              { path: 'overview', component: OverviewComponent},
          ]}
      ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
