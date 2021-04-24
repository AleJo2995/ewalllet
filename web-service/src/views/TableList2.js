import React, {useEffect, useState} from "react";
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
} from "react-bootstrap";
import MUIDataTable from "mui-datatables";
import axios from "axios";

function TableList2() {

  useEffect(() => {
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

  const options = {
    filterType: 'checkbox',
    rowsPerPage:5
  };

  const getRoutes = () => {
    axios.get(SERVER_URL + '/routes/getAll')
    .then((response) => {
      // handling success
      setRutas(response.data);
      const userData = JSON.parse(localStorage.getItem('user'));
    setUserData(userData);
     
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

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
   ];

   const columns = ["Name", "Company", "City", "State"];

  return (
    <>
      <Container fluid>
        <Row>
        <Col md="5">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Rutas utilizadas recientemente por {user.nombre}</Card.Title>
              </Card.Header>
              <Card.Body>
              <MUIDataTable
                title={"Rutas Utilizadas"}
                data={rutas ? rutas : data}
                columns={routesColumns}
                options={options}
              />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList2;
