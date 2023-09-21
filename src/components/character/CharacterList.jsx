import Alert from "../UI/Alert";
import CharacterItem from "./CharacterItem";

const CharacterList = (props) => {
  const { characters } = props;
  console.log(props.pageInfo);
  const handlePageChange = (val) => {
    props.onPageChange(val);
  };
  let content;
  if (!characters || characters.length === 0) {
    content = <Alert message="No characters available"></Alert>;
  } else {
    content = (
      <div className=" row row-cols-1 row-cols-md-2 g-4 ">
        {characters.map((character) => (
          <CharacterItem
            key={character.id}
            character={character}
          ></CharacterItem>
        ))}
        <div className="w-100">
          <nav aria-label="Page navigation example ">
            <ul className="pagination justify-content-center ">
              <li className={`page-item ${!props.pageInfo.prev && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(-1)}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link">{props.page}</button>
              </li>

              <li className={`page-item ${!props.pageInfo.next && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(+1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  return content;
};

export default CharacterList;
