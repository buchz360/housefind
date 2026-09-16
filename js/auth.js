const showSignIn =
  document.getElementById("showSignIn");

const showSignUp =
  document.getElementById("showSignUp");

const signInForm =
  document.getElementById("signInForm");

const signUpForm =
  document.getElementById("signUpForm");

const authMessage =
  document.getElementById("authMessage");

const signInButton =
  document.getElementById("signInButton");

const signUpButton =
  document.getElementById("signUpButton");

const loggedInPanel =
  document.getElementById("loggedInPanel");

const loggedInEmail =
  document.getElementById("loggedInEmail");

const signOutButton =
  document.getElementById("signOutButton");


/* =========================================
   MESSAGE
   ========================================= */

function showMessage(
  message,
  type = "info"
) {

  authMessage.textContent = message;

  authMessage.className =
    `auth-message ${type}`;

  authMessage.hidden = false;

}


function hideMessage() {

  authMessage.hidden = true;

}


/* =========================================
   SWITCH FORMS
   ========================================= */

function openSignIn() {

  hideMessage();

  showSignIn.classList.add("active");

  showSignUp.classList.remove("active");

  signInForm.hidden = false;

  signUpForm.hidden = true;

}


function openSignUp() {

  hideMessage();

  showSignUp.classList.add("active");

  showSignIn.classList.remove("active");

  signUpForm.hidden = false;

  signInForm.hidden = true;

}


showSignIn.addEventListener(
  "click",
  openSignIn
);


showSignUp.addEventListener(
  "click",
  openSignUp
);


/* =========================================
   SIGN UP
   ========================================= */

signUpForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    hideMessage();


    const fullName =
      document
        .getElementById("fullName")
        .value
        .trim();


    const phone =
      document
        .getElementById("phone")
        .value
        .trim();


    const email =
      document
        .getElementById("signUpEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
      document
        .getElementById("signUpPassword")
        .value;


    const confirmPassword =
      document
        .getElementById("confirmPassword")
        .value;


    if(password !== confirmPassword){

      showMessage(
        "The passwords do not match.",
        "error"
      );

      return;

    }


    if(password.length < 8){

      showMessage(
        "Your password must contain at least 8 characters.",
        "error"
      );

      return;

    }


    signUpButton.disabled = true;

    signUpButton.textContent =
      "Creating Account...";


    const { data, error } =
      await supabaseClient.auth.signUp({

        email,

        password,

        options: {

          data: {

            full_name: fullName,

            phone: phone

          }

        }

      });


    signUpButton.disabled = false;

    signUpButton.textContent =
      "Create Account";


    if(error){

      console.error(
        "SIGN UP ERROR:",
        error
      );

      showMessage(
        error.message,
        "error"
      );

      return;

    }


    if(
      data.user &&
      !data.session
    ){

      showMessage(
        "Account created. Check your email to confirm your account before signing in.",
        "success"
      );

      signUpForm.reset();

      return;

    }


    if(data.session){

      showLoggedInState(
        data.user
      );

    }

  }
);


/* =========================================
   SIGN IN
   ========================================= */

signInForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    hideMessage();


    const email =
      document
        .getElementById("signInEmail")
        .value
        .trim()
        .toLowerCase();


    const password =
      document
        .getElementById("signInPassword")
        .value;


    signInButton.disabled = true;

    signInButton.textContent =
      "Signing In...";


    const { data, error } =
      await supabaseClient.auth
        .signInWithPassword({

          email,

          password

        });


    signInButton.disabled = false;

    signInButton.textContent =
      "Sign In";


    if(error){

      console.error(
        "SIGN IN ERROR:",
        error
      );

      showMessage(
        error.message,
        "error"
      );

      return;

    }


    showLoggedInState(
      data.user
    );

  }
);


/* =========================================
   LOGGED IN STATE
   ========================================= */

function showLoggedInState(user) {

  signInForm.hidden = true;

  signUpForm.hidden = true;

  showSignIn.parentElement.hidden = true;

  loggedInPanel.hidden = false;

  authMessage.hidden = true;


  loggedInEmail.textContent =
    user.email || "HouseFind User";

}


/* =========================================
   SIGN OUT
   ========================================= */

signOutButton.addEventListener(
  "click",
  async () => {

    const { error } =
      await supabaseClient.auth.signOut();


    if(error){

      showMessage(
        error.message,
        "error"
      );

      return;

    }


    window.location.reload();

  }
);


/* =========================================
   CHECK CURRENT SESSION
   ========================================= */

async function checkCurrentUser() {

  const {
    data: { session }
  } =
    await supabaseClient.auth
      .getSession();


  if(
    session &&
    session.user
  ){

    showLoggedInState(
      session.user
    );

  }

}


checkCurrentUser();


/* =========================================
   AUTH STATE CHANGES
   ========================================= */

supabaseClient.auth
  .onAuthStateChange(
    (event, session) => {

      if(
        event === "SIGNED_IN" &&
        session
      ){

        showLoggedInState(
          session.user
        );

      }

    }
  );
