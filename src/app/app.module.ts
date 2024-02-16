import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigFormsService } from './services/config/config-forms/config-forms.service';
import { AuthInterceptor } from './services/auth-interceptor/auth-interceptor';
import { UserService } from './services/user/user.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ConfigFormsService,
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,  
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp, 
      deps: [ConfigFormsService],
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function initializeApp(config: ConfigFormsService) {
  return () => config.loadPromise().then(() => {});
}
