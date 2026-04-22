import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data';
import { Router } from '@angular/router';
import {addIcons} from 'ionicons';
import {home} from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon]
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(private mds: MyDataService, private router: Router) { 
    addIcons({ home });
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadFavourites();
  }

  async openMovie(movie: any) {
    await this.mds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }

  async loadFavourites() {
    this.favourites = await this.mds.getFavourites();
    console.log(this.favourites);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}