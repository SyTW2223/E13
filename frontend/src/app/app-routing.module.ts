import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { PokedexComponent } from './pokedex';
import { ProfileComponent } from './profile';
import { CalculatorComponent } from './calculator';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'pokedex', component: PokedexComponent },
    { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
    { path: 'calculator', component: CalculatorComponent },
    //{ path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]}

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
