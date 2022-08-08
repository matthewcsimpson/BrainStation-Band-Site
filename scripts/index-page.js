const comments = [
  {
    name: "Connor Walton",
    date: Date.parse("02/17/2021"),
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    avatar: null,
  },
  {
    name: "Emilie Beach",
    date: Date.parse("01/09/2021"),
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    avatar: null,
  },
  {
    name: "Miles Acosta",
    date: Date.parse("12/20/2020"),
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    avatar: null,
  },
];

/**
 * Sort all available comments by the date they were made
 * sort oldest to newest.
 */
comments.sort((a, b) => {
  return a.date - b.date;
});

/**
 * The DOM element that will function as the parent element for the comment list.
 */
const commentList = document.querySelector(".conversation__comments");

/**
 * functon that accepts a comment object and
 * builds a DOM element using the data contained therein.
 * @param {object} commentData
 */
const displayComment = (commentData) => {
  // create the box
  const commentBox = document.createElement("div");
  commentBox.classList.add("conversation__box");

  // create the left side
  const commentsLeft = document.createElement("div");
  commentsLeft.classList.add("conversation__box--left");
  // create the avatar div
  const commentsAvatarLabel = document.createElement("p");
  commentsAvatarLabel.classList.add(
    "conversation__label",
    "conversation__label--avatar"
  );
  commentsAvatarLabel.innerText = "Avatar";

  const commentsAvatar = document.createElement("div");
  commentsAvatar.classList.add("conversation__avatar");

  //create the right side
  const commentsRight = document.createElement("div");
  commentsRight.classList.add("conversation__box--right");

  // comment details
  const commentDetails = document.createElement("div");
  commentDetails.classList.add("conversation__details");

  const commenterName = document.createElement("div");
  commenterName.classList.add("conversation__name");
  const commenterNameP = document.createElement("div");
  commenterNameP.classList.add(
    "conversation__label",
    "conversation__label--name"
  );
  commenterNameP.innerHTML = commentData.name;
  commenterName.appendChild(commenterNameP);

  const commenterDate = document.createElement("div");
  commenterDate.classList.add("conversation__date");
  const commenterDateP = document.createElement("p");
  commenterDateP.classList.add(
    "conversation__label",
    "conversation__label--date"
  );

  const commentDateDate = new Date(commentData.date);

  commenterDateP.innerText = commentDateDate.toLocaleDateString("en-US");
  commenterDate.appendChild(commenterDateP);

  // comment text
  const commentTextBox = document.createElement("div");
  commentTextBox.classList.add("conversation__textbox");
  const commentTextP = document.createElement("p");
  commentTextP.classList.add("conversation__text");
  commentTextP.innerText = commentData.comment;

  commentDetails.appendChild(commenterName);
  commentDetails.appendChild(commenterDate);
  commentTextBox.appendChild(commentTextP);

  commentsRight.appendChild(commentDetails);
  commentsRight.appendChild(commentTextBox);

  // put it all together
  commentsLeft.appendChild(commentsAvatarLabel);
  commentsLeft.appendChild(commentsAvatar);
  commentBox.appendChild(commentsLeft);
  commentBox.appendChild(commentsRight);
  console.log(commentBox);
  commentList.appendChild(commentBox);
};

/**
 * Function which accepts an array of comments,
 * and then calls display comment on each one to display them.
 * @param {array} commentsArray
 */
const loadComments = (commentsArray) => {
  console.log("LOADING");
  commentsArray.forEach((comment) => {
    displayComment(comment);
  });
};

/**
 * Function to clear all child elements from a specified DOM object.
 * @param {DOM Element} element
 */
const unloadComments = (element) => {
  console.log("UNLOADING");
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
};

/**
 * call the function to load the comments on initial page load
 */
loadComments(comments);

/**
 * event listener to grab form data, convert to a comments object,
 * push that object into the comments array, and then load the comments.
 */
const commentForm = document.querySelector(".conversation__form");
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const incomingComment = {
    name: e.target.name.value,
    comment: e.target.comment.value,
    date: Date.now(),
    avatar: null,
  };
  comments.push(incomingComment);
  unloadComments(commentList);
  loadComments(comments);
  commentForm.reset();
});
