import dayjs from 'dayjs';
import { Emojis } from '../const.js';
import { getAttributeChecked } from '../utils/utils.js';


const commentTemplate = (commentData) => {
  const {emotion, comment, author, date, id : commentId } = commentData;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${dayjs().to(dayjs(date))}</span>
          <button class="film-details__comment-delete" data-id="${commentId}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const emojiTemplate = (emojiArray, currentEmoji) =>
  emojiArray.map((emoji) => {
    const isEmojiChecked = emoji === currentEmoji;
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${getAttributeChecked(isEmojiChecked)}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}>
      </label>`
    );
  }).join('');

const commentListTemplate = (comments, input) => {
  // console.log(comments);
  const { currentEmoji, currentText } = input;

  const commentsList = comments.map((commentData) => commentTemplate(commentData)).join('');
  const emojiList = emojiTemplate(Emojis, currentEmoji);

  return (
    `<ul class="film-details__comments-list">
      ${commentsList}
    </ul>
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
      ${currentEmoji !== '' ? `<img src="images/emoji/${currentEmoji}.png" width="55" height="55" alt="emoji-${currentEmoji}">` : ''}
      </div>
      <label class="film-details__comment-label">
        <textarea
          class="film-details__comment-input"
          placeholder="Select reaction below and write comment here"
          name="comment"
        >${currentText}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>`
  );
};

export default commentListTemplate;
