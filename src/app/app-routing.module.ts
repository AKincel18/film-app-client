import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/component/category.component';
import { LoginComponent } from './login/component/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
