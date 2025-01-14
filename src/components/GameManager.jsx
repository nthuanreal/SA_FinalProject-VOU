import React, { useEffect, useState } from "react";
import APIserviceFactory from "../services/api";

const GameManagerment = () => {
  const API = APIserviceFactory.gameService;
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 6; // 2 hàng, mỗi hàng 3 thẻ game

  // Fetch games from API
  const fetchGames = async () => {
    try {
      const { data } = await API.get("games");
      setGames(data.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(games.length / gamesPerPage);
  const currentGames = games.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleImageError = (event) => {
    event.target.src = "/default-game.jpg"; 
  };

  return (
    <div>
      <h2>Game Management</h2>
      <div className="game-container">
        {currentGames.map((game) => (
          <div className="game-card" key={game._id}>
            <img
              src={game.image}
              alt={game.name}
              className="game-image"
              onError={handleImageError}
            />
            <h3 className="game-name">{game.name}</h3>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      
    </div>
  );
};

export default GameManagerment;
