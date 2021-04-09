import React, { useState, useEffect }  from "react";
import config from "../config.json";
import axios from "axios";

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

function Recargar() {

  
  const { SERVER_URL } = config;
  const [walletId, setId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiryDate, setexpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cedula, setCedula] = useState('');
  const [saldo, setSaldo] = useState('');
  const [newBalance, setNewBalance] = useState('');

  useEffect(() => {
    retrieveWalletByUserId()
    return () => {
      
    }
  } )


  const retrieveWalletByUserId = (userId = "111111111") => {
    axios.get(SERVER_URL + '/payments/wallet/get/' + userId )
    .then((res) => {
       const wallet = res.data[0];
       setId(wallet.id);
       setCardNumber(wallet.numero_tarjeta);
       setName(wallet.nombre_tarjeta_habiente);
       setexpiryDate(wallet.caducidad);
       setCvv(wallet.cvv);
       setCedula(wallet.cedula);
       setSaldo(wallet.saldo);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const updateWalletBalance = (event) => {
    event.preventDefault()
    const walletAmount = {
      amount:newBalance
    }
    axios.post(SERVER_URL + '/payments/increaseWalletBalance/' + walletId, walletAmount)
    .then((res) => {
      retrieveWalletByUserId(cedula)
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
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Recargar monedero</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Número Tarjeta</label>
                        <Form.Control
                          type="text"
                          placeholder="Numero de Tarjeta"
                          value={cardNumber}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Tarjeta Habiente</label>
                        <Form.Control
                          type="text"
                          placeholder="Tarjeta Habiente"
                          value={name}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="4">
                        <Form.Group>
                          <label>Cedula</label>
                          <Form.Control
                            placeholder="Cedula"
                            type="text"
                            value={cedula}
                            disabled="true"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>CVV</label>
                        <Form.Control
                          placeholder="CVV"
                          type="text"
                          value={cvv}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Caducidad</label>
                        <Form.Control
                          placeholder="Monto"
                          type="text"
                          value={expiryDate}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="6">
                        <Form.Group>
                          <label>Saldo actual</label>
                          <Form.Control
                            placeholder="Monto"
                            type="text"
                            value={saldo}
                            disabled="true"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Saldo a Recargar</label>
                        <Form.Control
                          defaultValue="1000"
                          placeholder="Monto"
                          type="text"
                          onChange={(e) => setNewBalance(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                 
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="success"
                    onClick={updateWalletBalance}
                  >
                    Recargar
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

export default Recargar;