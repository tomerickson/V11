import {
  Action,
  createAction,
  createReducer,
  MetaReducer,
  on,
  props} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {
  version: string;
  page: string;
}

const initialState: State = {
  version: '',
  page: ''
}

export enum VersionActionTypes {
  Get = '[Version] Get',
  Set = '[Version] Set'
}

export const setVersion = createAction('[Version] Set', props<{version: string}>(),);

export const getVersion = createAction('[Version] Get',);

export const setPage = createAction('[Page] Set', props<{page: string}>(),);

export const getPage = createAction('[Page] Get',);

export const reducer = createReducer(
  initialState
);
/* export function reducer(state: State = initialState,
   action: 
    ReturnType<typeof setVersion> |
    ReturnType<typeof getVersion> |
    ReturnType<typeof setPage> |
    ReturnType<typeof getPage>,): State {

  switch (action.type)
{
    case setVersion.type: {
      return {...state, version: action.version}
    }
      case setPage.type: {
        return {...state,page: action.page};
    }
  default: {
    return state;
    break;
  }

}
}
 */

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
