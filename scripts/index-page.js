// -----------------------------------------------------------------------------------------------------------------------

/**
 * API DETAILS
 */

const API_KEY = "?api_key=bd6be8d0-bde7-4b66-848d-bccaa5394a3a";
const API_COMMENTS = "https://project-1-api.herokuapp.com/comments/";
const API_LIKES = "https://project-1-api.herokuapp.com/comments/";

/**
 * The DOM element that will function as the parent element for the comment list.
 */
const commentList = document.querySelector(".conversation__comments");

/**
 * function that accepts a comment id and adds a like, dislike, and delete button
 */
const commentInteractive = (id, likes) => {
  const interactiveWrapper = document.createElement("div");
  interactiveWrapper.classList.add("conversation__interactive");

  const likesCounter = document.createElement("p");
  likesCounter.classList.add(
    "bs-button",
    "bs-button--small",
    "bs-button--counter"
  );
  likesCounter.setAttribute("name", `${id}`);
  likesCounter.setAttribute("value", `${likes}`);
  likesCounter.innerText = `Likes: `;

  const likesNum = document.createElement("span");
  likesNum.classList.add("total__likes");
  likesNum.setAttribute("id", `likes-${id}`);
  likesNum.innerText = `${likes}`;
  likesCounter.appendChild(likesNum);

  const likeButton = document.createElement("button");
  likeButton.classList.add("bs-button", "bs-button--small", "bs-button--like");
  likeButton.setAttribute("name", `${id}`);
  likeButton.innerText = "👍";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "bs-button",
    "bs-button--small",
    "bs-button--delete"
  );
  deleteButton.setAttribute("name", `${id}`);
  deleteButton.innerText = "❌";

  interactiveWrapper.appendChild(likesCounter);
  interactiveWrapper.appendChild(likeButton);
  interactiveWrapper.appendChild(deleteButton);

  return interactiveWrapper;
};

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
    "conversation__label--avatar",
    "conversation__label--avatar-posted"
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

  const interactives = commentInteractive(commentData.id, commentData.likes);

  commentDetails.appendChild(commenterName);
  commentDetails.appendChild(commenterDate);
  commentTextBox.appendChild(commentTextP);

  commentsRight.appendChild(commentDetails);
  commentsRight.appendChild(commentTextBox);
  commentsRight.appendChild(interactives);

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
  console.info("removing comments from the DOM"); // leaving this in for informational purposes.
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
};

/**
 * function to load comments from remote server.
 */
const loadRemote = () => {
  console.info("loading comments from the server"); // leaving this in for informational purposes.
  axios
    .get(`${API_COMMENTS}${API_KEY}`)
    .then((response) => {
      let commentData = response.data;
      commentData.sort((a, b) => {
        return a.timestamp - b.timestamp;
      });
      loadComments(response.data);
      const hitLikeButton = document.querySelectorAll(".bs-button--like");
      const hitDelete = document.querySelectorAll(".bs-button--delete");

      // listen to the like button, and increment likes if clicked.
      hitLikeButton.forEach((button) => {
        button.addEventListener("click", (e) => {
          axios
            .put(`${API_LIKES}${e.target.name}/like${API_KEY}`)
            .then((response) => {
              const totalLikes = document.getElementById(
                `likes-${response.data.id}`
              );
              totalLikes.innerText = `${response.data.likes}`;
            });
        });
      });

      // listen to the delete button, and delete comment if clicked.
      hitDelete.forEach((button) => {
        button.addEventListener("click", (e) => {
          axios.delete(`${API_COMMENTS}${e.target.name}${API_KEY}`).then(() => {
            unloadComments(commentList), loadRemote();
          });
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * Function to post a comment to the remote server.
 * @param {Object} comment
 */
const postRemote = (comment) => {
  axios
    .post(`${API_COMMENTS}${API_KEY}`, comment)
    .then((response) => {
      console.info(response); // leaving this in for informational purposes.
      return response;
    })
    .then(() => {
      unloadComments(commentList);
      loadRemote();
      commentForm.reset();
    })
    .catch((error) => {
      console.error(error);
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
