import React from "react";

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

function Ruta() {
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
                          
                          
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Costo</label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Descripcion</label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Empresa</label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Provincia</label>
                        <Form.Control
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
  
                  </Row>
                 
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
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
