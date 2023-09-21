import Alert from "../components/UI/Alert";
import Spinner from "../components/UI/Spinner";
import CharacterList from "../components/character/CharacterList";

const { useState, useEffect } = require("react");

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const dataFetched = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const dataFetchedResponse = await dataFetched.json();
        const charactersData = dataFetchedResponse.results;
        const newCharacters = await Promise.all(
          charactersData.map(async (item) => {
            if (item.episode && item.episode.length > 0) {
              const episodeFetched = await fetch(item.episode[0]);
              const episodeFetchedResponse = await episodeFetched.json();
              item.episodeName = episodeFetchedResponse.name;
              return item;
            }
          })
        );
        dataFetchedResponse.results = newCharacters;
        setData(dataFetchedResponse);
        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
      }
    })();
  }, [page]);
  const handlePageChange = (val) => {
    setPage((prevState) => prevState + val);
  };

  let content;
  if (error) {
    content = <Alert />;
  } else {
    content = data.results && (
      <CharacterList
        characters={data.results}
        onPageChange={handlePageChange}
        page={page}
        pageInfo={data.info}
      />
    );
  }
  return (
    <div className="container">
      <h1 className="text-center p-5 display-1 text-white-50">
        The Ricky and Morty
      </h1>
      {isLoading ? <Spinner /> : content}
    </div>
  );
};

export default Home;
