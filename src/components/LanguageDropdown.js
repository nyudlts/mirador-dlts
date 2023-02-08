import React, { Component } from "react";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CollapsibleSection from "../containers/CollapsibleSection";
import LanguageSettings from "../containers/LanguageSettings";

const langstyles = {
  container: {
    paddingTop: "16px",
    paddingLeft: "16px",
    borderBottom: "0.5px solid rgba(0, 0, 0, 0.25)",
    paddingRight: "8px",
    paddingBottom: "8px",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "start",
    flexDirection: "column",
    margin: ".5em 0",
  },
  formControl: {
    width: "100%",
  },
  selectMenu: {
    "&::before": {
      content: "''",
      borderBottom: ".1px solid rgba(0, 0, 0, 0.2)",
    },
  },
};
export class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const {
      handleClose,
      languages
    } = this.props;
    return (
      <div style={langstyles.container}>
        <CollapsibleSection label="Languages">
          <div style={langstyles.content}>
            <FormControl style={langstyles.formControl}>
              {/* <InputLabel>Available Languages</InputLabel> */}
              {/* <Select style={langstyles.selectMenu}>
              {languages &&
                languages.map((language) => {
                  return (
                    <MenuItem
                      key={language.locale}
                      value={language.locale}
                      // onClick={() => {
                      //   handleClick(language.locale);
                      // }}
                    >
                      {language.label}
                    </MenuItem>
                  );
                })}
            </Select> */}
              <LanguageSettings afterselect={handleClose} />
            </FormControl>
          </div>
        </CollapsibleSection>
      </div>
    );
  }
}

LanguageDropdown.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
LanguageDropdown.defaultProps = {
  languages: [
    { label: "English", locale: "en" },
    { label: "Arabic", locale: "ar" },
  ],
};
