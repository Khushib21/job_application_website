import React from "react";
import "../component/Form.css";

var styling = { backgroundImage: `url(${Image})` };

function changePill() {
  var login = document.getElementById("pills-login");
  var signup = document.getElementById("pills-register");
  var login_link = document.getElementById("login-link");
  var signup_link = document.getElementById("signup-link");

  login.classList.remove("active");
  login.classList.remove("show");
  login_link.classList.remove("active");

  signup.classList.add("active");
  signup.classList.add("show");
  signup_link.classList.add("active");
}
const Login = () => {
  localStorage.setItem("loggedIn", "false");
  const handleClick = () => {
    var var1 = document.getElementById("registerName");
    var var2 = document.getElementById("registerEmail");
    var var3 = document.getElementById("registerPassword");
    var var4 = document.getElementById("registerRepeatPassword");
    if (var3.value != var4.value) {
      alert("Please enter the same password");
      return;
    }
    var params = {
      name: var1.value,
      user_name: var2.value,
      pwd: var3.value,
    };
    var dict = {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json",
      },
    };
    fetch("/usersubmit", dict)
      .then((res) => res.text())
      .then((data2) => {
        alert(data2);

        var1.value = "";
        var2.value = "";
        var3.value = "";
        var4.value = "";
      })
      .catch((error) => {
        alert(error);
      });
  };

  const loginclick = () => {
    var var1 = document.getElementById("loginName");
    var var2 = document.getElementById("loginPassword");
    var params = {
      user_name: var1.value,
      pwd: var2.value,
    };
    var dict = {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(params),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    fetch("/usersignin", dict)
      .then((res) => res.text())
      .then((data2) => {
        alert(data2);
        if (data2 == "Logged in!") {
          localStorage.setItem("loggedIn", "true");
          window.location.href = "/home/";
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div class="bgimage vh-100">
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <h1 className="navbar-brand text-light ms-2">JobsForYou.</h1>
          <ul class="nav justify-content-end">
            <li class="nav-item">
              <a class="nav-link active text-light" href="/home">
                Home
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link text-light" href="/">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div class=" mx-5 my-5 col d-flex justify-content-center" style={styling}>
        <div class="card shadow border p-3" style={{ width: "22rem" }}>

          <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active btn btn-dark"
                data-bs-toggle="pill"
                href="#pills-login"
                id="login-link"
              >
                Login
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link btn btn-dark"
                data-bs-toggle="pill"
                href="#pills-register"
                id="signup-link"
              >
                Register
              </a>
            </li>
          </ul>

          <div class="tab-content">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <div class="form-floating mb-4">
                <input
                  type="text"
                  id="loginName"
                  class="form-control"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address or Username</label>
              </div>

              {/* <!-- Password input --> */}
              <div class="form-floating mb-4">
                <input
                  type="password"
                  id="loginPassword"
                  class="form-control"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              {/* <!-- 2 column grid layout --> */}
              <div class="row mb-4">
                <div class="col-md-6 d-flex justify-content-center">
                  {/* <!-- Checkbox --> */}
                  <div class="form-check mb-3 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="loginCheck"
                    />
                    <label class="form-check-label" htmlFor="loginCheck">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                </div>

                <div class="col-md-6 d-flex justify-content-center">
                  {/* <!-- Simple link --> */}
                </div>
              </div>

              {/* <!-- Submit button --> */}
              <input
                type="submit"
                class="btn btn-secondary btn-block mb-4 btn-dark"
                onClick={loginclick}
                value="Sign in"
              />

              {/* <!-- Register buttons --> */}
              <div class="text-center">
                <p>
                  Don't have an account?{" "}
                  <a href="#pills-register" onClick={changePill}>
                    Create
                  </a>
                </p>
              </div>
              {/* </form> */}
            </div>
            <div
              class="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="tab-register"
            >

              {/* <!-- Name input --> */}
              <div class="form-floating mb-4">
                <input
                  type="text"
                  id="registerName"
                  class="form-control"
                  placeholder="Name"
                />
                <label class="form-label" htmlFor="registerName">
                  Name
                </label>
              </div>

  

              {/* <!-- Email input --> */}
              <div class="form-floating mb-4">
                <input
                  type="text"
                  id="registerEmail"
                  class="form-control"
                  placeholder="Email"
                />
                <label class="form-label" htmlFor="registerEmail">
                  Username or Email
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div class="form-floating mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  class="form-control"
                  placeholder="Password"
                />
                <label class="form-label" htmlFor="registerPassword">
                  Password
                </label>
              </div>

              {/* <!-- Repeat Password input --> */}
              <div class="form-floating mb-4">
                <input
                  type="password"
                  id="registerRepeatPassword"
                  class="form-control"
                  placeholder="Password"
                />
                <label class="form-label" htmlFor="registerRepeatPassword">
                  Repeat password
                </label>
              </div>

              {/* <!-- Checkbox --> */}
              <div class="form-check d-flex justify-content-center mb-4">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  checked
                  aria-describedby="registerCheckHelpText"
                />
                <label class="form-check-label" htmlFor="registerCheck">
                  I have read and agree to the terms
                </label>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                class="btn btn-secondary btn-block mb-3 btn-dark"
                onClick={handleClick}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
