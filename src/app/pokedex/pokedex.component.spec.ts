import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { PokedexComponent } from './pokedex.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { expect } from '@jest/globals';
import { HttpClientModule } from '@angular/common/http';
import fetch from 'cross-fetch';


describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexComponent ],
      imports: [HttpClientModule]
      ,providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


   it('Debe devolver un error cuando el pokemon no existe', async () => {
    const n = ['pikac'];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    expect(response.status).toBe(404);
});

it('Debe devolver el nombre del pokemon correcto', async () => {
    const n = ['pikachu'];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    const pokemon = await response.json(); 
    expect(pokemon.name).toBe('pikachu'); 
}); 

});
