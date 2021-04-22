import React, {  useState } from 'react'
import { Link } from "react-router-dom";
import config from "../config.json";
import { store } from 'react-notifications-component';
import { Redirect } from 'react-router';

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

function Login(props) {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [userData, setUserData] = useState(false);


  const { SERVER_URL } = config;
  const validateUserData = () => {

    axios.post(SERVER_URL + '/users/validateUser', {id:user, password:password})
    .then((response) => {
      // handling success
      localStorage.setItem('user', JSON.stringify(response.data));
      store.addNotification({
        title: "Usuario logueado",
        message: "Ya puede inciar con sus gestiones",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
      setRedirect(true);
    })
    .catch((error) => {
      // handle error
      console.log(error);
      store.addNotification({
        title: "El usuario no es válido, las credenciales no parecen coincidir",
        message: "Ya puede inciar con sus gestiones",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    
    })
  }

  return (
    <>
      <Container  >
      <br/><br/><br/><br/>
        <Row>
          <Col md="12">
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
          {redirect ? <Redirect  to={'/admin/dashboard'} user={userData}/> : null}
        </Row>
      </Container>
    </>
    

  );
}

export default Login;