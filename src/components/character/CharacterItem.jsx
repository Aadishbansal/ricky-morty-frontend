import { Link } from "react-router-dom";

const CharacterItem = (props) => {
  const { character } = props;
  /**
   * 
   * The character’s picture
The character’s information (name, species, gender, etc.)
Origin and current location (name, dimension, amount of residents, etc.) -> important
Name of the chapters the character is featured in -> important

   */
  return (
    <div className="col ">
      <div
        className="card mb-3 text-white"
        style={{ maxWidth: "540px", backgroundColor: "#3C3E44" }}
      >
        <div className="row g-0">
          <div className="col-md-4 ">
            <img
              src={character.image}
              className="img-fluid rounded-start h-100"
              alt={character.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <h6 className="card-subtitle mb-2 ">
                {character.species} - {character.gender}
              </h6>

              <p className="card-text text-white-50 m-0">Origin</p>
              <p className="m-0">{character.origin.name}</p>
              <p className="card-text text-white-50 m-0">Location</p>
              <p className="m-0">{character.location.name}</p>
              <p className="card-text text-white-50 m-0">First episode</p>
              <p className="m-0">{character.episodeName}</p>
            </div>
          </div>
          <Link to={`${character.id}`} className="stretched-link "></Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
