import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import fetch from 'cross-fetch';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {


    fotoA = null;
    nombreA = "";
    urlA = null;
    nA = "";
    
    statsA = [];
    totalA = null;
    widthA = [];
    tipo1A = "";
    tipo2A = "";

    fotoD = null;
    nombreD = "";
    urlD = null;
    nD = "";
    
    statsD = [];
    totalD = null;
    widthD = [];
    tipo1D = "";
    tipo2D = "";

    n = "";
    url = null;
    moveName = "";
    power = 0;
    moveType = "";
    cat = "";
    dealDamage = 0;


    constructor(public authService: AuthService) { }
    
    updateD(){
      this.nD = (<HTMLInputElement>document.getElementById("search_qD")).value;
      this.getPokemonDataD(this.nD)
    }

    updateA(){
        this.nA = (<HTMLInputElement>document.getElementById("search_qA")).value;
        this.getPokemonDataA(this.nA)
      }
    
    getPokemonDataD = async nD => {

      nD = nD.toLowerCase();
          
      this.urlA = `https://pokeapi.co/api/v2/pokemon/${nD}`;
      const response = await fetch(this.urlA)
    
      if(response.status == 404 || response.statusText == 'Not Found'){
        alert("Pokemon not found")
        return
      }
    
      const pokemon = await response.json()
      
      this.totalD = 0;
      this.nombreD = pokemon.name;
      this.tipo1D =  pokemon.types[0].type.name;
      if (pokemon.types.length == 2){
        this.tipo2D = pokemon.types[1].type.name;
      }
    
      for (let i = 0; i < 6; i++) {
        this.statsD[i] = pokemon.stats[i].base_stat;
        this.totalD = this.totalD + this.statsD[i];
      }
      for(let i = 0; i < 6; i++){
        this.widthD[i] = (this.statsD[i]/70) * 100;
      }
    
      (document.getElementById("update_imgD") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
      
      (document.getElementById("tipo1D") as HTMLImageElement).src= 'assets/tipos/'+this.tipo1D+'.png';
      if (this.tipo2D != ""){
        (document.getElementById("tipo2D") as HTMLImageElement).src= 'assets/tipos/'+this.tipo2D+'.png';
      } else {
        (document.getElementById("tipo2D") as HTMLImageElement).src= "";
      }
      
    
      document.getElementById('ps').style.width = this.widthD[0] + "px";
      document.getElementById('atq').style.width = this.widthD[1] + "px";
      document.getElementById('def').style.width = this.widthD[2] + "px";
      document.getElementById('atqe').style.width = this.widthD[3] + "px";
      document.getElementById('defe').style.width = this.widthD[4] + "px";
      document.getElementById('vel').style.width = this.widthD[5] + "px";
      document.getElementById('total').style.width = (this.totalD/300)* 100 + "px";
    
    }

    getPokemonDataA = async nA => {
        //document.getElementById('show_error').classList.remove('show')
        //document.getElementById('show_error').classList.add('hidden')
        nA = nA.toLowerCase();
            
        this.urlA = `https://pokeapi.co/api/v2/pokemon/${nA}`;
        const response = await fetch(this.urlA)
      
        if(response.status == 404 || response.statusText == 'Not Found'){
          alert("Pokemon not found")
          return
        }
      
        const pokemon = await response.json()
        
        this.totalA = 0;
        this.nombreA = pokemon.name;
        this.tipo1A =  pokemon.types[0].type.name;
        if (pokemon.types.length == 2){
          this.tipo2A = pokemon.types[1].type.name;
        }
      
        for (let i = 0; i < 6; i++) {
          this.statsA[i] = pokemon.stats[i].base_stat;
          this.totalA = this.totalA + this.statsA[i];
        }
        for(let i = 0; i < 6; i++){
          this.widthA[i] = (this.statsA[i]/70) * 100;
        }
      
        (document.getElementById("update_imgA") as HTMLImageElement).src= pokemon.sprites.other.dream_world.front_default;
        
        (document.getElementById("tipo1A") as HTMLImageElement).src= 'assets/tipos/'+this.tipo1A+'.png';
        if (this.tipo2A != ""){
          (document.getElementById("tipo2A") as HTMLImageElement).src= 'assets/tipos/'+this.tipo2A+'.png';
        } else {
          (document.getElementById("tipo2A") as HTMLImageElement).src= "";
        }
        
      
        document.getElementById('ps').style.width = this.widthA[0] + "px";
        document.getElementById('atq').style.width = this.widthA[1] + "px";
        document.getElementById('def').style.width = this.widthA[2] + "px";
        document.getElementById('atqe').style.width = this.widthA[3] + "px";
        document.getElementById('defe').style.width = this.widthA[4] + "px";
        document.getElementById('vel').style.width = this.widthA[5] + "px";
        document.getElementById('total').style.width = (this.totalA/300)* 100 + "px";
      
      }

      search() {
        this.n = (<HTMLInputElement>document.getElementById("search_q")).value;
        this.damage(this.n);
        
      }

      calculate() {
        this.authService.cal_dmg(this.tipo1A, this.tipo2A, this.tipo1D, this.tipo2D, this.power,this.moveType, this.statsA, this.statsD, this.cat).subscribe((res:any) =>{
          console.log(res);
          this.dealDamage = res.damage;
        });
        document.getElementById("dmg").style.visibility = "visible";
      }

      damage = async n => {
        n = n.toLowerCase();
          
        this.url = `https://pokeapi.co/api/v2/move/${n}`;
        const response = await fetch(this.url)
    
        if(response.status == 404 || response.statusText == 'Not Found'){
          alert("Move not found")
          return
        }
    
        const move = await response.json()

        this.moveName = move.name;
        this.moveName = this.moveName.charAt(0).toUpperCase() + this.moveName.slice(1);
        this.power = move.power;
        document.getElementById("power").style.visibility = "visible";
        this.moveType = move.type.name;
        this.cat = move.damage_class.name;

        (document.getElementById("moveType") as HTMLImageElement).src= 'assets/tipos/'+this.moveType+'.png';
      }

}