import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class HomePage {
  movies: any[] = []; //array to hold movie data
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';

  constructor(private mhs: MyHttpService) {}

  ionViewWillEnter() {
    this.getTrending();
  }

  async getTrending() {
    let options: HttpOptions = {
      url: 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + this.API_KEY
    };
    let result = await this.mhs.get(options);
    this.movies = result.data.results;
    console.log(this.movies); //checking if obj is returned
  }
}
