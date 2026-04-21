import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data';
import { MyHttpService } from '../services/my-http';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonAvatar, IonLabel]
})
export class MovieDetailsPage {
  movie:any = {}; //hold the movie object we read back from storage
  cast: any[] = [];
  crew: any[] = [];
  API_KEY = '806536462a0bda2adf6e3b5c2e6b1aed';

  constructor(private mds: MyDataService, private mhs: MyHttpService) { 

  }


  ionViewWillEnter() {
    this.loadMovie();
  }
  
  async loadMovie() {
    this.movie = await this.mds.get('selectedMovie');
    console.log(this.movie); //checking if movie obj's been captured
    await this.loadCredits();
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

}
