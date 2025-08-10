import PropTypes from "prop-types";

// Définit la forme de Configuration utilisée dans les composants React
export const ConfigurationPropType = PropTypes.shape({
  config_id: PropTypes.number.isRequired,
  config_name: PropTypes.string.isRequired,
});
