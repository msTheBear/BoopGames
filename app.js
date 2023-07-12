const preloader = document.querySelector(".preloaderWrapper");
const divToHide = document.querySelector(".tempMainContainer");
const navToShow = document.querySelector(".navbar");
const resultToShow = document.querySelector(".result-grid");

let spinnerShowOnce = (function () {

    let executed = false;

    return function () {
        if (!executed) {
            executed = true;

            preloader.classList.add("fadeOut");

            setTimeout(() => {
                preloader.classList.remove("fadeOut");
                divToHide.style.display = "none";
                navToShow.style.visibility = "visible";
                resultToShow.style.visibility = "visible";
            }, 1000);
        }
    };
})();

const gameSearchBox = document.getElementById("searchInput");
const searchList = document.getElementById("search-list");

const resultGrid = document.getElementById("result-grid");

const gameSearchBoxHome = document.getElementById("tempSearchInput");
const searchListHome = document.getElementById("tempSearch-list");

async function loadGames(searchTerm) {
    const myKey = "2f4f3a63a70547808d67ee081a47f08b";
    const res = await axios.get(`https://api.rawg.io/api/games?key=${myKey}&search=${searchTerm}&search_exact=false&page_size=20`);
    displayGameList(res.data.results);
}

function findGames() {
    let searchTerm = (gameSearchBox.value);

    if (searchTerm.length > 0) {
        searchList.classList.remove("hide-search-list");
        loadGames(searchTerm);
    } else {
        searchList.classList.add("hide-search-list");
    }
}

function displayGameList(games) {

    searchList.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
        let gameListItem = document.createElement("div");
        gameListItem.dataset.id = games[i].id;
        gameListItem.classList.add("search-list-item");

        gamePoster = games[i].background_image;
        gameTitle = games[i].name;
        gameRelease = games[i].released;

        gameListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${gamePoster}" alt="Game's Poster"
            class="img-search-thumbnail">
        </div>
        <div class="search-item-info">
            <h3>${gameTitle}</h3>
            <p>${gameRelease}</p>
        </div>`;
        searchList.appendChild(gameListItem);
    }

    loadGameDetails();
}

function loadGameDetails() {

    const searchListGames = searchList.querySelectorAll(".search-list-item");

    searchListGames.forEach(game => {
        game.addEventListener("click", async () => {
            // console.log(game.dataset);
            searchList.classList.add("hide-search-list");
            gameSearchBox.value = "";
            const myKey = "2f4f3a63a70547808d67ee081a47f08b";
            const gameId = game.dataset.id;

            const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${myKey}`);
            const resultScreenshots = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${myKey}`);
            const gameDetails = await result.json();
            const gameScreenshots = await resultScreenshots.json();
            displayGameDetails(gameDetails, gameScreenshots);
        })
    })
}

async function loadGamesHome(searchTerm) {
    const myKey = "2f4f3a63a70547808d67ee081a47f08b";
    const res = await axios.get(`https://api.rawg.io/api/games?key=${myKey}&search=${searchTerm}&search_exact=false&page_size=20`);

    displayGameListHome(res.data.results);
}

function findGamesHome() {

    let searchTerm = (gameSearchBoxHome.value);

    if (searchTerm.length > 0) {
        searchListHome.classList.remove("hide-search-list");
        loadGamesHome(searchTerm);
    } else {
        searchListHome.classList.add("hide-search-list");
    }
}

function displayGameListHome(games) {

    searchListHome.innerHTML = "";

    for (let i = 0; i < games.length; i++) {
        let gameListItem = document.createElement("div");
        gameListItem.dataset.id = games[i].id;
        gameListItem.classList.add("search-list-item");

        gamePoster = games[i].background_image;
        gameTitle = games[i].name;
        gameRelease = games[i].released;

        gameListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${gamePoster}" alt="Game's Poster"
            class="img-search-thumbnail">
        </div>
        <div class="search-item-info">
            <h3>${gameTitle}</h3>
            <p>${gameRelease}</p>
        </div>`;

        searchListHome.appendChild(gameListItem);
    }
    loadGameDetailsHome();
}

function loadGameDetailsHome() {
    const searchListGames = searchListHome.querySelectorAll(".search-list-item");

    searchListGames.forEach(game => {
        game.addEventListener("click", async () => {
            searchListHome.classList.add("hide-search-list");
            gameSearchBoxHome.value = "";
            const myKey = "2f4f3a63a70547808d67ee081a47f08b";
            const gameId = game.dataset.id;

            const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${myKey}`);
            const resultScreenshots = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${myKey}`);
            const gameDetails = await result.json();
            const gameScreenshots = await resultScreenshots.json();

            spinnerShowOnce();

            displayGameDetails(gameDetails, gameScreenshots);
        })
    })
}

function displayGameDetails(details, screenshots) {

    screenshot1 = "";
    screenshot2 = "";
    screenshot3 = "";
    screenshot4 = "";

    const genreArray = details.genres;
    const genreAll = genreArray.map(function (singleGenre) {
        return singleGenre.name;
    })

    const platformArray = details.platforms;
    const platformAll = platformArray.map(function (singlePlatform) {
        return singlePlatform.platform.name;
    })

    if (screenshots.results.length === 0) {
        screenshot1 = "./files/not_found.jpg";
        screenshot2 = "./files/not_found.jpg";
        screenshot3 = "./files/not_found.jpg";
        screenshot4 = "./files/not_found.jpg";
    } if (screenshots.results.length >= 1 && screenshots.results.length < 2) {
        screenshot1 = screenshots.results[0].image;
        screenshot2 = "./files/not_found.jpg";
        screenshot3 = "./files/not_found.jpg";
        screenshot4 = "./files/not_found.jpg";
    } if (screenshots.results.length >= 2 && screenshots.results.length < 3) {
        screenshot1 = screenshots.results[0].image;
        screenshot2 = screenshots.results[1].image;
        screenshot3 = "./files/not_found.jpg";
        screenshot4 = "./files/not_found.jpg";
    } if (screenshots.results.length >= 3 && screenshots.results.length < 4) {
        screenshot1 = screenshots.results[0].image;
        screenshot2 = screenshots.results[1].image;
        screenshot3 = screenshots.results[2].image;
        screenshot4 = "./files/not_found.jpg";
    } if (screenshots.results.length >= 4 && screenshots.results.length < 5) {
        screenshot1 = screenshots.results[0].image;
        screenshot2 = screenshots.results[1].image;
        screenshot3 = screenshots.results[2].image;
        screenshot4 = screenshots.results[3].image;
    } if (screenshots.results.length >= 5) {
        screenshot1 = screenshots.results[0].image;
        screenshot2 = screenshots.results[1].image;
        screenshot3 = screenshots.results[2].image;
        screenshot4 = screenshots.results[3].image;
    }

    window.addEventListener("load", function () {
        preloader.classList.add("fadeOut");
    });

    function isRatingZero(value) {
        if (value === null) {
            return "0 votes";
        }
        return details.metacritic;
    }

    resultGrid.innerHTML = `
    <div class="mainContainer">
            <div class="row">
                <div class="col-md-3 col-12">
                    <div class="movableLeftSide">
                        <div id="gamePosterContainer">
                            <img src="${details.background_image}" alt="Game's Poster" id="gamePoster" class="img-fluid">
                        </div>

                        <div class="gameTitleBox">
                            <p id="gameTitle">${details.name}</p>
                        </div>

                        <div class="ratingContainer">
                            <div class="row">
                                <div class="rawgRatingMainContainer">
                                    <div class="rawgRatingContainer">
                                        <p id="rawgRating">${details.rating}/5</p><p><span id="rawgRatingCount">&nbsp;(${details.reviews_count} votes)</span></p>
                                    </div>
                                    <div>
                                        <b><span id="stars" class="stars"></span></b>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div class="metacriticRatingContainer">
                                    <div>
                                        <img src="./files/icons/metacritic_logo.svg" id="metacriticLogo">&nbsp;&nbsp;&nbsp;
                                    </div>
                                    <div>
                                        <a href="${details.metacritic_url}" target="_blank" class="links"
                                            id="metacriticRatingLinkBox">
                                            <p><span id="metacriticRating">${isRatingZero(details.metacritic)}</span></p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="heartMainContainer">

                            <div class="heartContainer" id="heartContainer">
                                <?xml version="1.0" encoding="UTF-8"?>
                                <img src="./files/icons/pixel_heart_icon.svg" alt="Heart Icon" srcset="" id="heartIcon" class="heartIcon">
                            </div>

                        </div>
                    </div>
                </div>

                <div class="col-md-9 col-12">
                    <div class="rightSide" id="">
                        <div class="row">
                            <div class="col-md-12">
                                <div id="mainScreenshotContainer">
                                    <div id="carouselExampleIndicators" class="carousel slide">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src="${screenshot1}" class="mainScreenshot img-fluid" alt="Screenshot 1">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="${screenshot2}" class="mainScreenshot img-fluid" alt="Screenshot 2">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="${screenshot3}" class="mainScreenshot img-fluid" alt="Screenshot 3">
                                            </div>
                                            <div class="carousel-item">
                                                <img src="${screenshot4}" class="mainScreenshot img-fluid" alt="Screenshot 4">
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="screenshotsContainer">
                            <div class="row">
                                <div class="col-md-3 col-6">
                                    <div id="screenshotImg1">
                                        <img type="button" src="${screenshot1}" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="screenshots" aria-current="true" aria-label="Slide 1">
                                    </div>
                                </div>
                                <div class="col-md-3 col-6">
                                    <div id="screenshotImg2">
                                        <img type="button" src="${screenshot2}" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="screenshots" aria-current="true" aria-label="Slide 2">
                                    </div>
                                </div>
                                <div class="col-md-3 col-6">
                                    <div id="screenshotImg3">
                                        <img type="button" src="${screenshot3}" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" class="screenshots" aria-current="true" aria-label="Slide 3">
                                    </div>
                                </div>
                                <div class="col-md-3 col-6">
                                    <div id="screenshotImg4">
                                        <img type="button" src="${screenshot4}" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" class="screenshots" aria-current="true" aria-label="Slide 4">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="plotContainer">
                        <div class="row">
                            <div class="col-12 storyIconContainer">
                                <img src="./files/icons/story_icon.svg" alt="Story Icon" id="storyIcon">
                            </div>
                            <div class="col-12">
                                <p id="plot" class="show-read-more">${details.description_raw}</p>
                            </div>
                        </div>
                    </div>
                    <br>

                    <div class="gameInfoContainer">
                        <div class="row">
                            <div class="col-6 col-xl-3 platformsContainer">
                                <div class="gameInfoUpperContainer">
                                    <img src="./files/icons/platform_icon.svg" alt="Platform Icon" class="gameInfoIcons">
                                    <p>PLATFORMS</p>
                                </div>
                                <div class="gameInfoLowerContainer">
                                    <p class="gameInfoLowerTitles">${platformAll.join("<br />")}</p>
                                </div>
                            </div>
                            <div class="col-6 col-xl-3 releasedContainer">
                                <div class="gameInfoUpperContainer">
                                    <img src="./files/icons/release_icon.svg" alt="Release Icon" class="gameInfoIcons">
                                    <p>RELEASED</p>
                                </div>
                                <div class="gameInfoLowerContainer">
                                    <p class="gameInfoLowerTitles">${details.released}</p>
                                </div>
                            </div>
                            <div class="col-6 col-xl-3 genreContainer">
                                <div class="gameInfoUpperContainer">
                                    <img src="./files/icons/genre_icon.svg" alt="Genre Icon" class="gameInfoIcons">
                                    <p>GENRE</p>
                                </div>
                                <div class="gameInfoLowerContainer">
                                    <p class="gameInfoLowerTitles">${genreAll.join("<br />")}</p>
                                </div>
                            </div>
                            <div class="col-6 col-xl-3 developerContainer">
                                <div class="gameInfoUpperContainer">
                                    <img src="./files/icons/developer_icon.svg" alt="Developer Icon" class="gameInfoIcons">
                                    <p>DEVELOPER</p>
                                </div>
                                <div class="gameInfoLowerContainer">
                                    <p class="gameInfoLowerTitles">${details.developers[0].name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div id="footerBox">
        <img src="./files/logo/BoopGamesLogo.svg" alt="Boop Games Logo" id="tempBoopGamesLogoFooter">
        <img src="./files/logo/BoopGamesText.svg" alt="Boop Games Text" id="tempBoopGamesTextFooter">
        <a href="https://rawg.io/" target="_blank">
            <button id="rawgButton">R A W G</button>
        </a>
    </div>

    <a href="https://rawg.io/" target="_blank">
        <button id="rawgButton">R A W G</button>
    </a>

    `;

    // Click on a heart to start animation - START

    $(document).ready(function () {
        $("#heartIcon").click(function () {
            $(".heartIcon").addClass("animated");
        });

        $(".heartIcon").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
            $(this).removeClass("animated");
        });
    });

    // Click on a heart to start animation - END


    // Convert rating to stars - START

    document.getElementById("stars").innerHTML = getStars(details.rating);

    function getStars(rating) {

        rating = Math.round(rating * 2) / 2;
        let output = [];

        for (var i = rating; i >= 1; i--)
            output.push('<img src="./files/icons/rating_full_icon.svg" class="stars">');

        if (i == .5) output.push('<img src="./files/icons/rating_half_icon.svg" class="stars">');

        for (let i = (5 - rating); i >= 1; i--)
            output.push('<img src="./files/icons/rating_empty_icon.svg" class="stars">');

        return output.join("");

    }

    // Convert rating to stars - END


    // After 478 characters show a button "read more" - START

    $(document).ready(function () {
        let maxLength = 478;
        $(".show-read-more").each(function () {
            let myStr = $(this).text();
            if ($.trim(myStr).length > maxLength) {
                let newStr = myStr.substring(0, maxLength);
                let removedStr = myStr.substring(maxLength, $.trim(myStr).length);
                $(this).empty().html(newStr);
                $(this).append(' <a href="javascript:void(0);" class="read-more">read more...</a>');
                $(this).append('<span class="more-text">' + removedStr + "</span>");
            }
        });

        $(".read-more").click(function () {
            $(this).next(".more-text").slideToggle(200);
            $(this).remove();
        });
    });

    // After 478 characters show a button "read more" - END    

}

// Replace screenshots - START

function screenshotOne() {

    const screenshotMainOne = document.querySelector("#screenshotMainOne");
    screenshotMainOne.classList.remove("screenshots");
    screenshotMainOne.classList.add("screenshotMainOne");
    const mainScreenshot = document.querySelector("#mainScreenshot");
    mainScreenshot.classList.remove("screenshots");
    mainScreenshot.classList.add("mainScreenshot");
    document.getElementById("mainScreenshot").src = `${screenshot1} `;
    document.getElementById("screenshotMainOne").scrollIntoView()
}

function screenshotTwo() {

    const screenshotMainTwo = document.querySelector("#screenshotMainTwo");
    screenshotMainTwo.classList.remove("screenshots");
    screenshotMainTwo.classList.add("screenshotMainTwo");
    const mainScreenshot = document.querySelector("#mainScreenshot");
    mainScreenshot.classList.remove("screenshots");
    mainScreenshot.classList.add("mainScreenshot");
    document.getElementById("mainScreenshot").src = `${screenshot2} `;
    document.getElementById("screenshotMainTwo").scrollIntoView()
}

function screenshotThree() {

    const screenshotMainThree = document.querySelector("#screenshotMainThree");
    screenshotMainThree.classList.remove("screenshots");
    screenshotMainThree.classList.add("screenshotMainThree");
    const mainScreenshot = document.querySelector("#mainScreenshot");
    mainScreenshot.classList.remove("screenshots");
    mainScreenshot.classList.add("mainScreenshot");
    document.getElementById("mainScreenshot").src = `${screenshot3} `;
    document.getElementById("screenshotMainThree").scrollIntoView()
}

function screenshotFour() {

    const screenshotMainFour = document.querySelector("#screenshotMainFour");
    screenshotMainFour.classList.remove("screenshots");
    screenshotMainFour.classList.add("screenshotMainFour");
    const mainScreenshot = document.querySelector("#mainScreenshot");
    mainScreenshot.classList.remove("screenshots");
    mainScreenshot.classList.add("mainScreenshot");
    document.getElementById("mainScreenshot").src = `${screenshot4} `;
    document.getElementById("screenshotMainFour").scrollIntoView()
}

// Replace screenshots - END


// Click outside a search field to hide results - START

window.addEventListener("click", (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add("hide-search-list");
        searchListHome.classList.add("hide-search-list");
    }
})

// Click outside a search field to hide results - END