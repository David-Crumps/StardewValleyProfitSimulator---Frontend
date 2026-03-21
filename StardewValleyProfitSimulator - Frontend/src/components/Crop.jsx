import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Crop = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        if (!id) return;
        const response = await axios.get(
          `http://localhost:8080/api/crops/${id}`,
        );
        setCrop(response.data);
      } catch (error) {
        console.error('Error fetching crop: ', error);
      }
    };
    fetchCrop();
  }, [id]);

  if (!crop) {
    return (
      <h2 className="text-center" style={{ padding: '10rem' }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="centre-wrapper">
      <Card className="single-crop-card">
        <Card.Body className="d-flex align-items-center">
          <Card.Img
            alt="Picture of Crop"
            variant="bottom"
            src={`http://localhost:8080${crop.ImageUrl}`}
            className="single-crop-img-card"
          />
          <div className="ms-3 single-crop-info-card">
            <Card.Title as={'h2'} className="crop-card-title">
              {crop.name}
            </Card.Title>
            <Card.Subtitle className="crop-card-subtitle">
              {crop.seasons.map(({ name }) => name).join(', ')}
            </Card.Subtitle>
            <Card.Text>Base Sell-Price: {crop.cropSellPrice}g</Card.Text>
            <Card.Text>Cost: {crop.seedCost}g</Card.Text>
            <Card.Text>Seed sell-price: {crop.seedSellPrice}g</Card.Text>
            <Card.Text>Inital Grow Time: {crop.growTime} days</Card.Text>
            <Card.Text>
              Regrowth Time:{' '}
              {crop.regrowthTime === 0 ? 'N/A' : `${crop.regrowthTime} days`}
            </Card.Text>
            <Card.Text>Crops per harvest: {crop.cropsPerHarvest}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Crop;
