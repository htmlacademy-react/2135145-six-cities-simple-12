import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import PlacesList from '../../components/places-list/places-list';
import PropertyCard from '../../components/property-card/property-card';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import ReviewList from '../../components/review-list/review-list';
import SendCommentForm from '../../components/send-comment-form/send-comment-form';
import { AuthStatus } from '../../const/auth-status';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchOfferData, } from '../../store/api-actions';
import { getComments, getCurrentOffer, getOffersNearBy } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';

function PropertyPage() : JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const currentOffer = useAppSelector(getCurrentOffer);
  const offersNearBy = useAppSelector(getOffersNearBy);
  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const getOfferData = useCallback((offId?: string) => {
    if(!offId){
      return;
    }
    const offerId = Number(offId);
    return dispatch(fetchOfferData(offerId));
  }, [dispatch]);

  useEffect(() => {
    getOfferData(id);
  }, [id, getOfferData]);

  const onCardHover = useCallback((offer: Offer) => {
    setActiveCard(offer);
  }, []);

  const onCardUnhover = useCallback(() => {
    setActiveCard(null);
  }, []);

  return(
    <div className="page">
      <Header/>
      <main className="page__main page__main--property">
        {currentOffer && (
          <section className="property">
            <PropertyGallery images={currentOffer.images}/>
            <div className="property__container container">
              <div className="property__wrapper">
                <PropertyCard currentOffer={currentOffer}/>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <ReviewList reviews={comments}/>
                  {authorizationStatus === AuthStatus.Auth && (
                    <SendCommentForm/>
                  )}
                </section>
              </div>
            </div>
            <Map city={currentOffer.city} points={offersNearBy} className="property__map" selectedPoint={activeCard}/>
          </section>
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={offersNearBy} type="near" onCardHover={onCardHover} onCardUnhover={onCardUnhover}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyPage;
