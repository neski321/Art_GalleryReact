
/*********************************************************************************
* BTI425 – Assignment 5
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Neskines Otieno Student ID: 118317205 Date: 2023-03-20
* *
********************************************************************************/

import { Row, Col, Image } from 'react-bootstrap';

export default function AboutPage(){
  return (
    <div>
      <Row>
        <Col>
          <Image fluid rounded src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="The Metropolitan Museum of Art" />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art, colloquially "the Met," is located in New York City and is the largest art museum in the United States. Its permanent collection contains over two million works, divided among seventeen curatorial departments. The main building, located on the eastern edge of Central Park along Museum Mile, is by area one of the world's largest art galleries. There is also a much smaller second location at "The Cloisters" in Upper Manhattan that features medieval art.
          </p>
        </Col>
        <Col md={6}>
          <p>
            Founded in 1870, the Met has a rich history and has been the subject of numerous films and television shows. It is a popular destination for visitors to New York City, attracting over seven million visitors annually. In addition to its extensive art collection, the Met also hosts a variety of educational programs and exhibitions throughout the year. For more information, please visit the <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
          </p>
        </Col>
      </Row>
    </div>
  );
};
