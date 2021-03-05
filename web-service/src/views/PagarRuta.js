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

function Pagar() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Pagar Ruta</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Ruta</label>
                        <Form.Control
                          defaultValue="Ruta 27"
                          disabled
                          placeholder="Ruta"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Monto</label>
                        <Form.Control
                          defaultValue="1000"
                          placeholder="Monto"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Número Tarjeta</label>
                        <Form.Control
                          defaultValue="60525056545957823"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>CVV</label>
                        <Form.Control
                          defaultValue="773"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="success"
                  >
                    Pagar
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

export default Pagar;