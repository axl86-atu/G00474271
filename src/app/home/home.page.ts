import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDataService } from '../services/my-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, FormsModule, IonButtons, IonIcon],
})
export class HomePage {
  
  movies: any[] = []; //holds the list of movies displayed on the page
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';
  searchString: string = ''; //bound to the search input via [(ngModel)] to capture the user's input

  constructor(private mhs: MyHttpService, private router: Router, private mds: MyDataService) {}

  //runs each time the page becomes active, loads trending movies by default
  ionViewWillEnter() {
    this.getTrending();
  }

  //fetches today's trending movies from the API
  async getTrending() {
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);

    // result.data holds the JSON body, the array we need is inside .results
    this.movies = result.data.results;

    //verifies the movies array is populated correctly
    console.log(this.movies);
  }

  //triggered when the Search button is clicked
  async search() {
    //fall back to trending if the search box is empty or whitespace
    if (this.searchString.trim() === '') {
      this.getTrending();
      return;
    }

    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/search/movie?query=' + this.searchString + '&api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    this.movies = result.data.results;

    //verifies the search results array
    console.log(this.movies);
  }

  async selectedMovie(movie: any) {
    await this.mds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);}

    goFavourites() {
      this.router.navigate(['/favourites']);
    }
}