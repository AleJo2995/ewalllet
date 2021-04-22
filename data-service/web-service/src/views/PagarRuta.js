import config from "../config.json";
import React, { useState } from 'react'

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

function Pagar() {

  const { SERVER_URL } = config;
  //const [walletId, setWalletId] = useState('');
  const [amount, setAmount] = useState('');

  const getWallets = () => {
    const payment = {
      walletId: 1,
      amount:amount
    };
    axios.post(SERVER_URL + '/payments/payRoute', payment)
    .then((data) => {
      // handling success
      console.log(data);
      //redireccionar al login
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }


  const executePayment = () => {
    const payment = {
      walletId: 1,
      amount:amount
    };
    axios.post(SERVER_URL + '/payments/payRoute', payment)
    .then((data) => {
      // handling success
      console.log(data);
      //redireccionar al login
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
                <Card.Title as="h4">Pagar Ruta</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
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
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Monto</label>
                        <Form.Control
                          placeholder="Monto"
                          type="text"
                          onChange={(e) => setAmount(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>

                  </Row>
                 
                  <Button
                    className="btn-fill pull-right"
                    variant="success"
                    onClick={() => executePayment()} 
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