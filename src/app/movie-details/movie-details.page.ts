import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';
import {addIcons} from 'ionicons';
import {home, heart} from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonAvatar, IonLabel, IonButton, IonButtons, IonIcon]
})
export class MovieDetailsPage {
  movie:any = {}; //hold the movie object we read back from storage
  cast: any[] = [];
  crew: any[] = [];
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';
  isFav: boolean = false;

  constructor(private mds: MyDataService, private mhs: MyHttpService, private router: Router) { 
    addIcons({ home, heart });
  }


  ionViewWillEnter() {
    this.loadMovie();
  }
  
  async loadMovie() {
    this.movie = await this.mds.get('selectedMovie');
    console.log(this.movie); //checking if movie obj's been captured
    await this.loadCredits();
    this.isFav = await this.mds.isFavourite(this.movie.id); //calling helper
  }

  async loadCredits() {
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/movie/' + this.movie.id + '/credits?api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    this.cast = result.data.cast;
    this.crew = result.data.crew;
    console.log('Cast:', this.cast);
    console.log('Crew:', this.crew);
  }

  async toggleFavourite() {
    if (this.isFav) {
      await this.mds.removeFavourite(this.movie.id);
      this.isFav = false;
    } else {
      await this.mds.addFavourite(this.movie);
      this.isFav = true;
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
  
  goFavourites() {
    this.router.navigate(['/favourites']);
  }

}
