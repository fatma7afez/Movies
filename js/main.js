$(document).ready(() => {
  let navberWidth = $("#navBar").innerWidth();
  $("#sideBar").animate({ left: `-${navberWidth}` }, 0);
  getMovies();

  $(".spinner").fadeOut(1000, () => {
    $(".spinner")
      .parent()
      .fadeOut(1000, () => {
        $("#loading").remove();
        $("body").css("overflow", "auto");
      });
  });
});

////////////////////////////////////api module//////////////////////////////

let moviesList = [];
async function getMovies(type = "movie", category = "now_playing") {
  let response = await fetch(
    `https://api.themoviedb.org/3/${type}/${category}?api_key=9282a6a26058bb924868a59555b39267&language=en-US&page=1`
  );
  let result = await response.json();
  moviesList = result.results;
  displayMovies();
};

function displayMovies() {
  let cartona = ``;
  for (let i = 0; i < moviesList.length; i++) {
    cartona += `
        <div class="col-lg-4 col-md-6">
         <div class="home-desc bg-primary mb-3 position-relative overflow-hidden ">
            <img src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" alt="moviePoster" class="w-100">
            <div class="layer w-100 h-100 p-3 position-absolute d-flex justify-content-center align-items-center">
              <div class="home-detail text-center">
               <h2>${moviesList[i].title}</h2>
                <p>
                ${moviesList[i].overview}
                </p>
                <p>${moviesList[i].vote_average}</p>
                <p>${moviesList[i].release_date}</p>
               </div>
            </div>
         </div>
         </div>
        `;
  };
  document.getElementById("myRow").innerHTML = cartona;
};

let searchApi = document.getElementById("searchApi");
searchApi.addEventListener("keyup", (e) => {
  category = e.target.value;
  searchFromApi(category);
});

async function searchFromApi(term) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=9282a6a26058bb924868a59555b39267&language=en-US&query=${term}&include_adult=false`
  );
  let result = await response.json();
  moviesList = result.results;
  displayMovies();
};

let searchWebsite = document.getElementById("searchWebsite");
searchWebsite.addEventListener("keyup", (e) => {
  category = e.target.value;
  searchFromWebsite(category);
});

function searchFromWebsite(term) {
  let cartona = ``;
  for (let i = 0; i < moviesList.length; i++) {
    if (moviesList[i].title.toLowerCase().includes(term.toLowerCase())) {
      cartona += `
            <div class="col-lg-4 col-md-6">
             <div class="home-desc bg-primary mb-3 position-relative overflow-hidden ">
                <img src="https://image.tmdb.org/t/p/w500${moviesList[i].poster_path}" alt="moviePoster" class="w-100">
                <div class="layer w-100 h-100 p-3 position-absolute d-flex justify-content-center align-items-center">
                  <div class="home-detail text-center">
                   <h2>${moviesList[i].title}</h2>
                    <p>
                    ${moviesList[i].overview}
                    </p>
                    <p>${moviesList[i].vote_average}</p>
                    <p>${moviesList[i].release_date}</p>
                   </div>
                </div>
             </div>
             </div>
            `;
    };
  };
  document.getElementById("myRow").innerHTML = cartona;
};

$("li a[keyType]").click((e) => {
  let keyType = $(e.target).attr("keyType");
  let keyCategory = $(e.target).attr("keyCategory");
  getMovies(keyType, keyCategory);
});

$("#toggleBtn").click(() => {
  let navberWidth = $("#navBar").innerWidth();

  if ($("#sideBar").css("left") == `0px`) {
    $("#sideBar").animate({ left: `-${navberWidth}` }, 1000, () => {
      $("#toggleBtn").attr("class", `fas fa-align-justify fa-2x`);
    });
  } else {
    $("#sideBar").animate({ left: `0px` }, 1000);
    $("#toggleBtn").attr("class", `fas fa-times fa-2x`);
    $(".sidenav li")
      .eq(0)
      .animate({ opacity: "1", top: "25px" }, 1000, () => {
        $(".sidenav li")
          .eq(1)
          .animate({ opacity: "1", top: "30px" }, 500, () => {
            $(".sidenav li")
              .eq(2)
              .animate({ opacity: "1", top: "35px" }, 500, () => {
                $(".sidenav li")
                  .eq(3)
                  .animate({ opacity: "1", top: "40px" }, 500, () => {
                    $(".sidenav li")
                      .eq(4)
                      .animate({ opacity: "1", top: "45px" }, 500, () => {
                        $(".sidenav li")
                          .eq(5)
                          .animate({ opacity: "1", top: "50px" }, 500);
                      });
                  });
              });
          });
      });
  };
});

////////////////////////////////////validitionModule//////////////////////////////

let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPhone = document.getElementById("userPhone");
let userAge = document.getElementById("userAge");
let userPassword = document.getElementById("userPassword");
let userRepassword = document.getElementById("userRepassword");
let submitBtn = document.getElementById("submitBtn");
let alertName = document.getElementById("alertName");
let alertEmail = document.getElementById("alertEmail");
let alertPhone = document.getElementById("alertPhone");
let alertAge = document.getElementById("alertAge");
let alertPassword = document.getElementById("alertPassword");
let alertRepassword = document.getElementById("alertRepassword");

userName.addEventListener("keyup", () => {
  validationUserName();
});
userEmail.addEventListener("keyup", () => {
  validationUserEmail();
});
userPhone.addEventListener("keyup", () => {
  validationUserPhone();
});
userAge.addEventListener("keyup", () => {
  validationUserAge();
});
userPassword.addEventListener("keyup", () => {
  validationUserPassword();
});
userRepassword.addEventListener("keyup", () => {
  validationUserRepassword();
});

function validationUserName() {
  let regex = /^[A-Z][a-z]{3,7}$/;

  if (regex.test(userName.value)) {
    alertName.style.display = "none";
    return true;
  } else {
    alertName.style.display = "block";
    return false;
  };
};
function validationUserEmail() {
  let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(userEmail.value)) {
    alertEmail.style.display = "none";
    return true;
  } else {
    alertEmail.style.display = "block";
    return false;
  };
};
function validationUserPhone() {
  let regex = /^01[0125][0-9]{8}$/;

  if (regex.test(userPhone.value)) {
    alertPhone.style.display = "none";
    return true;
  } else {
    alertPhone.style.display = "block";
    return false;
  };
};
function validationUserAge() {
  let regex = /^([1-7][0-9]|80)$/;

  if (regex.test(userAge.value)) {
    alertAge.style.display = "none";
    return true;
  } else {
    alertPhone.style.display = "block";
    return false;
  };
};

function validationUserPassword() {
  let regex = /[^!@#$%^&*()][A-Za-z0-9]{6,16}$/;

  if (regex.test(userPassword.value)) {
    alertPassword.style.display = "none";
    return true;
  } else {
    alertPassword.style.display = "block";
    return false;
  };
};

function validationUserRepassword() {
  if (userRepassword.value == userPassword.value) {
    alertRepassword.style.display = "none";
    return true;
  } else {
    alertRepassword.style.display = "block";
    return false;
  };
};

function submitData() {
  if (
    validationUserName() &&
    validationUserEmail() &&
    validationUserPhone() &&
    validationUserAge() &&
    validationUserPassword() &&
    validationUserRepassword()
  ) {
    submitBtn.removeAttribute("disabled");
  };
};

$(".contact input").change(() => {
  submitData();
});
