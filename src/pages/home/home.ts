import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import  { ANIMALES } from "../../data/data.animales";

import { Animal } from "../../interfaces/animal.interface"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor() {

    this.animales = ANIMALES.splice(0);

  }

  reproducir( animal:Animal ){

    this.pausar_audio ( animal );

    if( animal.reproduciendo ){
      animal.reproduciendo = false;
      return;
    }

    console.log( animal );

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion * 1000 );

  }

private pausar_audio( animalSel:Animal ){

  clearTimeout( this.audioTiempo );

  this.audio.pause();
  this.audio.currentTime = 0;

  for( let animal of this.animales){

    if( animal.nombre != animalSel.nombre ){
      animal.reproduciendo = false;
    }
  }

}

}
