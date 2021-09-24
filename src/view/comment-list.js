import dayjs from 'dayjs';
import { Emojis } from '../const.js';
import { getAttributeChecked } from '../utils/utils.js';


const commentTemplate = (commentData, isDeleted, currentCommentId) => {
  const { emotion, comment, author, date, id: commentId } = commentData;

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
          <button class="film-details__comment-delete" ${isDeleted && currentCommentId === commentId ? 'disabled' : ''} data-id="${commentId}">${isDeleted && currentCommentId === commentId ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  );
};

const emojiTemplate = (emojiArray, currentEmoji, isDisabled) =>
  emojiArray.map((emoji) => {
    const isEmojiChecked = emoji === currentEmoji;
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${getAttributeChecked(isEmojiChecked)} ${isDisabled ? ' disabled' : ''}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}>
      </label>`
    );
  }).join('');

const commentListTemplate = (comments, input) => {

  const { currentEmoji, currentText, isDeleted, isDisabled, commentId: currentCommentId } = input;

  const commentsList = comments.map((commentData) => commentTemplate(commentData, isDeleted, currentCommentId)).join('');
  const emojiList = emojiTemplate(Emojis, currentEmoji, isDisabled);

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
          ${isDisabled ? ' disabled' : ''}
        >${currentText}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>`
  );
};

export default commentListTemplate;
