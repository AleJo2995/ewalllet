import React, { useState, useEffect }  from "react";
import config from "../config.json";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

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
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({}); 

  useEffect(() => {
    retrieveWalletByUserId()
    return () => {
      
    }
  }, [])


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

  const handleValidation = () => {

    //Cedula
    if(!cardNumber){
      setShowError(true);
      setErrors({ cardNumber: "Este campo no puede estar vacío" });
    }

    if(!newBalance){
      setShowError(true);
      setErrors({ newBalance: "Este campo no puede estar vacío" });
    }

  //   if(typeof fields["email"] !== "undefined"){
  //      let lastAtPos = fields["email"].lastIndexOf('@');
  //      let lastDotPos = fields["email"].lastIndexOf('.');

  //      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
  //         formIsValid = false;
  //         errors["email"] = "Email is not valid";
  //       }
  //  }  
   return showError;
}

  const updateWalletBalance = (event) => {
    event.preventDefault()
    if(!handleValidation()){
      const walletAmount = {
        amount:newBalance
      }
      axios.post(SERVER_URL + '/payments/increaseWalletBalance/' + walletId, walletAmount)
      .then((res) => {
        retrieveWalletByUserId(cedula)
        setSuccess(true);
        setNewBalance('');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            {showSuccess ? <Alert severity="success" onClose={() => {setSuccess(false)}}>Recarga exitosa. Revise su saldo</Alert> : null}
            {showError ? <Alert severity="error" onClose={() => {setShowError(false)}}>Error en el formulario. Revise los campos</Alert> : null}
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
                          onChange={(e) => setCardNumber(e.target.value)}
                        ></Form.Control>
                        <span style={{color: "red"}}>{errors["cardNumber"]}</span>
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
                          placeholder="Monto"
                          type="text"
                          value={newBalance}
                          onChange={(e) => setNewBalance(e.target.value)}
                        ></Form.Control>
                        <span style={{color: "red"}}>{errors["newBalance"]}</span>
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