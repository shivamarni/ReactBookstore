import axios from "axios";
//import Forgetpassword from "../Components/Forgetpassword";

//require('dotenv').config()

const token = localStorage.getItem("UserToken");
var controller = {
  userRegistration(registrationDetails) {
    // console.log("controller register method ", registrationDetails);
    return axios.post(
      "http://localhost:8085/user/register",
      registrationDetails
    );
  },

  getprofilelink() {
    return axios.post(`http://localhost:8085/user/files/link`, null, {
      headers: { token: token, "Content-type": "application/json " },
    });
  },
  userLogin(loginDetails) {
    console.log("controller login method ", loginDetails);
    return axios.post("http://localhost:8085/user/login", loginDetails);
  },
  userForgotPassword(email) {
    console.log("controller forgotpassword method ", email);

    return axios.post("http://localhost:8085/user/forgotpassword", null, {
      headers: {
        email: email,
        "Content-type": "application/json ",
      },
    });
  },
  async addprofilepic(formData) {
    return await axios.post("http://localhost:8085/user/files/add", formData, {
      headers: {
        "content-type": "multipart/form-data",
        token: token,
        enablePublicReadAccess: true,
      },
    });
  },
  removeprofilepic() {
    return axios.post("http://localhost:8085/user/files/delete", null, {
      headers: {
        token: token,
        "Content-type": "application/json ",
      },
    });
  },
  resetpassword(resetDetails, forgetToken) {
    console.log("controller resetpassword method ", resetDetails);
    console.log(forgetToken);
    alert("check token value");
    console.log(token);
    return axios.put(
      "http://localhost:8085/user/resetpassword/" + forgetToken,
      resetDetails
    );
  },
  verification(token) {
    console.log("controller verification method ");
    console.log(token);
    return axios.put(`http://localhost:8085/user/verify/${token}`, null);
  },

  getAddressByType(token) {
    return axios.put(`http://localhost:8085/user/verify/${token}`, null);
  },
  getprofilelink() {
    return (
      axios.post("http://localhost:8085/user/files/link"),
      null,
      {
        headers: {
          token: token,
          "Content-type": "application/json ",
        },
      }
    );
  },
  signout(jwt) {},
  takenote(noteDetails) {
    return axios.post(
      "http://localhost:8080/note/create/" + token,
      noteDetails
    );
  },
  async getNotes() {
    let datas = [];
    await axios
      .get(`http://localhost:8085/note/getallnotes/${token}`)
      .then((res) => {
        console.log(res.data, "kjlk");
        res.data.data.forEach((element) => {
          datas.push(element);
        });
      });
    return datas;
  },
};

export default controller;
