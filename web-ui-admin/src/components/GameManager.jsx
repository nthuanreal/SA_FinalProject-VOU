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
      <h2 className='dashboard-title' >GAME MANAGEMENT</h2>
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
        {/* First Page Button */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>

        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            let page;
          // Xử lý khi currentPage nằm ở đầu dải
          if (currentPage <= 3) {
            page = index + 1; // Hiển thị từ trang 1 đến 5 hoặc đến totalPages nếu ít hơn
          }
          // Xử lý khi currentPage nằm ở cuối dải
          else if (currentPage > totalPages - 3) {
            page = totalPages - 4 + index; // Hiển thị 5 trang cuối
          }
          // Xử lý khi currentPage nằm ở giữa dải
          else {
            page = currentPage - 2 + index; // Hiển thị quanh currentPage
          }

          // Bỏ qua các trang không hợp lệ (nhỏ hơn 1 hoặc lớn hơn totalPages)
          if (page < 1 || page > totalPages) return null;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          );
        })}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>


      
    </div>
  );
};

export default GameManagerment;
