import Card from 'react-bootstrap/Card';

const Crop = () => {
  return (
    <div className="centre-wrapper">
      <Card className="single-crop-card">
        <Card.Body>
          <Card.Title as={'h2'} className="crop-card-title">
            Blue Jazz
          </Card.Title>
          <Card.Subtitle className="crop-card-subtitle">Spring</Card.Subtitle>
          <Card.Text>Base Sell-Price: 50g</Card.Text>
          <Card.Text>Cost: 30g</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Crop;
