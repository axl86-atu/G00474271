import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyDataService } from '../services/my-data';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, FormsModule, IonButtons, IonIcon, IonSpinner],
})
export class HomePage {
  movies: any[] = [];
  searchString: string = '';
  heading: string = "Today's Trending Movies";
  loading: boolean = false;
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';

  constructor(private mhs: MyHttpService, private router: Router, private mds: MyDataService) {
    addIcons({ heart });
  }

  //runs every time the page is shown, including when the user comes back from another page
  ionViewWillEnter() {
    this.getTrending();
    this.searchString = ''; //clear search box so old text does not stay
  }

  async getTrending() {
    this.loading = true;
    this.heading = "Today's Trending Movies"; //heading shown above the movie list, updated only when getTrending or search runs
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    //result is the full HTTP response, the actual movies array is at result.data.results
    this.movies = result.data.results;
    this.loading = false;
  }

  async search() {
    //if the search box is empty, just show trending movies again
    if (this.searchString.trim() === '') {
      this.getTrending();
      return;
    }
    this.loading = true;
    this.heading = this.searchString + ' Movies'; //set the heading to show what the user searched for, like "War Movies"
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/search/movie?query=' + this.searchString + '&api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    this.movies = result.data.results;
    this.loading = false;
  }

  //save the chosen movie to storage so the next page can read it back, then navigate
  async selectedMovie(movie: any) {
    await this.mds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }

  goFavourites() {
    this.router.navigate(['/favourites']);
  }
}