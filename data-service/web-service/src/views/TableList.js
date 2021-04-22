import React from "react";

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

function TableList() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Ingresos</Card.Title>
      
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Monto</th>
                      <th className="border-0">Día</th>
                      <th className="border-0">Mes</th>
    
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1000</td>
                      <td>01</td>
                      <td>03</td>
               
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2000</td>
                      <td>02</td>
                      <td>03</td>
           
                    </tr>

  
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Usuarios Rechazados</Card.Title>
        
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>

                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
            
                    </tr>

                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
