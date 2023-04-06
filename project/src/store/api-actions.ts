import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const/routes';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { loadOffers, setDataLoading } from './action';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoading(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setDataLoading(false));
    dispatch(loadOffers(data));
  },
);
