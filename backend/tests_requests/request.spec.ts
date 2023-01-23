import 'mocha';
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { Usuario }from '../src/models/usuario';
import {Types} from '../src/routers/usuarioRouters/postDamage'
import {CalculatorComponent} from '../src/routers/usuarioRouters/postDamage'



chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /register', () => {
  beforeEach(async () => {
    // Clear the database before each test
    await Usuario.deleteMany({});
  });

  it('debe crear un nuevo usuario y devolver el estado 201', async () => {
    const plainPassword = '8888'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    const res = await chai.request(server)
      .post('/register')
      .send({
        nombre: "paula",
        contraseña: hashedPassword,
        equipo: ["","","","","",""] 
      });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('nombre', 'paula');
  });
  
});

describe('POST /login', () => {
  
  it('debe iniciar sesión y devolver estado 200 y los datos', async () => {
    const plainPassword = '9999'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    const user = new Usuario({
        nombre: 'ruben',
        contraseña: hashedPassword,
        equipo: ["","","","","",""]
    });
    await user.save();

    const res = await chai.request(server)
      .post('/login')
      .send({
        nombre: 'ruben',
        contraseña: plainPassword,
        equipo: ["","","","","",""]
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nombre', 'ruben');
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('equipo');
  });

  it('debe devolver el estado 401 si las credenciales no son válidas', async () => {
    const res = await chai.request(server)
      .post('/login')
      .send({
        nombre: 'paula',
        contraseña: 'wrongpassword',
        equipo: ["","","","","",""]
      });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('msg', 'Invalid credencial');
  });

  it('debe devolver el estado 404 si no se encuentra el usuario', async () => {
    const res = await chai.request(server)
      .post('/login')
      .send({
        nombre: 'wrongusername',
        contraseña: '9999',
        equipo: ["","","","","",""]
      });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('msg', 'Usuario incorrecto');
  });

});

describe('PATCH /usuario', () => {
  let id;
  beforeEach(async () => {
    // Clear the database and create a new user before each test
    await Usuario.deleteMany({});
    const user = new Usuario({
        nombre: 'dani',
        contraseña: '1111',
        equipo: ["","","","","",""]
    });
    await user.save();
    id = user._id;
  });

  it('debe actualizar el equipo del usuario y devolver el estado 200 y el equipo actualizado', async () => {
    const res = await chai.request(server)
      .patch(`/usuario?id=${id}`)
      .send({
        equipo: ["parasect","bulbasur","squirtle","aggron","metang","salamane"]
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nombre', 'dani');
    expect(res.body.equipo).to.deep.equal(["parasect","bulbasur","squirtle","aggron","metang","salamane"]);
  });

  it('debe devolver el estado 400 si no se proporciona el id', async () => {
    const res = await chai.request(server)
      .patch('/usuario')
      .send({
        equipo: ["parasect","bulbasur","squirtle","aggron","metang","salamane"]
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error', 'Se debe proveer un id');
  });

  it('debe devolver el estado 400 si no se permite la actualización', async () => {
    const res = await chai.request(server)
      .patch(`/usuario?id=${id}`)
      .send({
        invalidField: 'newvalue'
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error', 'Update is not permitted');
  });
});

describe('POST /damagecalculator', () => {
  let calculator;
  beforeEach(() => {
      calculator = new CalculatorComponent();
  });

  it('debe calcular el daño causado por un movimiento y devolverlo', (done) => {
      const moveData = {
          cat: "special",
          statsA: [1,100,100,100,100],
          tipo1A: Types[1],
          tipo2A: "",
          statsD: [1,100,100,100,100],
          tipo1D: Types[6],
          tipo2D: "",
          power: 50,
          moveType: Types[1]
      };

      chai.request(server)
          .post('/damage')
          .send(moveData)
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.damage).to.equal(72.6);
              done();
          });
          after(() => {
            server.close();
          });
  });
});