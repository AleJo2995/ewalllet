import React, { useState, useEffect } from "react";
import config from "../config.json";
import { store } from 'react-notifications-component';
import moment from 'moment';
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
    getUserInfo();
    getRoutes();
    setRoutesColumns([
      {
        name: "nombre",
        label:"Nombre",
        options: {
         filter: true,
         sort: false
        }
      },
      {
        name: "descripcion",
        label:"Descripcion",
        options: {
         filter: true,
         sort: false
        }
      },
      {
          name: "costo",
          label:"Costo",
          options: {
           filter: true,
           sort: false
          }
      }]);
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
  const [rutas, setRutas] = useState('');
  const [routesColumns, setRoutesColumns] = useState([]);
  const [routeToAdd, setRouteToAdd] = useState('');
  const [amount, setAmount] = useState('');

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

  const createSelectItems = (values) => {
    let items = [];    
    values.forEach((element, i) => {
        items.push(<option key={i} value={element.nombre}>{element.nombre}</option>);  
    });   
    return items;
  }


 const retrieveAmount = (event) => {
  event.preventDefault();
  setRouteToAdd(event.target.value);
  const route = rutas.filter(ruta => ruta.nombre === event.target.value)[0];
  setAmount(route.costo)
  console.log('On change works')
 }



const getRoutes = () => {
  axios.get(SERVER_URL + '/routes/getAll')
  .then((response) => {
    // handling success
    setRutas(response.data);
   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    store.addNotification({
      title: "Error al traer las rutas",
      message: error.message,
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

const executePayment = () => {
  if(saldo <= amount) {
    store.addNotification({
      title: "Su monedero no cuenta con saldo suficiente",
      message: "Dríjase al módulo de recarga para recargar el monedero",
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
  } else {
    const payment = {
      walletId: walletId,
      amount:amount
    };
    axios.post(SERVER_URL + '/payments/payRoute', payment)
    .then((data) => {
      // handling success
      store.addNotification({
        title: "Ruta: " + routeToAdd + " pagada satisfactoriamente",
        message: "Puede continuar con sus gestiones",
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
      getUserInfo();
      const routeFiltered = rutas.filter(ruta => ruta.nombre === routeToAdd)[0];
      const routeToLog = {
        codigoRuta:routeFiltered.codigo,
        cedula:cedula,
        fechaDeUso:moment().format('MMMM Do YYYY, h:mm:ss a')
      }
      axios.post(SERVER_URL + '/users/routes/create', routeToLog)
        .then((data) => {
          // handling success
          console.log(data);
        })
        .catch(function (error) {
          // handle error
          store.addNotification({
            title: "Ocurrió un error al intentar pagar la ruta ",
            message: error.message,
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
    })
    .catch(function (error) {
      // handle error
      store.addNotification({
        title: "Ocurrió un error al intentar pagar la ruta ",
        message: error.message,
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
  rowsPerPage:5
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

const theColumns = ["nombre", "descripcion"];

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
                  <h1>₡ {saldo !== null || saldo !== undefined ? saldo : '-'}</h1>
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
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Rutas disponibles</Card.Title>
              </Card.Header>
              <Card.Body>
              <MUIDataTable
                  title={"Rutas disponibles"}
                  data={rutas ? rutas : data}
                  columns={routesColumns}
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
                <Form style={{paddingTop : '15px'}}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ruta</label>
                        <Form.Control as="select" placeholder="Elija ruta" name="ruta" value={routeToAdd} onChange={ (e) => retrieveAmount(e) }>
                            {rutas ? createSelectItems(rutas) : null}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Monto</label>
                        <Form.Control
                          placeholder="Monto"
                          type="number"
                          disabled={true}
                          value={amount}
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
                            type="number"
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
