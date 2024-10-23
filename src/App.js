import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const getData = async (page = 1) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = response.data;
      setCharacters(data.results);
      setNextPage(data.info.next);
      setPrevPage(data.info.prev);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (prevPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-6xl mb-10">Rick and Morty Characters</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto max-w-7xl">
        {isLoading ? (
          <p>Loading…</p>
        ) : hasError ? (
          <p>Error loading data</p>
        ) : (
          characters.map((character) => (
            <div
              key={character.id}
              className="p-4 border rounded-2xl m-5 text-center"
            >
              <img
                className="mb-2"
                src={character.image}
                width="200px"
                height="200px"
                alt={character.name}
              />
              <p>Name: {character.name}</p>
              <p>Status: {character.status}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-evenly items-center mt-10">
        <button
          onClick={handlePrev}
          disabled={!prevPage}
          className={`px-4 py-2 text-white rounded ${
            prevPage
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <p className="text-xl">{currentPage}</p>
        <button
          onClick={handleNext}
          disabled={!nextPage}
          className={`px-4 py-2 text-white rounded ${
            nextPage
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
