import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AddCrop = () => {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  const [seasonsList, setSeasonsList] = useState([]);

  const [cropsBySeason, setCropsBySeason] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    const getCropsBySeason = async () => {
      try {
        if (!selectedSeasonId) return;
        const response = await axios.get(
          `http://localhost:8080/api/seasons/${selectedSeasonId}`,
        );
        setCropsBySeason(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error fetching season: ', error);
        }
      }
    };
    getCropsBySeason();
  }, [selectedSeasonId]);

  useEffect(() => {
    const getSeasons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/seasons/names`,
        );
        setSeasonsList(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error');
        }
      }
    };
    getSeasons();
  }, []);

  const renderCropList = () => {
    if (!cropsBySeason || !cropsBySeason.crops.length) {
      return <DropdownItem disabled> No crops available</DropdownItem>;
    }
    return cropsBySeason.crops.map((crop) => (
      <DropdownItem key={crop} eventKey={crop}>
        {crop}
      </DropdownItem>
    ));
  };

  const renderSeasonList = () => {
    if (!seasonsList || !seasonsList.length) {
      return <DropdownItem disabled> No Seasons available</DropdownItem>;
    }
    return seasonsList.map(({ id, name }) => (
      <DropdownItem key={id} eventKey={JSON.stringify({ id, name })}>
        {name}
      </DropdownItem>
    ));
  };

  return (
    <>
      <Dropdown
        className="dropdown-season"
        onSelect={(eventKey) => {
          const { id, name } = JSON.parse(eventKey);
          setSelectedSeason(name);
          setSelectedSeasonId(id);
          setSelectedCrop(null);
        }}
      >
        <DropdownToggle className="dropdown-season-toggle">
          {selectedSeason ? `${selectedSeason}` : 'Select a season'}
        </DropdownToggle>
        <DropdownMenu className="dropdown-season-menu" align="end">
          {renderSeasonList()}
        </DropdownMenu>
      </Dropdown>

      <Dropdown
        className="dropdown-crop"
        onSelect={(eventKey) => setSelectedCrop(eventKey)}
        drop="down"
      >
        <DropdownToggle className="dropdown-season-toggle">
          {selectedCrop ? `${selectedCrop}` : 'Select a crop'}
        </DropdownToggle>
        <DropdownMenu className="dropdown-season-menu" align="end" flip={false}>
          {renderCropList()}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
export default AddCrop;
