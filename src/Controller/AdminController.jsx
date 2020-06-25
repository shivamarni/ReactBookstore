import axios from "axios";

const token = localStorage.getItem("UserToken");
var adminController = {
  userRegistration(registrationDetails) {
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
  adminLogin(loginDetails) {
    console.log("controller login method ", loginDetails);
    return axios.post("http://localhost:8085/admin/login", loginDetails);
  },
  adminForgotPassword(email) {
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
    return axios.put(`http://localhost:8085/address/useraddress/`, null);
  },

  getAddressByType(type) {
    return axios.get(`http://localhost:8085/address/useraddress/`, {
      headers: {
        token: token,
        type: type,
        "Content-type": "application/json ",
      },
    });
  },

  addNewAddress(addressDto) {
    return axios.post(`http://localhost:8085/address/add/`, addressDto, {
      headers: {
        token: token,

        "Content-type": "application/json ",
      },
    });
  },

  updateAddress(type, addressDto) {
    return axios.post(`http://localhost:8085/address/add/`, addressDto, {
      headers: {
        token: token,
        type: type,

        "Content-type": "application/json ",
      },
    });
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

export default adminController;
