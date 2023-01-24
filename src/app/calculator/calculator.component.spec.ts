
import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { expect } from '@jest/globals';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import fetch from 'cross-fetch';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [HttpClientModule]
        ,providers: [JwtHelperService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}]}
   //   providers: [AuthService]
    ).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;

  }));

  it('should create the calculator component', () => {
    expect(component).toBeTruthy();
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



    it('should set the correct URL', () => {
        const n = 'fire-blast';
        const expectedURL = `https://pokeapi.co/api/v2/move/${n}`;

        component.damage(n);

        expect(component.url).toBe(expectedURL);
    });
    
    it('should show an alert when the move does not exist', async () => {
        const n = 'non-existent-move';

        jest.spyOn(window, 'alert');

        await component.damage(n);

        expect(window.alert).toHaveBeenCalledWith('Move not found');
    });
    
    it('should get the move name correctly', async () => {
        const n = 'fire-blast';

        await component.damage(n);

        expect(component.moveName).toBe('fire-blast');   // or whatever the name of the move is supposed to be 
    });

});