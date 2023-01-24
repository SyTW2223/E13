import { Component } from '@angular/core';
import fetch from 'cross-fetch';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {

foto = null;
nombre = "";
url = null;
n = "";

stats = [];
total = null;
width = [];
tipo1 = "";
tipo2 = "";

update(){
  this.n = (<HTMLInputElement>document.getElementById("search_q")).value;
  this.getPokemonData(this.n)
}

getPokemonData = async n => {
  //document.getElementById('show_error').classList.remove('show')
  //document.getElementById('show_error').classList.add('hidden')
  n = n.toLowerCase();
      
  this.url = `https://pokeapi.co/api/v2/pokemon/${n}`;
  const response = await fetch(this.url)

  if(response.status == 404 || response.statusText == 'Not Found'){
    alert("Pokemon not found")
    return
  }

  const pokemon = await response.json()
  
  this.total = 0;
  this.nombre = pokemon.name;
  this.tipo1 =  pokemon.types[0].type.name;
  if (pokemon.types.length == 2){
    this.tipo2 = pokemon.types[1].type.name;
  }

  for (let i = 0; i < 6; i++) {
    this.stats[i] = pokemon.stats[i].base_stat;
    this.total = this.total + this.stats[i];
  }
  for(let i = 0; i < 6; i++){
    this.width[i] = (this.stats[i]/70) * 100;
  }

  (document.getElementById("update_img") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
  
  (document.getElementById("tipo1") as HTMLImageElement).src= 'assets/tipos/'+this.tipo1+'.png';
  if (this.tipo2 != ""){
    (document.getElementById("tipo2") as HTMLImageElement).src= 'assets/tipos/'+this.tipo2+'.png';
  } else {
    (document.getElementById("tipo2") as HTMLImageElement).src= "";
  }
  

  document.getElementById('ps').style.width = this.width[0] + "px";
  document.getElementById('atq').style.width = this.width[1] + "px";
  document.getElementById('def').style.width = this.width[2] + "px";
  document.getElementById('atqe').style.width = this.width[3] + "px";
  document.getElementById('defe').style.width = this.width[4] + "px";
  document.getElementById('vel').style.width = this.width[5] + "px";
  document.getElementById('total').style.width = (this.total/300)* 100 + "px";

  this.tipo2 = "";
}
//search_btn.addEventListener('click', () => getPokemonData(search_term.value))
}
