import { Component } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import CheckIcon from "@material-ui/icons/CheckSharp";
import PropTypes from "prop-types";

/**
 * LanguageSettings ~ the workspace sub menu to change the language
 * of the application
 */
export class LanguageSettings extends Component {
  /**
   * Returns the rendered component
   */
  render() {
    const { handleClick, languages } = this.props;

    return (
      <>
        {languages.map((language) => {
          if (language.locale == "en" || language.locale == "ar") {
            return (
              <MenuItem
                button={!language.current}
                key={language.locale}
                onClick={() => {
                  handleClick(language.locale);
                }}
              >
                <ListItemIcon>{language.current && <CheckIcon />}</ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "body1" }}>
                  {language.label}
                </ListItemText>
              </MenuItem>
            );
          }
          return;
        })}
      </>
    );
  }
}

LanguageSettings.propTypes = {
  handleClick: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      locale: PropTypes.string.isRequired,
    })
  ).isRequired,
};
