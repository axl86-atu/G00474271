import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDataService } from '../services/my-data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons'; //https://ionicframework.com/docs/angular/build-options#standalone

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, FormsModule, IonButtons, IonIcon, IonSpinner],
})
export class HomePage {

  movies: any[] = []; //holds the list of movies displayed on the page
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';
  searchString: string = ''; //bound to the search input via [(ngModel)] to capture the user's input
  //heading shown above the movie list, updated only when getTrending or search runs
  heading: string = "Today's Trending Movies";
  loading: boolean = false;

  constructor(private mhs: MyHttpService, private router: Router, private mds: MyDataService) {
    addIcons({ heart });
  }

  //runs each time the page becomes active, loads trending movies by default
  ionViewWillEnter() {
    this.getTrending();
    this.searchString = '';
  }

  //fetches today's trending movies from the API
  async getTrending() {
    this.loading = true; //start spinner
    //reset the heading whenever trending is loaded
    this.heading = "Today's Trending Movies";
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    //result.data holds the JSON body, the array we need is inside .results
    this.movies = result.data.results;
    //verifies the movies array is populated correctly
    this.loading = false;//stop spinner
    console.log(this.movies);
  }

  //triggered when the Search button is clicked
  async search() {
    //fall back to trending if the search box is empty or whitespace
    if (this.searchString.trim() === '') {
      this.getTrending();
      return;
    }
    this.loading = true; //start spinner
    //update the heading to reflect the actual search performed
    this.heading = this.searchString + ' Movies';
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/search/movie?query=' + this.searchString + '&api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    this.movies = result.data.results;
    this.loading = false;//stop spinner
    //verifies the search results array
    console.log(this.movies);
  }

  async selectedMovie(movie: any) {
    await this.mds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }

  goFavourites() {
    this.router.navigate(['/favourites']);
  }
}