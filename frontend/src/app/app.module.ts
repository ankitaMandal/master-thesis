import { WorkbenchComponent } from './workbench/workbench.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material';
import { StepperHorizontalComponent } from './settings/settings.component';
import { AnnotationAreaComponent } from './annotation-area/annotation-area.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { MaterialFileUploadComponent } from './material-file-upload/material-file-upload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'about', component: AboutComponent },
  { path: 'faq',      component: FaqComponent },
  { path: 'workbench',      component: WorkbenchComponent }]
@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    AboutComponent,
    MainNavComponent,
    FaqComponent,
    WorkbenchComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StepperHorizontalComponent,
    AnnotationAreaComponent,
    MaterialFileUploadComponent
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatStepperModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      { path: 'about', component: AboutComponent },
      { path: 'faq',      component: FaqComponent },
      { path: 'workbench',      component: WorkbenchComponent }
    ]),
    ScrollingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
