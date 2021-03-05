import React from "react";
//import {url} from '../config'

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

const axios = require('axios').default;

const url = 'http://localhost:8080/api';

function Login() {

  const validateUserData = (id = "111111111" , password = "1111111" ) => {

    axios.get(url + '/users/' + id)
    .then((data) => {
      // handling success
      redirectToMain()
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })


    // axios.get(URL + '/users?id=' +id+ '&password=' + password)
    // .then((data) => {
    //   // handling success
    //   redirectToMain()
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Usuario</label>
                        <Form.Control
                          placeholder="Usuario"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="5">
                      <Form.Group>
                        <label>Clave</label>
                        <Form.Control
                          defaultValue="*****"
                          placeholder="Clave"
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Button
                    className="btn btn-primary btn-block"
                    type="submit"
                    variant="primary"
                    onClick={() => validateUserData(true)}    
                  >
                    Login
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

export default Login;