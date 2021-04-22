import React, { useState, useEffect } from "react";
import config from "../config.json";
import { store } from 'react-notifications-component';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Tabs, Tab
} from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import axios from "axios";

function Dashboard(props) {

  useEffect(() => {
    getUserInfo()
  }, []);

  const { SERVER_URL } = config;
  const [user, setUserData] = useState('');
  const [walletId, setId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [cedula, setCedula] = useState('');
  const [saldo, setSaldo] = useState('');
  const [newBalance, setNewBalance] = useState('');
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({}); 

  const getUserInfo = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUserData(userData);
    axios.get(SERVER_URL + '/payments/wallet/get/' + userData.cedula)
    .then((response) => {
      // handling success
      const wallet = response.data[0];
      setId(wallet.id);
      setCardNumber(wallet.numero_tarjeta);
      setName(wallet.nombre_tarjeta_habiente);
      setCedula(wallet.cedula);
      setSaldo(wallet.saldo);
      //redireccionar al login
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
   ];

   const columns = ["Name", "Company", "City", "State"];

   
const options = {
  filterType: 'checkbox',
};

const handleValidation = () => {

  if(!newBalance){
    setShowError(true);
    setErrors({ newBalance: "Este campo no puede estar vacío" });
  } 
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
      store.addNotification({
        title: "Recarga existosa",
        message: "Recuerde revisar su saldo",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
      getUserInfo();
      setSuccess(true);
      setNewBalance('');
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      store.addNotification({
        title: "Algo falló en su recarga",
        message: error.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    })
  } else {
    store.addNotification({
      title: "Error a la hora de recargar saldo",
      message: "Revise los campos obligatorios",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }
}

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="3">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Bienvenido {user.nombre}</Card.Title>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <h5>Datos Generales</h5>
                  <hr/>
                  <h1>₡ {saldo}</h1>
                  <h6>Saldo disponible en su monedero</h6>
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Mantenga saldo para evitar inconvenientes
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Rutas utilizadas recientemente</Card.Title>
              </Card.Header>
              <Card.Body>
              <MUIDataTable
                title={"Rutas Utilizadas"}
                data={data}
                columns={columns}
                options={options}
              />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
          <Card>
              <Card.Header>
                <Card.Title as="h4">Funcionalidades</Card.Title>
              </Card.Header>
              <Card.Body>
              <Tabs defaultActiveKey="home">
                <Tab eventKey="home" title="Pagar Ruta">
                    {/* <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="input" placeholder="Inserte nombre" name="nameOfBuffet" value={nameOfBuffet} onChange={ (e) => this.handleChange(e) } />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="input" placeholder="Inserte precio" name="price" value={price} onChange={ (e) => this.handleChange(e) } />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Tipo de comida</Form.Label>
                            <Form.Control as="select" placeholder="Elija tipo de comida" name="type" value={type} onChange={ (e) => this.handleChange(e) }>
                                <option>Italiana</option>.
                                <option>Marina</option>
                                <option>Mexicana</option>
                                <option>Japonesa</option>
                                <option>Mediterránea</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Unidad de medida</Form.Label>
                            <Form.Control as="select" placeholder="Elija unidad de medida" name="unitOfMeasure" value={unitOfMeasure} onChange={ (e) => this.handleChange(e) }>
                                {this.createSelectItems()}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={() => this.createBuffet()}>
                            Crear
                        </Button>
                    </Form> */}
                </Tab>
                <Tab eventKey="profile" title="Recargar Saldo">
                  <Form style={{paddingTop : '15px'}}>
                    <Row>
                      <Col className="pr-1" md="3">
                        <Form.Group>
                          <label>Número de Tarjeta</label>
                          <Form.Control
                            type="text"
                            placeholder="Numero de Tarjeta"
                            value={cardNumber}
                            disabled="true"
                            onChange={(e) => setCardNumber(e.target.value)}
                          ></Form.Control>
                          <span style={{color: "red"}}>{errors["cardNumber"]}</span>
                        </Form.Group>
                      </Col>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Tarjeta Habiente</label>
                          <Form.Control
                            type="text"
                            placeholder="Tarjeta Habiente"
                            value={name}
                            disabled="true"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="2">
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
                    </Row>
                    <Row>
                      <Col className="px-1" md="3">
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
                    <Row>
                      
                      
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
                </Tab>
              </Tabs>
              </Card.Body>
          </Card>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Dashboard;
