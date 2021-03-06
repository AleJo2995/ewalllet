import React, {  useState } from 'react'
import { Link } from "react-router-dom";
import config from "../config.json";
import { useHistory } from "react-router-dom";

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



const axios = require('axios');

function Login() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();  

  const { SERVER_URL } = config;
  const validateUserData = () => {

    axios.get(SERVER_URL + '/users/validateUser', { params: { id: user, password:password}})
    .then((data) => {
      // handling success
      console.log(data);
      history.push('/admin/dashboard')
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    
    })
  }

  return (
    <>
      <Container  >
        <Row>
          <Col md="8">
            <Card >
              <Card.Header>
                <Card.Title as="h4">Login</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pl-1" md="12">
                      <Form.Group>
                        <label>Usuario</label>
                        <Form.Control
                          placeholder="Usuario"
                          type="text"
                          onChange={(e) => setUser(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Clave</label>
                        <Form.Control
                          placeholder="Clave"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Button
                    className="btn btn-primary btn-block btn-fill"
                    variant="primary"
                    onClick={() => validateUserData()}    
                  >
                    Login
                  </Button>
                  <Link to="/signup" >Sign Up</Link>
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