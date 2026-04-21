import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MovieDetailsPage {
  movie:any = {}; //hold the movie object we read back from storage

  constructor(private mds: MyDataService) { 

  }


  ionViewWillEnter() {
    this.loadMovie();
  }
  
  async loadMovie() {
    this.movie = await this.mds.get('selectedMovie');
    console.log(this.movie); //checking if movie obj's been captured
  }

}
