const Spinner = (props) => {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div
        className={`spinner-border text-light  ${props.children}`}
        style={{ width: "5rem", height: "5rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
