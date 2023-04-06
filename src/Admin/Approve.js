import React, { Component } from 'react' 
import { Card , CardGroup, Container , Button   } from "react-bootstrap";
import logo from "../image/ResultsDetail/test1.png"; 
import '../Result/CssResults/Detail.css'

export class Approve extends Component {
  render() {
    return (
        <div>
        <header className="HeaderDetail">
          <h1>Election Detail</h1>
        </header>
        <Container>
          <Card>
            <Card.Body>
              <Card.Text>
                <h1>Results Event Name!!!!</h1>
              </Card.Text>
            </Card.Body>

            <br />
            <div style={{ display: "flex" }}>


              <Card className="Cardimg"
                border="primary"
                 
              >
                <Card.Header>The Winer!!!</Card.Header>
                <Card.Body>
                  <Card.Img 
                    variant="top"
                    src={require("../image/ResultsDetail/d1.png")}
                  />

                  <Card.Title>Name : sadboi</Card.Title>
                  <Card.Text>
                    Detai
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="Cardimg"
                border="primary"
                 
              >
                <Card.Header>2</Card.Header>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={require("../image/ResultsDetail/d2.png")}
                  />
                  <Card.Title>Name : Soymilk</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card  className="Cardimg"
                border="primary"
                
              >
                <Card.Header>3</Card.Header>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={require("../image/ResultsDetail/d3.png")}
                  />
                  <Card.Title>Name : Choco</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Card>
          <div style={{ height: 100}}>
          <Button
                  href="/"
                  variant="primary"
                  type="submit"
                  style={{ marginRight: 50,marginTop: 20, width: 200, height: 40}}
                >
                 Submit
                </Button>
          <Button
                  href="/"
                  variant="primary"
                  type="submit"
                  style={{ marginTop: 20, width: 200, height: 40}}
                >
                  Home
                </Button>

          </div>
           
        </Container>
      </div>
    )
  }
}

export default Approve
