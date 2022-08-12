Matthew Simpson - Band Site Project - Brain Station
Summer 2022

Sprint 2 - Functional Requirements

- ✅ The Bio Page must retrieve comment data from the provided API and display it on the page.
- ✅ Users must be able to add new comments that are stored on the back-end using the API.
- ✅ New comments that are added must be displayed with the existing comments, the newest comments being at the top.
- ✅ The Bio Page must not reload when comments are added.
- ✅ New comments are not required to have a provided avatar image, but can use a placeholder.
- ✅ The Shows Page must display the shows data retrieved from the API.

Sprint 2 - Feedback

- Keep in mind that all your styling will eventually be processed and lies within the bio.css. When using relative path you need to consider where it is relative to. For your typography, try to link it with “../” instead of “../../”, because you want to link it with relative path from bio.css. However, the live server still does that for you. But for someone who will open your project without live server they won't see the font.
- ✅ Reminder to remove all your console.log statements before submission.
- Ensure to remove commented out code, or code that is not being used anywhere before submission.
- Consider spacing out your comment form’s inputs and labels to match the mockup.
- You can try to give the comment form textarea a property `resize: none;` to make it not resizable to match the mockup.
- Try to make user avatars in the comment section align with the top of the comment user’s name to match the mockup.
- Try to give your name input and comment textarea in the comment form a background color that matches the mockup.
- Consider making comment names capitalized instead of all uppercased to match the mockup.
- For your sass variable names, try to avoid naming with color names. (eg. bandsite-darkblack) Consider naming them as something like primary-dark, primary-light.
- Good initiative for trying the diving deeper! You can try to only show invalid state when submitting.
- To give your form inputs a black border on focus as on the style guide. Try to style them with `:focus` pseudo class in your scss and style them with `outline` property.
- For your shows page, try to align the title with the shows list on tablet size to match the mockup. On desktop size, try to align column headings with the shows heading.
- Try to make the buy tickets button all uppercased on your shows page to match the mockup.
- Remember to use innerText rather than innerHTML unless you are specifically changing the HTML structure. But even then, it would be better to use other DOM methods. innerHTML might create potential security risks.
- On the shows page, try to make the dates the same date format as the mockup. You can search about the method `.toDateString()` for next sprint.

Sprint 1 - Feedback

- ✅ When adding the file path for your @font-face rule src url, this should be the relative path from the css file linked in your HTML. VSCode is smart enough to ignore the extra step back in the directory, but might cause an issue loading fonts when you host your own websites in the future.
- ✅ _(This was actually a choice to use kebab case for some of the secondary names.)_ When nesting in Sass, for class names like `header__nav-list` , you can nest it inside `&__nav` as `&-list`
- ✅ Consider space out elements in the footer on mobile size to match the mockup.
- ✅ Try to make the footer logo smaller on tablet size and desktop size to match the mockup.
- ✅ Consider having a separate typefaces partial for your typefaces for best practice.
- ✅ Consider linking the logo/wordmark to return a user to the Biography page as listed in the project requirement.
- ✅ Ensure to remove commented out code, or code that is not being used anywhere before submission.
