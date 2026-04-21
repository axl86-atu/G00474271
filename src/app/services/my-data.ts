import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class MyDataService {
  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    await this.storage.create();

  }

  async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  async getFavourites(): Promise<any[]> {
    //read the favourites array from storage using the existing get method
    let favs = await this.get('favourites');
    //if storage returned something, return it as is
    if (favs) {
      return favs;
    } else {
      //if nothing is in storage yet, returns an empty array
      return [];
    }
  }
  
  async addFavourite(movie: any) {
    //get the current list of favourites
    let favs = await this.getFavourites();
    //add the new movie to the end of the array
    favs.push(movie);
    //save the updated array back to storage
    await this.set('favourites', favs);
  }
  
  async removeFavourite(movieId: number) {
    //get the current list of favourites
    let favs = await this.getFavourites();
    //create a new empty array to hold the movies we want to keep
    let newFavs = [];
    //loop through every movie currently saved
    for (let i = 0; i < favs.length; i++) {
      //if the current movie is NOT the one we want to remove, keep it
      if (favs[i].id !== movieId) {
        newFavs.push(favs[i]);
      }
    }
    //save the new array (without the removed movie) back to storage
    await this.set('favourites', newFavs);
  }
  
  async isFavourite(movieId: number): Promise<boolean> {
    //get the current list of favourites
    let favs = await this.getFavourites();
    //loop through every saved movie
    for (let i = 0; i < favs.length; i++) {
      //if the current movie's id matches the one we're checking, it's a favourite
      if (favs[i].id === movieId) {
        return true;
      }
    }
    //if the loop finishes without finding a match, the movie is not a favourite
    return false;
  }

  
}