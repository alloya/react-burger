import PropTypes from "prop-types";

const Title = (props) => {
  return <h1 className="text text_type_main-large pb-5">{props.text}</h1>;
};

Title.propTypes = {
  text: PropTypes.string,
};

export default Title;
