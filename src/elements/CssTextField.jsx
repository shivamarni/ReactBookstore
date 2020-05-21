import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
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
})(TextField);

export default CssTextField;
