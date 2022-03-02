import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { DictionaryComponent } from './moderator-views/dictionary/component/dictionary.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'category', component: DictionaryComponent},
  { path: 'user-role', component: DictionaryComponent},
  { path: 'person-role', component: DictionaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
