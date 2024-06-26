import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, NgModel } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    AppComponent,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule { }
