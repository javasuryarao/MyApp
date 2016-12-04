import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppComponent }  from './app.component';
import { UserComponent }  from './components/user.component';
import { Ng2AutoCompleteModule }  from 'ng2-auto-complete';


@NgModule({
  imports:      [ BrowserModule, FormsModule, Ng2AutoCompleteModule],
  declarations: [ AppComponent, UserComponent ],
  bootstrap:    [ AppComponent, UserComponent ]
})
export class AppModule { }
