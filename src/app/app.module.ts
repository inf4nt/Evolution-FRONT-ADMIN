import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {DataTransferService} from './service/data-transfer.service';
import {NProgressService} from './service/nprogress.service';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {LoginComponent} from './security/component/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {SecurityModule} from './security/security.module';
import {AuthenticationService} from './security/authentication.service';
import {AdminModule} from './admin/admin.module';
import {HomeComponent} from './home/component/home/home.component';
import {HomeModule} from './home/home.module';


const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home/:id', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    SecurityModule,
    HomeModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [NProgressService, DataTransferService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
