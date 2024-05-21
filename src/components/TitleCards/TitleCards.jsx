import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title = "Popular on Netflix", category = "now_playing" }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const cardsRef = useRef(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.results) {
          setApiData(data.results);
        } else {
          setApiData([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      }
    };

    fetchData();

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  if (error) {
    return <div className='TitleCard'>Error: {error}</div>;
  }

  return (
    <div className='TitleCard'>
      <h2>{title}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.length > 0 ? apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title || 'No title available'} />
            <p>{card.original_title || 'No title available'}</p>
          </Link>
        )) : <p>No data available</p>}
      </div>
    </div>
  );
};

export default TitleCards;
