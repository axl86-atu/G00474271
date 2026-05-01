import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data';
import { Router } from '@angular/router';
import {addIcons} from 'ionicons';
import {home, trash} from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon]
})
export class FavouritesPage {
  favourites: any[] = [];

  constructor(private mds: MyDataService, private router: Router) { 
    addIcons({ home, trash });
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }
  //save the chosen movie to storage and open the details page
  async openMovie(movie: any) {
    await this.mds.set('selectedMovie', movie);
    this.router.navigate(['/movie-details']);
  }
  //read the saved favourites from storage every time the page is shown
  async loadFavourites() {
    this.favourites = await this.mds.getFavourites();
    console.log(this.favourites);
  }
  //remove the movie from storage, then reload the list so the card disappears immediately. Using helper
  async removeFromFavourites(movie: any) { 
    await this.mds.removeFavourite(movie.id);
    this.favourites = await this.mds.getFavourites();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}