import React , { useState, useEffect } from "react";
import config from "../config.json";
import { store } from 'react-notifications-component';
import MUIDataTable from "mui-datatables";

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
  Tab, Tabs
} from "react-bootstrap";

import axios from "axios";

function AdminConsole() {

  const { SERVER_URL } = config;
  const [code, setCode] = useState('');
  const [cost, setCost] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [provincia, setProvincia] = useState('');
  const [choferes, setChoferes] = useState('');
  const [rutas, setRutas] = useState('');
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [nombreChofer, setNombreChofer] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [choferToAdd, setChoferToAdd] = useState('');
  const [choferesToLoad, setchoferesToLoad] = useState('');
  const [routesToLoad, setRoutesToLoad] = useState('');
  const [routeToAdd, setRouteToAdd] = useState('');

  useEffect(() => {
    getRoutes();
    loadChoferes();
  }, []);

   const routesColumns = [
    {
        name: "codigo",
        label:"Código"
    },
    {
        name: "costo",
        label:"Costo"
    },
    {
        name: "descripcion",
        label:"Descripcion"
    },
    {
        name: "nombre",
        label:"Nombre"
    },
    {
        name: "empresa",
        label:"Empresa",
    }
];

const driversColumns = [
  {
      name: "codigo",
      label:"Código",
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
      name: "nombre",
      label:"Nombre",
      options: {
       filter: true,
       sort: false
      }
  },
  {
      name: "empresa",
      label:"Empresa",
      options: {
       filter: true,
       sort: false
      }
  },
  {
    name: "provincia",
    label:"Provincia",
    options: {
     filter: true,
     sort: false
    }
}
];

const createSelectItems = (values) => {
  let items = [];    
  values.forEach((element, i) => {
      items.push(<option key={i} value={element.nombre}>{element.nombre}</option>);  
  });   
  return items;
}



const addRouteToDriver = (event) => {
  event.preventDefault();
  const routeCode = routesToLoad.filter(route => route.nombre === routeToAdd)[0].codigo;
  let finalRoute = [];
  finalRoute.push(routeCode);
  const actualDriver = choferesToLoad.filter(chofer => chofer.nombre === choferToAdd)[0];
  const newRouteToDriver = {
    cedula: actualDriver.cedula,
    rutas:finalRoute,
  };
  axios.post(SERVER_URL + '/routes/addRoutesToDriver', newRouteToDriver)
  .then((data) => {
    // handling success
    store.addNotification({
      title: "Ruta añadida a chofer satisfactoriamente",
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

  })
  .catch(function (error) {
    // handle error
    console.log(error);
    store.addNotification({
      title: "Hubo un error agregando la ruta al chofer",
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


const createDriver = (event) => {
  event.preventDefault();
  const newUser = {
    cedula: cedula,
    password:password,
    nombre:nombre,
    primerApellido:primerApellido,
    segundoApellido:segundoApellido,
    correo:correo,
    fechaNacimiento:fechaNacimiento,
    activo:true
  };
  axios.post(SERVER_URL + '/users/create', newUser)
  .then((data) => {
    // handling success
    const rolesToAdd = {
      cedula: cedula,
      roles: config.DRIVER_ROLE_NAME
    }

    axios.post(SERVER_URL + '/users/addRolesPerUser', rolesToAdd)
      .then((data) => {
        // handling success
        console.log(data);
        store.addNotification({
          title: "Nuevo chofer creado",
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
        store.addNotification({
          title: "Un nuevo usuario se ha registrado con permisos de chofer",
          message: "Puede continuar con sus gestiones",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        setCedula('');
        setPassword('');
        setNombreChofer('');
        setPrimerApellido('');
        setSegundoApellido('');
        setCorreo('');
        setFechaNacimiento('');
      })
      .catch(function (error) {
        store.addNotification({
          title: "Un nuevo usuario se ha registrado pero ha habido un error agregando los roles de chofer",
          message: "Puede continuar con sus gestiones",
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
    console.log(error);
    store.addNotification({
      title: "Hubo un error registrado el usuario chofer",
      message: "Puede continuar con sus gestiones",
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

   
const options = {
  filterType: 'checkbox',
  rowsPerPage:5
};

  const createRoute = (event) => {
    event.preventDefault();
    const newRoute = {
      code: code,
      cost:cost,
      name:nombre,
      description:descripcion,
      company:empresa,
      province:provincia
    };
    axios.post(SERVER_URL + '/routes/create', newRoute)
    .then((response) => {
      // handling success
      store.addNotification({
        title: "Ruta creada",
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
      setCode('');
      setCost('');
      setNombre('');
      setDescripcion('');
      setEmpresa('');
      setProvincia('');
     
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      store.addNotification({
        title: "Error al crear la ruta",
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

  const getRoutes = () => {
    axios.get(SERVER_URL + '/routes/getAll')
    .then((response) => {
      // handling success
      setRutas(response.data);
      setRoutesToLoad(response.data);
     
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      store.addNotification({
        title: "Error al traer las ruta",
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

  const loadChoferes = () => {
    axios.get(SERVER_URL + '/drivers')
    .then((response) => {
      // handling success
      setchoferesToLoad(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      store.addNotification({
        title: "Error al traer las ruta",
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

  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Rutas</Card.Title>
                </Card.Header>
                <Card.Body>
                {/* <MUIDataTable
                  title={"Rutas Utilizadas"}
                  data={data}
                  columns={routesColumns}
                  options={options}
                /> */}
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Choferes</Card.Title>
                </Card.Header>
                <Card.Body>
                {/* <MUIDataTable
                  title={"Choferes disponibles"}
                  data={rutas}
                  columns={driversColumns}
                  options={options}
                /> */}
                </Card.Body>
              </Card>
            </Col>
        </Row>
        <Row>
        <Col md="12">
          <Card>
              <Card.Header>
                <Card.Title as="h4">Tareas Administrativas</Card.Title>
              </Card.Header>
              <Card.Body>
              <Tabs defaultActiveKey="home">
                <Tab eventKey="home" title="Agregar rutas">
                      <Form style={{paddingTop : '15px'}}>
                        <Row>
                          <Col className="pr-1" md="6">
                            <Form.Group>
                              <label>Codigo</label>
                              <Form.Control
                                placeholder="Codigo"
                                type="text"
                                onChange={(e) => setCode(e.target.value)}
                                value={code}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="6">
                            <Form.Group>
                              <label>Costo</label>
                              <Form.Control
                                placeholder="Costo"
                                type="text"
                                onChange={(e) => setCost(e.target.value)}
                                value={cost}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="6">
                            <Form.Group>
                              <label>Descripcion</label>
                              <Form.Control
                                placeholder="Descripcion"
                                type="text"
                                onChange={(e) => setDescripcion(e.target.value)}
                                value={descripcion}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="6">
                            <Form.Group>
                              <label>Nombre</label>
                              <Form.Control
                                placeholder="Nombre"
                                type="text"
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                        
                        </Row>
                        <Row>
                          <Col className="pr-1" md="6">
                            <Form.Group>
                              <label>Empresa</label>
                              <Form.Control
                                placeholder="Empresa"
                                type="text"
                                onChange={(e) => setEmpresa(e.target.value)}
                                value={empresa}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="pr-1" md="6">
                            <Form.Group>
                              <label>Provincia</label>
                              <Form.Control
                                placeholder="Provincia"
                                type="text"
                                onChange={(e) => setProvincia(e.target.value)}
                                value={provincia}
                              ></Form.Control>
                            </Form.Group>
                          </Col>
        
                        </Row>
                      
                        <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="info"
                          onClick={createRoute} 
                        >
                          Crear Ruta
                        </Button>
                        <div className="clearfix"></div>
                      </Form>
                </Tab>
                <Tab eventKey="profile" title="Añadir chofer">
                <Form style={{paddingTop : '15px'}}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Cédula</label>
                        <Form.Control
                          placeholder="Cedula"
                          type="text"
                          onChange={(e) => setCedula(e.target.value)}
                          value={cedula}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                    <Form.Group>
                        <label>Clave</label>
                        <Form.Control
                          placeholder="Clave"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                    <Form.Group>
                        <label>Nombre</label>
                        <Form.Control
                          placeholder="Nombre"
                          type="text"
                          onChange={(e) => setNombreChofer(e.target.value)}
                          value={nombreChofer}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                    <Form.Group>
                        <label>Primer Apellido</label>
                        <Form.Control
                          placeholder="Primer Apellido"
                          type="text"
                          onChange={(e) => setPrimerApellido(e.target.value)}
                          value={primerApellido}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Segundo Apellido</label>
                        <Form.Control
                          placeholder="Segundo Apellido"
                          type="text"
                          onChange={(e) => setSegundoApellido(e.target.value)}
                          value={segundoApellido}
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
                          onChange={(e) => setCorreo(e.target.value)}
                          value={correo}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Fecha de Nacimiento</label>
                        <Form.Control
                          placeholder="05-11-1998"
                          type="text"
                          onChange={(e) => setFechaNacimiento(e.target.value)}
                          value={fechaNacimiento}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={createDriver} 

                  >
                    Crear Chofer
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                </Tab>
                <Tab eventKey="choferARuta" title="Añadir ruta a  chofer">
                <Form style={{paddingTop : '15px'}}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Ruta</label>
                        <Form.Control as="select" placeholder="Elija ruta" name="unitOfMeasure" value={routeToAdd} onChange={ (e) => setRouteToAdd(e.target.value) }>
                            {routesToLoad ? createSelectItems(routesToLoad) : null}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Chofer</label>
                        <Form.Control as="select" placeholder="Elija el chofer" name="unitOfMeasure" value={choferToAdd} onChange={ (e) => setChoferToAdd(e.target.value) }>
                            {choferesToLoad ? createSelectItems(choferesToLoad) : null}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={addRouteToDriver} 
                  >
                    Añadir Chofer a Ruta
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

export default AdminConsole;
