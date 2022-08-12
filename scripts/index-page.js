// -----------------------------------------------------------------------------------------------------------------------

/**
 * API DETAILS
 */

const API_URL =
  "https://project-1-api.herokuapp.com/comments?api_key=bd6be8d0-bde7-4b66-848d-bccaa5394a3a";

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
  commenterNameP.innerText = commentData.name;
  commenterName.appendChild(commenterNameP);

  const commenterDate = document.createElement("div");
  commenterDate.classList.add("conversation__date");
  const commenterDateP = document.createElement("p");
  commenterDateP.classList.add(
    "conversation__label",
    "conversation__label--date"
  );

  const commentDateDate = new Date(commentData.timestamp);
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
  commenterDateP.innerText = commentDateDate.toLocaleDateString(
    "en-US",
    dateOptions
  );
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
  commentList.appendChild(commentBox);
};

/**
 * Function which accepts an array of comments,
 * and then calls display comment on each one to display them.
 * @param {array} commentsArray
 */
const loadComments = (commentsArray) => {
  commentsArray.forEach((comment) => {
    displayComment(comment);
  });
};

/**
 * Function to clear all child elements from a specified DOM object.
 * @param {DOM Element} element
 */
const unloadComments = (element) => {
  console.info("removing comments from the DOM");
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
};

/**
 * function to load comments from remote server.
 */
const loadRemote = () => {
  console.info("loading comments from the server");
  axios
    .get(`${API_URL}`)
    .then((response) => {
      let commentData = response.data;
      commentData.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
      loadComments(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Function to post a comment to the remote server.
 * @param {Object} comment
 */
const postRemote = (comment) => {
  axios
    .post(`${API_URL}`, comment)
    .then((response) => {
      console.info(response);
      return response; // leaving this in for now.
    })
    .then(() => {
      unloadComments(commentList);
      loadRemote();
      commentForm.reset();
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * event listener to grab form data, convert to a comments object,
 * push that object into the comments array, and then load the comments.
 */
const commentForm = document.querySelector(".conversation__form");
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const incomingComment = {
    name: `${e.target.name.value}`,
    comment: `${e.target.comment.value}`,
  };
  postRemote(incomingComment);
});

/**
 * Call the function to load the remote comments when the page loads.
 */
loadRemote();
