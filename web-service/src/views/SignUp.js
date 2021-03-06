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


function SignUp() {
  return (
    <>
      <Container fluid >
        <Row>
          <Col md="8">
            <Card >
              <Card.Header>
                <Card.Title as="h4">Sign Up</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Cédula</label>
                        <Form.Control
                          placeholder="Cedula"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Clave</label>
                        <Form.Control
                          defaultValue="*****"
                          placeholder="Clave"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Primer Apellido</label>
                        <Form.Control
                          placeholder="Segundo Apellido"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Segundo Apellido</label>
                        <Form.Control
                          placeholder="Segundo Apellido"
                          type="text"
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
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Fecha de Nacimiento</label>
                        <Form.Control
                          placeholder="05-11-1998"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Button
                    className="btn btn-success btn-block btn-fill"
                    type="submit"
                    variant="success"
           
                    
                  >
                    Registrarse
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

export default SignUp;
