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
  showsList.classList.add("shows__list");
  showsListing.appendChild(showsList);

  // create the name date li
  const showDateLi = document.createElement("li");
  showDateLi.classList.add("shows__item", "shows__item--date");
  showDateLi.innerText = show.date;

  // create the venue li
  const showVenueLi = document.createElement("li");
  showVenueLi.classList.add("shows__item", "shows__item--venue");
  showVenueLi.innerText = show.venue;

  // create the location li
  const showLocationLi = document.createElement("li");
  showLocationLi.classList.add("shows__item", "shows__item--location");
  showLocationLi.innerText = show.location;

  // create the buy tickets button
  const showBuyTicketsLi = document.createElement("li");
  const showBuyTicketsButton = document.createElement("button");
  showBuyTicketsLi.classList.add("shows__item", "shows__item--buytickets");
  showBuyTicketsButton.setAttribute("id", `${show.date}-${show.venue}`);
  showBuyTicketsButton.innerText = "Buy Tickets";
  showBuyTicketsLi.appendChild(showBuyTicketsButton);

  // append the date, venue, location, buy tickets lis to the ul.
  showsList.appendChild(showDateLi);
  showsList.appendChild(showVenueLi);
  showsList.appendChild(showLocationLi);
  showsList.appendChild(showBuyTicketsLi);
  // console.log(showsListing);
});
