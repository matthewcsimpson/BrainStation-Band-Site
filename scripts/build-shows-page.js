/**
 * API DETAILS
 */
const API_KEY = "?api_key=bd6be8d0-bde7-4b66-848d-bccaa5394a3a";
const API_BASEURL = "https://project-1-api.herokuapp.com/";

/**
 * DOM Element for the shows listing.
 */
const showsListing = document.querySelector(".shows__listing");

/**
 * function to display a single shows data.
 * @param {Object} show
 */
const displayShow = (show) => {
  // create the ul and append it to the surrounding div
  const showsList = document.createElement("ul");
  showsList.classList.add("shows__list", "shows__list--shows");
  showsListing.appendChild(showsList);

  // create the date li --------------------------
  const showDateLi = document.createElement("li");
  showDateLi.classList.add("shows__list-element");

  const showDateHeader = document.createElement("p");
  showDateHeader.classList.add("shows__item", "shows__item--itemheader");
  showDateHeader.innerText = "Date";

  const showDateP = document.createElement("p");
  showDateP.classList.add(
    "shows__item",
    "shows__item--text",
    "shows__item--bold"
  );

  const showDateData = new Date(show.date);
  showDateP.innerText = showDateData.toDateString();

  showDateLi.appendChild(showDateHeader);
  showDateLi.appendChild(showDateP);

  // create the venue li --------------------------
  const showVenueLi = document.createElement("li");
  showVenueLi.classList.add("shows__list-element");

  const showVenueHeader = document.createElement("p");
  showVenueHeader.classList.add("shows__item", "shows__item--itemheader");
  showVenueHeader.innerText = "Venue";

  const showVenueP = document.createElement("p");
  showVenueP.classList.add("shows__item", "shows__item--text");
  showVenueP.innerText = show.place;

  showVenueLi.appendChild(showVenueHeader);
  showVenueLi.appendChild(showVenueP);

  // create the location li
  const showLocationLi = document.createElement("li");
  showLocationLi.classList.add("shows__list-element");

  const showLocationHeader = document.createElement("p");
  showLocationHeader.classList.add("shows__item", "shows__item--itemheader");
  showLocationHeader.innerText = "Location";

  const showLocationP = document.createElement("p");
  showLocationP.classList.add("shows__item", "shows__item--text");
  showLocationP.innerText = show.location;

  showLocationLi.appendChild(showLocationHeader);
  showLocationLi.appendChild(showLocationP);

  // create the buy tickets button
  const showBuyTicketsLi = document.createElement("li");
  showBuyTicketsLi.classList.add("shows__list-element");
  showBuyTicketsLi.classList.add("shows__item", "shows__item--buy");

  const showBuyTicketsButton = document.createElement("button");
  showBuyTicketsButton.classList.add("bs-button");
  showBuyTicketsButton.setAttribute("name", `${show.date}-${show.venue}`);
  showBuyTicketsButton.innerText = "Buy Tickets";

  showBuyTicketsLi.appendChild(showBuyTicketsButton);
  // append the date, venue, location, buy tickets lis to the ul.
  showsList.appendChild(showDateLi);
  showsList.appendChild(showVenueLi);
  showsList.appendChild(showLocationLi);
  showsList.appendChild(showBuyTicketsLi);

  // listen to the the created UL DOM element in order to mark it selected when clicked on.
  showsList.addEventListener("click", (e) => {
    const selectedShow = document.querySelector(".shows__list--selected");
    if (selectedShow) {
      selectedShow.classList.remove("shows__list--selected");
    } else {
      e.currentTarget.classList.add("shows__list--selected");
    }
  });
};

/**
 * Function to load show data from the remote server.
 */
const loadRemoteShows = () => {
  axios.get(`${API_BASEURL}showdates${API_KEY}`).then((response) => {
    let showData = response.data;
    showData.sort((a, b) => {
      return a.date - b.date; // sort the show data by date just in case.
    });
    showData.forEach((show) => {
      displayShow(show);
    });
  });
};

/**
 * call the function to load show data when the page loads.
 */
loadRemoteShows();
