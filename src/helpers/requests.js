import { removeCookie, getCookie } from "tiny-cookie";
import axios from "axios";

class requests {
  initialResult = {
    ok: false,
    status: null,
    message: null,
    object: null,
  };

  redirect2Login() {
    sessionStorage.clear();
    removeCookie("token");
    window.location.href = "/";
  }

  getAuthHeader() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    };
  }

  getStatusMessage(status) {
    let msg;
    if (status >= 500) msg = "Server error";
    else if (status === 403) msg = "Permission required";
    else if (status === 401) msg = "Unauthorized";
    else if (status >= 400) msg = "Error";
    return msg;
  }

  async get(url, withRedirect = true) {
    let result = this.initialResult;
    const authHeader = this.getAuthHeader();
    try {
      let response;
      response = await axios(url, { headers: authHeader });
      result.status = response.status;
      result.ok = response.ok;
      result.object = response.data;
      result.message = this.getStatusMessage(response.status);
      if (response.status === 401 && withRedirect) {
        this.redirect2Login();
      }
    } catch (err) {
      const response = err.response;
      result.object = [];
      if (response) {
        result.status = response.status;
        if (response.status === 401 && withRedirect) this.redirect2Login();
        else if (response.status >= 400) console.log("Bad response from server, url: " + url);
        if (response.data.errors && response.data.errors.length > 0) {
          result.message = response.data.errors[0].msg;
          result.object = [];
        }
      } else {
        result.message = "Something went wrong";
      }
    }
    return result;
  }

  async post(url, data, withRedirect = true) {
    let result = this.initialResult;
    const authHeader = this.getAuthHeader();
    const contentType = { "content-type": "application/json" };
    const options = data ? { mode: "cors", data: data } : {};
    try {
      const response = await axios(url, {
        method: "POST",
        headers: { ...authHeader, ...contentType },
        ...options,
      });
      result.status = response.status;
      result.ok = response.ok;
      result.message = this.getStatusMessage(response.status);
      if (response.status === 401 && withRedirect) this.redirect2Login();
      else if (response.status >= 400) console.log("Bad response from server, url: " + url);
      result.object = await response.data;
    } catch (err) {
      const response = err.response;
      result.object = [];
      if (response) {
        result.status = response.status;
        if (response.status === 401 && withRedirect) this.redirect2Login();
        else if (response.status >= 400) console.log("Bad response from server, url: " + url);
        if (response.data.errors && response.data.errors.length > 0) {
          result.message = response.data.errors[0].msg;
          result.object = [];
        }
      } else {
        result.message = "Something went wrong";
      }
    }
    return result;
  }

  async put(url, data, withRedirect = true) {
    let result = this.initialResult;
    const authHeader = this.getAuthHeader();
    const contentType = { "content-type": "application/json" };
    const options = data ? { mode: "cors", data: data } : {};
    try {
      const response = await axios(url, {
        method: "PUT",
        headers: { ...authHeader, ...contentType },
        ...options,
      });

      result.status = response.status;
      result.ok = response.ok;
      result.message = this.getStatusMessage(response.status);
      if (response.status === 401 && withRedirect) this.redirect2Login();
      else if (response.status >= 400) console.log("Bad response from server, url: " + url);
      result.object = await response.data;
    } catch (err) {
      const response = err.response;
      result.object = [];

      if (response) {
        result.status = response.status;
        if (response.status === 401 && withRedirect) this.redirect2Login();
        else if (response.status >= 400) console.log("Bad response from server, url: " + url);
        if (response.data.errors && response.data.errors.length > 0) {
          result.message = response.data.errors[0].msg;
          result.object = [];
        }
      } else {
        result.message = "Something went wrong";
      }
    }
    return result;
  }

  async delete(url, withRedirect = true) {
    let result = this.initialResult;
    const authHeader = this.getAuthHeader();

    try {
      let response;
      response = await axios(url, {
        method: "DELETE",
        headers: authHeader,
      });
      result.status = response.status;
      result.ok = response.ok;
      result.object = response.data;
      result.message = this.getStatusMessage(response.status);
      if (response.status === 401 && withRedirect) {
        this.redirect2Login();
      }
    } catch (err) {
      const response = err.response;
      result.object = [];
      if (response) {
        result.status = response.status;
        if (response.status === 401 && withRedirect) this.redirect2Login();
        else if (response.status >= 400) console.log("Bad response from server, url: " + url);
        if (response.data.errors && response.data.errors.length > 0) {
          result.message = response.data.errors[0].msg;
          result.object = [];
        }
      } else {
        result.message = "Something went wrong";
      }
    }
    return result;
  }
}

const request = new requests();
export { request };
