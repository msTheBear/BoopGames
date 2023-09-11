const preloader = document.querySelector(".preloaderWrapper");
const divToHide = document.querySelector(".headerContainer");
const navToShow = document.querySelector(".navbar");
const resultToShow = document.querySelector(".result-grid");
const footer = document.querySelector("#footer");
const gameSearchBox = document.getElementById("searchInput");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");
const gameSearchBoxHome = document.getElementById("tempSearchInput");
const searchListHome = document.getElementById("tempSearch-list");


// Spinner loader START

let loadingSpinner = (function () {
    return function () {
        preloader.classList.add("fadeOut");
        setTimeout(() => {
            preloader.classList.remove("fadeOut");
            divToHide.style.display = "none";
            navToShow.style.visibility = "visible";
            resultToShow.style.visibility = "visible";
            footer.style.zIndex = "5";
        }, 2000);
    };
})();

// Spinner loader END


// Connecting to RAWG START

async function loadGames(searchTerm) {
    const myKey = "2f4f3a63a70547808d67ee081a47f08b";
    const res = await axios.get(`https://api.rawg.io/api/games?key=${myKey}&search=${searchTerm}&search_exact=false&page_size=20`);
    displayGameList(res.data.results);
}

// Connecting to RAWG END


// Game search results START

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
        gameListItem.tabIndex = 0;
        gameListItem.dataset.id = games[i].id;
        gameListItem.classList.add("search-list-item");
        gamePoster = games[i].background_image;
        gameTitle = games[i].name;
        gameRelease = games[i].released;

        gameListItem.innerHTML = `
        <figure class="search-item-thumbnail">
            <img src="${gamePoster}" alt="Game poster" aria-hidden="true"
            class="img-search-thumbnail" loading="lazy">
        </figure>
        <div class="search-item-info">
            <h3>${gameTitle}</h3>
            <p aria-hidden="true">${gameRelease}</p>
        </div>`;

        searchList.appendChild(gameListItem);
    }
    loadGameDetails();
}

function loadGameDetails() {

    const searchListGames = searchList.querySelectorAll(".search-list-item");

    searchListGames.forEach(game => {
        game.addEventListener("click", async () => {
            loadingSpinner();
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

    searchListGames.forEach(game => {
        game.addEventListener("keypress", async () => {
            if (event.key === "Enter") {
                loadingSpinner();
                searchListHome.classList.add("hide-search-list");
                searchList.classList.add("hide-search-list");
                searchListHome.classList.add("hide-search-list");
                gameSearchBox.value = "";
                const myKey = "2f4f3a63a70547808d67ee081a47f08b";
                const gameId = game.dataset.id;
                const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${myKey}`);
                const resultScreenshots = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${myKey}`);
                const gameDetails = await result.json();
                const gameScreenshots = await resultScreenshots.json();
                displayGameDetails(gameDetails, gameScreenshots);
            }
        })
    })

}

// Game search results END


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
        gameListItem.tabIndex = 0;
        gameListItem.dataset.id = games[i].id;
        gameListItem.classList.add("search-list-item");
        gamePoster = games[i].background_image;
        gameTitle = games[i].name;
        gameRelease = games[i].released;

        gameListItem.innerHTML = `
        <figure class="search-item-thumbnail">
            <img src="${gamePoster}" alt="Game poster" aria-hidden="true"
            class="img-search-thumbnail" loading="lazy">
        </figure>
        <div class="search-item-info">
            <h3>${gameTitle}</h3>
            <p aria-hidden="true">${gameRelease}</p>
        </div>`;

        searchListHome.appendChild(gameListItem);
    }
    loadGameDetailsHome();
}

function loadGameDetailsHome() {
    const searchListGames = searchListHome.querySelectorAll(".search-list-item");

    searchListGames.forEach(game => {
        game.addEventListener("click", async () => {
            loadingSpinner();
            searchListHome.classList.add("hide-search-list");
            gameSearchBoxHome.value = "";
            const myKey = "2f4f3a63a70547808d67ee081a47f08b";
            const gameId = game.dataset.id;

            const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${myKey}`);
            const resultScreenshots = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${myKey}`);
            const gameDetails = await result.json();
            const gameScreenshots = await resultScreenshots.json();

            displayGameDetails(gameDetails, gameScreenshots);
        })
    })

    searchListGames.forEach(game => {
        game.addEventListener("keypress", async () => {
            if (event.key === "Enter") {
                loadingSpinner();
                searchListHome.classList.add("hide-search-list");
                gameSearchBoxHome.value = "";
                const myKey = "2f4f3a63a70547808d67ee081a47f08b";
                const gameId = game.dataset.id;
                const result = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${myKey}`);
                const resultScreenshots = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${myKey}`);
                const gameDetails = await result.json();
                const gameScreenshots = await resultScreenshots.json();

                displayGameDetails(gameDetails, gameScreenshots);
            }
        })
    })
}


// Game page details START

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
            <div class="mainSection">
                <div class="row">
                    <div class="col-md-4 col-12">
                        <aside class="movableLeftSide">
                            <p class="sr-only">Game summary</p>
                            <figure id="gamePosterContainer">
                                <img src="${details.background_image}" alt="Game poster" id="gamePoster"
                                    class="img-fluid" loading="lazy">
                            </figure>

                            <div class="gameTitleContainer">
                                <p id="gameTitle"><span class="sr-only">Game title</span>${details.name}</p>
                            </div>

                            <div class="ratingContainer">
                                <div class="row">
                                    <div class="rawgRatingMainContainer">
                                        <div class="rawgRatingContainer">

                                            <p id="rawgRating"><span class="sr-only">Game rating out of
                                                    5</span>${details.rating}<span aria-hidden="true">/5</span></p>
                                            <p id="rawgRatingCount"><span class="sr-only">Number of
                                                    votes:</span>&nbsp;&nbsp;${details.reviews_count}&nbsp;<span
                                                    aria-hidden="true">votes</span></p>
                                        </div>
                                        <div>
                                            <b><span id="stars" class="stars" aria-hidden="true"></span></b>
                                        </div>
                                    </div>
                                </div>
                                <figure class="metacriticRatingContainer">
                                    <img src="./files/icons/metacritic_logo.svg" role="img" id="metacriticLogo" loading="lazy" aria-label="Metacritic logo">
                                    <p class="sr-only">Metacritic rating out of
                                        100:<span>${isRatingZero(details.metacritic)}</span></p>
                                    <a href="${details.metacritic_url}" target="_blank" class="links"
                                        id="metacriticRatingLinkBox" aria-label="Metacritic">
                                        <p id="metacriticRating">${isRatingZero(details.metacritic)}</p>
                                    </a>
                                </figure>
                            </div>
                            <figure class="heartContainer">
                                <img src="./files/icons/pixel_heart_icon.svg" role="img" aria-label="Heart icon" class="heartIcon" id="heartIcon" loading="lazy">
                            </figure>
                        </aside>
                    </div>

                    <main class="col-md-8 col-12">
                        <section class="rightSide">
                            <p class="sr-only">Game screenshots</p>
                            <div class="row">
                                <div class="col-md-12">
                                    <div id="mainScreenshotContainer">
                                        <div id="carouselExampleIndicators" class="carousel slide">
                                            <div class="carousel-inner">
                                                <figure class="carousel-item active">
                                                    <img src="${screenshot1}" class="mainScreenshot img-fluid"
                                                        alt="Screenshot 1" loading="lazy">
                                                </figure>
                                                <figure class="carousel-item">
                                                    <img src="${screenshot2}" class="mainScreenshot img-fluid"
                                                        alt="Screenshot 2" loading="lazy">
                                                </figure>
                                                <figure class="carousel-item">
                                                    <img src="${screenshot3}" class="mainScreenshot img-fluid"
                                                        alt="Screenshot 3" loading="lazy">
                                                </figure>
                                                <figure class="carousel-item">
                                                    <img src="${screenshot4}" class="mainScreenshot img-fluid"
                                                        alt="Screenshot 4" loading="lazy">
                                                </figure>
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
                                        <figure id="screenshotImg1">
                                            <img type="button" src="${screenshot1}"
                                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                                class="screenshots" aria-current="true"
                                                aria-label="Screenshot 1 thumbnail" loading="lazy">
                                        </figure>
                                    </div>
                                    <div class="col-md-3 col-6">
                                        <figure id="screenshotImg2">
                                            <img type="button" src="${screenshot2}"
                                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                                class="screenshots" aria-current="true"
                                                aria-label="Screenshot 2 thumbnail" loading="lazy">
                                        </figure>
                                    </div>
                                    <div class="col-md-3 col-6">
                                        <figure id="screenshotImg3">
                                            <img type="button" src="${screenshot3}"
                                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                                class="screenshots" aria-current="true"
                                                aria-label="Screenshot 3 thumbnail" loading="lazy">
                                        </figure>
                                    </div>
                                    <div class="col-md-3 col-6">
                                        <figure id="screenshotImg4">
                                            <img type="button" src="${screenshot4}"
                                                data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
                                                class="screenshots" aria-current="true"
                                                aria-label="Screenshot 4 thumbnail" loading="lazy">
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="descriptionContainer">
                            <p class="sr-only">Game description</p>
                            <div class="descriptionExpandContainer">
                                <img src="./files/icons/description_icon.svg" role="img" aria-label="Description icon" id="descriptionIcon" aria-hidden="true" loading="lazy">
                                <button id="description-toggle">Show full description</button>
                            </div>
                            <div class="hide-show">
                                <div class="description" id="collllapser">
                                    <p id="description">${details.description_raw}</p>
                                </div>
                            </div>
                        </section>

                        <section class="gameInfoContainer">
                            <p class="sr-only">Game information</p>
                            <div class="row">
                                <div class="col-6 col-xl-3 platformsContainer">
                                    <figure class="gameInfoUpperContainer">
                                        <img role="img" aria-label="Platform icon" class="gameInfoIcons"
                                            src="./files/icons/platform_icon.svg" loading="lazy">
                                        <p>PLATFORMS</p>
                                    </figure>
                                    <div class="gameInfoLowerContainer">
                                        <p class="gameInfoLowerTitles">${platformAll.join("<br />")}</p>
                                    </div>
                                </div>
                                <div class="col-6 col-xl-3 releasedContainer">
                                    <figure class="gameInfoUpperContainer">
                                        <img role="img" aria-label="Release Icon" class="gameInfoIcons"
                                            src="./files/icons/release_icon.svg" loading="lazy">
                                        <p>RELEASED</p>
                                    </figure>
                                    <div class="gameInfoLowerContainer">
                                        <p class="gameInfoLowerTitles">${details.released}</p>
                                    </div>
                                </div>
                                <div class="col-6 col-xl-3 genreContainer">
                                    <figure class="gameInfoUpperContainer">
                                        <img role="img" aria-label="Genre Icon" class="gameInfoIcons"
                                            src="./files/icons/genre_icon.svg" loading="lazy">
                                        <p>GENRE</p>
                                    </figure>
                                    <div class="gameInfoLowerContainer">
                                        <p class="gameInfoLowerTitles">${genreAll.join("<br />")}</p>
                                    </div>
                                </div>
                                <div class="col-6 col-xl-3 developerContainer">
                                    <figure class="gameInfoUpperContainer">
                                        <img role="img" aria-label="Developer Icon" class="gameInfoIcons"
                                            src="./files/icons/developer_icon.svg" loading="lazy">
                                        <p>DEVELOPER</p>
                                    </figure>
                                    <div class="gameInfoLowerContainer">
                                        <p class="gameInfoLowerTitles">${details.developers[0].name}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
    `;


    // Show full description button START

    const description = document.querySelector("#collllapser");
    const descriptionBtn = document.querySelector("#description-toggle");
    description.classList.add("collllapse");

    descriptionBtn.addEventListener("click", () => {
        description.classList.contains("collllapse")
            ? (descriptionBtn.innerHTML = "Collapse description")
            : (descriptionBtn.innerHTML = "Expand description");
        description.classList.toggle("collllapse");
    });

    // Show full description button END


    // Heart animation START

    $(document).ready(function () {
        $("#heartIcon").click(function () {
            $(".heartIcon").addClass("animated");
        });

        $(".heartIcon").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
            $(this).removeClass("animated");
        });
    });

    // Heart animation END


    // Converting rating to stars - START

    document.getElementById("stars").innerHTML = getStars(details.rating);

    function getStars(rating) {

        rating = Math.round(rating * 2) / 2;
        let output = [];

        for (var i = rating; i >= 1; i--)
            output.push('<img src="./files/icons/rating_full_icon.svg" role="img" aria-label="Full star" class="stars">');

        if (i == .5) output.push('<img src="./files/icons/rating_half_icon.svg" role="img" aria-label="Half star" class="stars">');

        for (let i = (5 - rating); i >= 1; i--)
            output.push('<img src="./files/icons/rating_empty_icon.svg" role="img" aria-label="Empty star" class="Empty star">');

        return output.join("");

    }

    // Converting rating to stars - END

}

// Game page details END


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