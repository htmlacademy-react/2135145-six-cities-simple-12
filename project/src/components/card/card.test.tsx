import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { getOfferTypeName } from '../../utils/offer';
import { makeFakeOffer } from '../../utils/testData';
import HistoryRouter from '../history-router/history-router';
import Card from './card';

describe('Component: Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const offer = makeFakeOffer();
    render(
      <HistoryRouter history={history}>
        <Card
          classNamePrefix={'cities'}
          offer={offer}
          onHover={jest.fn()}
          onUnhover={jest.fn()}
          testid={'test'}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(getOfferTypeName(offer.type))).toBeInTheDocument();
  });

  it('should fire onHover and unHover while hovering and unhovering article element', () => {
    const history = createMemoryHistory();
    const offer = makeFakeOffer();
    const onHover = jest.fn();
    const onUnhover = jest.fn();

    render(
      <HistoryRouter history={history}>
        <Card
          classNamePrefix={'cities'}
          offer={offer}
          onHover={onHover}
          onUnhover={onUnhover}
          testid={'test'}
        />
      </HistoryRouter>
    );

    fireEvent.mouseEnter(screen.getByTestId('test'));
    expect(onHover).toBeCalledTimes(1);
    fireEvent.mouseLeave(screen.getByTestId('test'));
    expect(onUnhover).toBeCalledTimes(1);
  });
});
