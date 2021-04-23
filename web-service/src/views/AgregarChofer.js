import React , { useState } from "react";
import config from "../config.json";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

function Chofer() {

  const { SERVER_URL } = config;
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const createDriver = (event) => {
    event.preventDefault();
    const newUser = {
      cedula: cedula,
      password:password,
      nombre:nombre,
      primerApellido:primerApellido,
      segundoApellido:segundoApellido,
      correo:correo,
      fechaNacimiento:fechaNacimiento,
      activo:true
    };
    axios.post(SERVER_URL + '/users/create', newUser)
    .then((data) => {
      // handling success
      console.log(data);

      const rolesToAdd = {
        cedula: cedula,
        roles: config.DRIVER_ROLE_NAME
      }

      axios.post(SERVER_URL + '/users/addRolesPerUser', rolesToAdd)
        .then((data) => {
          // handling success
          console.log(data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Agregar Chofer</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Cédula</label>
                        <Form.Control
                          placeholder="Cedula"
                          type="text"
                          onChange={(e) => setCedula(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                    <Form.Group>
                        <label>Clave</label>
                        <Form.Control
                          placeholder="Clave"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                    <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          placeholder="Nombre"
                          type="text"
                          onChange={(e) => setNombre(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                    <Form.Group>
                        <label>Primer Apellido</label>
                        <Form.Control
                          placeholder="Primer Apellido"
                          type="text"
                          onChange={(e) => setPrimerApellido(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Segundo Apellido</label>
                        <Form.Control
                          placeholder="Segundo Apellido"
                          type="text"
                          onChange={(e) => setSegundoApellido(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          onChange={(e) => setCorreo(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Fecha de Nacimiento</label>
                        <Form.Control
                          placeholder="05-11-1998"
                          type="text"
                          onChange={(e) => setFechaNacimiento(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>

  
                  </Row>
                 
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={createDriver} 

                  >
                    Crear Chofer
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
}

export default Chofer;
