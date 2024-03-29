import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { sendNewComment } from '../../store/api-actions';
import { getIsCommentSending } from '../../store/app-data/selectors';


function SendCommentForm() : JSX.Element {
  const dispatch = useAppDispatch();
  const hotelId = useParams();

  const initialFormState = {rating: null, review: ''};
  const isCommentSending = useAppSelector(getIsCommentSending);

  const [reviewData, setReviewData] = useState<{
    rating: string | null;
    review: string;
  }>(initialFormState);

  const handleChangeData = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReviewData({...reviewData, [evt.target.name]: evt.target.value});
  };

  const isFormValid = (): boolean => {
    if(!reviewData.rating || reviewData.review?.length < 50 || reviewData.review?.length > 300) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendNewComment({
      rating: Number(reviewData.rating),
      comment: reviewData.review,
      hotelId: Number(hotelId.id),
    }));
    setReviewData(initialFormState);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" style={isCommentSending ? {pointerEvents: 'none'} : {}}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleChangeData}
          checked={reviewData.rating === '5'}
          disabled={isCommentSending}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleChangeData}
          checked={reviewData.rating === '4'}
          disabled={isCommentSending}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleChangeData}
          checked={reviewData.rating === '3'}
          disabled={isCommentSending}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleChangeData}
          checked={reviewData.rating === '2'}
          disabled={isCommentSending}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={handleChangeData}
          checked={reviewData.rating === '1'}
          disabled={isCommentSending}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.review}
        onChange={handleChangeData}
        disabled={isCommentSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid() || isCommentSending}>Submit</button>
      </div>
    </form>
  );
}

export default SendCommentForm;
