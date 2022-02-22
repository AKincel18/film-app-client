import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { CategoryComponent } from './moderator-views/category/component/category.component';
import { PersonRoleComponent } from './moderator-views/personrole/component/personrole.component';
import { UserRoleComponent } from './moderator-views/userrole/component/userrole.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'user-role', component: UserRoleComponent},
  { path: 'person-role', component: PersonRoleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
