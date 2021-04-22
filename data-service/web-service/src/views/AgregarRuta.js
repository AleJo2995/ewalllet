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

function Ruta() {

  const { SERVER_URL } = config;
  const [code, setCode] = useState('');
  const [cost, setCost] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [provincia, setProvincia] = useState('');


  const createRoute = (event) => {
    event.preventDefault();
    const newRoute = {
      code: code,
      cost:cost,
      name:nombre,
      description:descripcion,
      company:empresa,
      province:provincia
    };
    axios.post(SERVER_URL + '/routes/create', newRoute)
    .then((data) => {
      // handling success
      console.log(data);
     
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
                <Card.Title as="h4">Agregar Ruta</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Codigo</label>
                        <Form.Control
                          placeholder="Codigo"
                          type="text"
                          onChange={(e) => setCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Costo</label>
                        <Form.Control
                          placeholder="Costo"
                          type="text"
                          onChange={(e) => setCost(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Descripcion</label>
                        <Form.Control
                          placeholder="Descripcion"
                          type="text"
                          onChange={(e) => setDescripcion(e.target.value)}
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
                  
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Empresa</label>
                        <Form.Control
                          placeholder="Empresa"
                          type="text"
                          onChange={(e) => setEmpresa(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Provincia</label>
                        <Form.Control
                          placeholder="Provincia"
                          type="text"
                          onChange={(e) => setProvincia(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
  
                  </Row>
                 
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={createRoute} 
                  >
                    Crear Ruta
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

export default Ruta;
