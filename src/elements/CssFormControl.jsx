import { withStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";

const CssFormControl = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#0a0102",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#A03037",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#DCDCDC",
      },
      "&:hover fieldset": {
        borderColor: "#0a0102",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A03037",
      },
      "&.Mui-error fieldset": {
        border: "1px solid red",
      },
    },
  },
})(FormControl);

export default CssFormControl;
