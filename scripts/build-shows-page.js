const showsData = [
  {
    date: "09/06/2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "09/21/2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "10/15/2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "11/06/2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "11/26/2021",
    venue: "Moscow Cener",
    location: "San Francisco, CA",
  },
  {
    date: "12/15/2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// grab shows__listing div
const showsListing = document.querySelector(".shows__listing");

showsData.forEach((show) => {
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
  showDateP.innerText = show.date;

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
  showVenueP.innerText = show.venue;

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

  showsList.addEventListener("click", (e) => {
    const selectedShow = document.querySelector(".shows__list--selected");
    if (selectedShow) {
      selectedShow.classList.remove("shows__list--selected");
    }
    e.currentTarget.classList.add("shows__list--selected");
  });

  // append the date, venue, location, buy tickets lis to the ul.
  showsList.appendChild(showDateLi);
  showsList.appendChild(showVenueLi);
  showsList.appendChild(showLocationLi);
  showsList.appendChild(showBuyTicketsLi);
  // console.log(showsListing);
});
