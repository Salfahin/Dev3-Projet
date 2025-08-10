import PropTypes from "prop-types";

// Définit la forme de Part utilisée dans les composants React
export const PartPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  specs: PropTypes.objectOf(PropTypes.string).isRequired,
});