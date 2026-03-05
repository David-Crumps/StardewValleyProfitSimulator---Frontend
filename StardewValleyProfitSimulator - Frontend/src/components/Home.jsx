import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
/*xs={1} sm={2} md={3} lg={4} */
const Home = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/crops/');
        setCrops(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <Container className="card-container">
      <Row xs={'1'} sm={'2'} md={'3'} lg={'4'} xl={'5'} className="g-3">
        {crops.map(
          ({ id, name, ImageUrl, seedCost, cropSellPrice, seasons }) => (
            <Col key={id}>
              <Link
                to={`/crop/${id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card className="crop-card h-100">
                  <Card.Body>
                    <Card.Img
                      alt="Picture of Crop"
                      variant="bottom"
                      src={`http://localhost:8080${ImageUrl}`}
                      className="crop-card-img"
                    />
                    <Card.Title as={'h3'} className="crop-card-title">
                      {name}
                    </Card.Title>
                    <Card.Subtitle className="crop-card-subtitle">
                      {seasons.map(({ name }) => name).join(', ')}
                    </Card.Subtitle>
                    <Card.Text>Base Sell-Price: {cropSellPrice}g</Card.Text>
                    <Card.Text>Cost: {seedCost}g</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
};

export default Home;
