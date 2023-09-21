import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import Alert from "./../components/UI/Alert";
import "./CharacterDetails.css";
import Spinner from "../components/UI/Spinner";

const CharacterDetails = (props) => {
  const characterId = useParams().characterId;
  const [character, setCharacter] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  console.log(characterId);

  useEffect(() => {
    setIsLoading(true);
    if (characterId) {
      const fetchingCharacterData = async () => {
        try {
          const characterFetched = await fetch(
            `https://rickandmortyapi.com/api/character/${characterId}`
          );
          const characterFetchedResponse = await characterFetched.json();
          if (
            characterFetchedResponse.origin.url &&
            characterFetchedResponse.origin.url !== ""
          ) {
            const originFetched = await fetch(
              characterFetchedResponse.origin.url
            );
            const originFetchedResponse = await originFetched.json();
            characterFetchedResponse.origin = originFetchedResponse;
          }
          if (
            characterFetchedResponse.location.url &&
            characterFetchedResponse.location.url !== ""
          ) {
            const locationFetched = await fetch(
              characterFetchedResponse.location.url
            );
            const locationFetchedResponse = await locationFetched.json();
            characterFetchedResponse.location = locationFetchedResponse;
          }
          if (characterFetchedResponse && characterFetchedResponse.episode) {
            const episode = await Promise.all(
              characterFetchedResponse.episode.map(async (episode) => {
                const episodeFetched = await fetch(episode);
                const episodeFetchedResponse = await episodeFetched.json();
                return episodeFetchedResponse.name;
              })
            );
            characterFetchedResponse.episode = episode;
          }

          console.log(characterFetchedResponse);
          setCharacter(characterFetchedResponse);
          setError(false);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
          setError(true);
        }
      };
      fetchingCharacterData();
    } else {
      navigate("/");
    }
  }, [characterId, navigate]);
  let content;
  if (error) {
    content = <Alert className="mx-auto col-lg-6" />;
  } else {
    content = character && (
      <div
        className="card  text-white mb-3 w-75 mx-auto "
        style={{ backgroundColor: "#3C3E44" }}
      >
        <div className="row g-0 ">
          <div className="col-md-4 image ">
            <img
              src={character.image}
              className="img-fluid rounded-start "
              alt={character.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <h6 className="card-subtitle mb-2 ">
                {character.species} - {character.gender}
              </h6>
              <p className="card-text m-0">
                <span className=" text-white-50 ">Status : </span>
                {character.status}
              </p>
              <p className="card-text m-0">
                <span className=" text-white-50 ">Species : </span>
                {character.species}
              </p>
              <p className="card-text">
                <span className=" text-white-50 ">Gender : </span>
                {character.gender}
              </p>
              <div className="row">
                {character.location && character.location.residents && (
                  <div className="col-12 col-lg-6">
                    <h5 className="card-title">Location</h5>
                    <h6 className="card-subtitle mb-2 ">
                      Amount of residents -{" "}
                      {character.location.residents.length}
                    </h6>
                    <p className="card-text m-0">
                      <span className=" text-white-50 ">Name : </span>
                      {character.location.name}
                    </p>
                    <p className="card-text m-0">
                      <span className=" text-white-50 ">Type : </span>
                      {character.location.type}
                    </p>
                    <p className="card-text">
                      <span className=" text-white-50 ">Dimension : </span>
                      {character.location.dimension}
                    </p>
                  </div>
                )}
                {character.origin && character.origin.residents && (
                  <div className="col-12 col-lg-6">
                    <h5 className="card-title">Origin</h5>
                    <h6 className="card-subtitle mb-2 ">
                      Amount of residents - {character.origin.residents.length}
                    </h6>
                    <p className="card-text m-0">
                      <span className=" text-white-50 ">Name : </span>
                      {character.origin.name}
                    </p>
                    <p className="card-text m-0">
                      <span className=" text-white-50 ">Type : </span>
                      {character.origin.type}
                    </p>
                    <p className="card-text">
                      <span className=" text-white-50 ">Dimension : </span>
                      {character.origin.dimension}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {character.location && character.location.residents && (
            <div className="col-12 col-lg-12">
              <div className="card-body">
                <h5 className="card-title">
                  {" "}
                  Name of the chapters the character is featured in :
                </h5>

                <p className="card-text">
                  <small>
                    {character.episode.map((item, index) => {
                      let content = item;
                      if (index !== character.episode.length - 1) {
                        content += ", ";
                      }
                      return content;
                    })}
                  </small>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid  vh-100 pt-5">
      <Link
        to="/ "
        className="link-offset-2 link-underline link-underline-opacity-0"
      >
        Back
      </Link>
      {isLoading ? <Spinner /> : content}
    </div>
  );
};

export default CharacterDetails;
