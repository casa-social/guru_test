import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'
import Hero from '../models/Hero';
import HeroType from '../models/HeroType';

const BASE_URL = 'http://localhost:3000';
const CHUNK_SIZE = 8;
type heroState = {
  heroes: {
    data: Hero[];
    totalCount: number;
  };
  hero: Hero;
  heroTypes: HeroType[];
  dataChunk: Hero[],
  startParam:number,
  isLoading: boolean;
  isFailed: boolean;
  isLoadMore: boolean;
};
type heroAddData = {
  avatarUrl: string,
  fullName: string,
  typeId: string,
  description: string
}
export const initialState: heroState = {
  heroes: {
    data: [],
    totalCount: 0,
  },
  hero: {
    id: '',
    avatarUrl: '',
    fullName: '',
    typeId: '',
    description: '',
    type:{
      id:'',
      name:''
    }
  },
  heroTypes: [],
  dataChunk: [],
  startParam:0,
  isLoading: false,
  isFailed: false,
  isLoadMore: true
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setLoading(state: heroState, action:PayloadAction<{isLoading:boolean}>) {
      state.isLoading = action.payload.isLoading;
    },
    setFailed(state: heroState, action:PayloadAction<{isFailed:boolean}>) {
      state.isFailed = action.payload.isFailed;
    },
    fetchHeroes(
      state: heroState,
      action: PayloadAction<{ heroes: { data: Hero[]; totalCount: number } }>,
    ) {
      state.heroes.data = action.payload.heroes.data.map(hero=>{
        hero.avatarUrl = BASE_URL + hero.avatarUrl
        return hero
      });
      state.heroes.totalCount = action.payload.heroes.totalCount;
    },
    loadHeroes(state:heroState) {
      state.startParam = state.dataChunk.length;
      let chunk_data
      if (state.startParam+CHUNK_SIZE <= state.heroes.totalCount) {
        chunk_data = state.heroes.data.slice(state.startParam, state.startParam+CHUNK_SIZE)
        state.isLoadMore = true
      } else {
        chunk_data = state.heroes.data.slice(state.startParam, state.heroes.totalCount)
        state.isLoadMore = false
      }
      state.dataChunk = [...state.dataChunk, ...chunk_data]
    },
    selectHero(state: heroState, action:PayloadAction<{id:string}>) {
      const hero = state.heroes.data.find(hero=>{
        return hero.id === action.payload.id
      })
      state.hero = hero!;
    },
    deleteHero(state: heroState, action:PayloadAction<{id:string}>) {
      state.heroes.data = state.heroes.data.filter(hero => {
        return hero.id !== action.payload.id
      })
    },
    addHero(state: heroState, action:PayloadAction<{hero:Hero}>) {
      state.heroes.data = [...state.heroes.data, action.payload.hero]
    },
    fetchTypes(state:heroState, action:PayloadAction<{heroTypes:HeroType[]}>){
      state.heroTypes = action.payload.heroTypes
    }
  },
});

export const heroActions = heroesSlice.actions;

export const fetchHeroes = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(heroActions.setLoading({isLoading:true}));
      dispatch(heroActions.setFailed({isFailed:false}))
      const API_URL = BASE_URL + '/heroes';
      const response = await fetch(API_URL);
      const responseData = await response.json();
      dispatch(heroActions.fetchHeroes({ heroes: responseData }));
      dispatch(heroActions.loadHeroes())
    } catch (error) {
      dispatch(heroActions.setFailed({isFailed:true}))
    } finally {
      dispatch(heroActions.setLoading({isLoading:false}))
    }
  };
};

export const loadHeroes = () => {
  return (dispatch:Dispatch) => {
    dispatch(heroActions.setLoading({isLoading:true}))
    setTimeout(() => {
      dispatch(heroActions.loadHeroes())
    }, 3000)
    dispatch(heroActions.setLoading({isLoading:false}))
  }
}

export const deleteHero = (id:string) => {
  return async (dispatch:Dispatch) => {
    try {
      dispatch(heroActions.setLoading({isLoading:true}));
      dispatch(heroActions.setFailed({isFailed:false}));
      const API_URL = BASE_URL + `/heroes/${id}`;
      const response = await axios.delete(API_URL)
      dispatch(heroActions.deleteHero({id:id}))
    } catch (error) {
      dispatch(heroActions.setFailed({isFailed:true}))
    } finally {
      dispatch(heroActions.setLoading({isLoading:false}))
    }
  }
}

export const fetchTypes = () => {
  return async (dispatch:Dispatch) => {
    try {
      dispatch(heroActions.setLoading({isLoading:true}));
      dispatch(heroActions.setFailed({isFailed:false}));
      const API_URL = BASE_URL + '/types';
      const response = await fetch(API_URL);
      const responseData = await response.json();
      dispatch(heroActions.fetchTypes({heroTypes:responseData}))
    } catch (error) {
      dispatch(heroActions.setFailed({isFailed:true}))
    } finally {
      dispatch(heroActions.setLoading({isLoading:false}))
    }
  }
}

export const addHero = (data:heroAddData) => {
  return async (dispatch:Dispatch) => {
    try {
      dispatch(heroActions.setLoading({isLoading:true}));
      dispatch(heroActions.setFailed({isFailed:false}))
      const API_URL = BASE_URL + '/heroes'
      const response = await axios.post<Hero>(API_URL, data)
      const responseData = response.data;
      dispatch(heroActions.addHero({hero:responseData}))
    } catch (error) {
      dispatch(heroActions.setFailed({isFailed:true}))
    } finally {
      dispatch(heroActions.setLoading({isLoading:false}))
    }
  }
}
export default heroesSlice;
