import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBlock, defaultValue } from 'app/shared/model/block.model';

export const ACTION_TYPES = {
  FETCH_BLOCK_LIST: 'block/FETCH_BLOCK_LIST',
  FETCH_BLOCK: 'block/FETCH_BLOCK',
  CREATE_BLOCK: 'block/CREATE_BLOCK',
  UPDATE_BLOCK: 'block/UPDATE_BLOCK',
  DELETE_BLOCK: 'block/DELETE_BLOCK',
  RESET: 'block/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBlock>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BlockState = Readonly<typeof initialState>;

// Reducer

export default (state: BlockState = initialState, action): BlockState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BLOCK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BLOCK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BLOCK):
    case REQUEST(ACTION_TYPES.UPDATE_BLOCK):
    case REQUEST(ACTION_TYPES.DELETE_BLOCK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BLOCK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BLOCK):
    case FAILURE(ACTION_TYPES.CREATE_BLOCK):
    case FAILURE(ACTION_TYPES.UPDATE_BLOCK):
    case FAILURE(ACTION_TYPES.DELETE_BLOCK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOCK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOCK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BLOCK):
    case SUCCESS(ACTION_TYPES.UPDATE_BLOCK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BLOCK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/blocks';

// Actions

export const getEntities: ICrudGetAllAction<IBlock> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BLOCK_LIST,
  payload: axios.get<IBlock>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBlock> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BLOCK,
    payload: axios.get<IBlock>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBlock> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BLOCK,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBlock> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BLOCK,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBlock> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BLOCK,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
