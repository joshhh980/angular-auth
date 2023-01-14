import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextfieldComponent } from './components/textfield/textfield.component';
import { LoginComponent } from './views/login/login.component';
import { FormControlPipe } from './pipes/form-control.pipe';
import { PasswordfieldComponent } from './components/passwordfield/passwordfield.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { PageComponent } from './components/page/page.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TextfieldComponent,
    LoginComponent,
    FormControlPipe,
    PasswordfieldComponent,
    ButtonComponent,
    PopUpComponent,
    PageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
