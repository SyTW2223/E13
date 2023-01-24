import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import fetch from 'cross-fetch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    
    nombre1 = "";
    nombre2 = "";
    nombre3 = "";
    nombre4 = "";
    nombre5 = "";
    nombre6 = "";
    url = null;
    n = ["","none"];


constructor(private authService: AuthService) { }

load_team(){
    let cookies = document.cookie.split(';');
    let team = cookies.find(cookie => cookie.startsWith(" team="));
    console.log(team)
    team = team.substring(6);
    if(team!=null){
        let lteam = team.split(",");
        for (let i = 0; i < lteam.length; i++) {
            if(lteam[i] != "") {
                this.getPokemonData([lteam[i],(i+1).toString()]);
            }
        }
    }else{
        console.log("No tienes equipo");
    }
}

update(){
    this.n[0] = (<HTMLInputElement>document.getElementById("search_q")).value;
    this.getPokemonData(this.n)
  }

save_team(){
    let cookies = document.cookie.split(';');
    let id = cookies.find(cookie => cookie.startsWith("id="));
    id = id.substring(3);
    console.log(id);
    let team = [this.nombre1, this.nombre2, this.nombre3, this.nombre4, this.nombre5, this.nombre6];
    console.log(team);
    this.authService.save_team(id, team).subscribe((res:any) =>{
      console.log(res);
    });
}
getPokemonData = async n => {

    let N = n[0].toLowerCase();
    console.log(N);
        
    this.url = `https://pokeapi.co/api/v2/pokemon/${N}`;
    const response = await fetch(this.url)
  
    if(response.status == 404 || response.statusText == 'Not Found'){
        alert("Pokemon not found")
        return
    }
  
    const pokemon = await response.json()
    let valorSelect;
    if (n[1] == "none") {
        valorSelect = (<HTMLSelectElement>document.getElementById("slot")).value;
    } else {
        valorSelect = n[1];
    }
    console.log(valorSelect);
    switch (valorSelect) {
        case "1": 
            this.nombre1 = pokemon.name;
            console.log(this.nombre1);
            (document.getElementById("update_img1") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "2": 
            this.nombre2 = pokemon.name;
            (document.getElementById("update_img2") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "3": 
            this.nombre3 = pokemon.name;
            (document.getElementById("update_img3") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "4": 
            this.nombre4 = pokemon.name;
            (document.getElementById("update_img4") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "5": 
            this.nombre5 = pokemon.name;
            (document.getElementById("update_img5") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        case "6": 
            this.nombre6 = pokemon.name;
            (document.getElementById("update_img6") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
            break;
    
        default: 
            break;      
    }
  
    
  }
}