import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonIcon, IonButton, IonList, IonItem, IonAvatar, IonLabel]
})
export class DetailsPage {

  person: any = {};
  otherMovies: any[] = [];
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';

  constructor(private mds: MyDataService, private mhs: MyHttpService, private router: Router) { }


  ionViewWillEnter() {
    this.loadPerson();
  }
  //read the selected person from storage, then make two API calls one for their info, one for their movies
  async loadPerson() {
    let selected = await this.mds.get('selectedPerson');
    console.log('Selected person from storage:', selected); //checking

        //first API call gets the person's full info
    let infoOptions: HttpOptions = {
      url: 'https://api.themoviedb.org/3/person/' + selected.id + '?api_key=' + this.API_KEY
    };
    let infoResult = await this.mhs.get(infoOptions);
    this.person = infoResult.data;
    console.log('Person info:', this.person);

    //second API call gets the list of movies the person was in
    let creditsOptions: HttpOptions = {
      url: 'https://api.themoviedb.org/3/person/' + selected.id + '/movie_credits?api_key=' + this.API_KEY
    };
    let creditsResult = await this.mhs.get(creditsOptions);
    this.otherMovies = creditsResult.data.cast;
    console.log('Other movies:', this.otherMovies);
  }
//save the chosen movie to storage and open the movie details page
  async selectMovie(movie: any) {
    await this.mds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }


  //to add buttons
  goHome() {
    this.router.navigate(['/home']);
  }

  goFavourites() {
    this.router.navigate(['/favourites']);
  }
}