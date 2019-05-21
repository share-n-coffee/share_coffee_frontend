class requests {
  initialResult = {
    ok: false,
    status: null,
    message: null,
    object: null,
  };

  redirect2Login() {
    localStorage.clear();
    window.location.reload(true);
  }

  getAuthHeader() {
    let header = {};
    const token = localStorage.getItem("adminToken");

    if (token) {
      header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }

    return header;
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

      response = await fetch(url, { headers: authHeader });
      result.status = response.status;
      result.ok = response.ok;
      result.message = this.getStatusMessage(response.status);

      if (response.status === 403 && withRedirect) this.redirect2Login();
      else if (response.status >= 400)
        console.log("Bad response from server, url: " + url);
      if (response.status < 400) {
        result.object = await response.json();
      }
      if (result.object.errors && result.object.errors > 0) {
        result.message = result.object.errors[0].msg;
        result.object = [];
      }
    } catch (err) {
      console.log(err);
      if (result.message === null) result.message = "Something went wrong";
    }
    return result;
  }

  async post(url, data, withRedirect = true) {
    let result = this.initialResult;
    const authHeader = this.getAuthHeader();
    const contentType = { "content-type": "application/json" };
    const options = data ? { mode: "cors", body: data } : {};
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { ...authHeader, ...contentType },
        ...options,
      });
      result.status = response.status;
      result.ok = response.ok;
      result.message = this.getStatusMessage(response.status);
      if (response.status === 403 && withRedirect) this.redirect2Login();
      else if (response.status >= 400)
        console.log("Bad response from server, url: " + url);
      result.object = await response.json();
    } catch (err) {
      console.log(err);

      if (err.message === "Network request failed")
        result.message = "Internet connection error";
      if (result.message === null) result.message = "Something went wrong";
    }
    return result;
  }
}

export default new requests();
