import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenVerifyComponent } from './components/token-verify/token-verify.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: 'verify-email/:token',
    component: TokenVerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
