import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { expect } from '@jest/globals';
import fetch from 'cross-fetch';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [HttpClientModule]
      ,providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


it('Debería obtener el ID del usuario a partir de las cookies', () => {
    document.cookie = "id=" + 1111+";";
    let cookies = document.cookie.split(';');
    let id = cookies.find(cookie => cookie.startsWith("id="));

    expect(id).toBeDefined();
});

it('Debería obtener el equipo del usuario', () => {
    let team = [component.nombre1, component.nombre2, component.nombre3, component.nombre4, component.nombre5, component.nombre6];

    expect(team).toBeDefined();
});

it('Debe devolver un error cuando el pokemon no existe', async () => {
    let n = ['pik'];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    expect(response.status).toBe(404);
});

it('Debe devolver el nombre del pokemon correcto', async () => {
    let n = ['pikachu'];
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    const pokemon = await response.json(); 
    expect(pokemon.name).toBe('pikachu'); 
}); 

})