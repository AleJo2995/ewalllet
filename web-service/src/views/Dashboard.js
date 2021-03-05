import React from "react";
import ChartistGraph from "react-chartist";
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
} from "react-bootstrap";

function Dashboard() {
  return (
    <>
      <Container fluid>
    
        <Row>
         
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Datos de Cuenta</Card.Title>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["10000"],
                      series: [100],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Saldo Disponible 
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Mantenga saldo para evitar inconvenientes
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}

export default Dashboard;
