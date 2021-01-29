import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './_routing/app-routing.module';

// component
import { AppInit } from 'src/app/_core/init/appInit';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { HeaderComponent } from './_components/header/header.component';

// primeng component
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';

// external modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyAOY0jxe9YSwMtXQNv2IDa9vIkAhIKPT5I",
  authDomain: "instaclone-a71d4.firebaseapp.com",
  projectId: "instaclone-a71d4",
  storageBucket: "instaclone-a71d4.appspot.com",
  messagingSenderId: "682122708317",
  appId: "1:682122708317:web:4f83b9cdecfd0039f714b4"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    // 3. Initialize
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    TooltipModule,
    AutoCompleteModule,
    MultiSelectModule
  ],
  providers: [
    AppInit
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
