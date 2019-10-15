import Bluebird from '../util/Promise';

export const getRequestActionType = (actionType: string): string => `${actionType}_REQUEST`;
export const getCancelledActionType = (actionType: string): string => `${actionType}_CANCELLED`;
export const getSuccessActionType = (actionType: string): string => `${actionType}_SUCCESS`;
export const getFailureActionType = (actionType: string): string => `${actionType}_FAILURE`;

interface Action {
  type: string;
  payload?: any;
}

export default function requestAction<T>({
  action,
  dispatch,
  request,
}: {
  action: Action;
  dispatch: (a: Action) => void;
  request: () => Bluebird<any>;
}): Bluebird<T> {
  const { payload, type } = action;
  dispatch({
    type: getRequestActionType(type),
    payload,
  });
  return new Bluebird((resolve, reject, onCancel) => {
    const bluebird = request();
    onCancel && onCancel(() => {
      bluebird.cancel();
      dispatch({
        type: getCancelledActionType(type),
        payload,
      });
    });
    bluebird.then(response => {
      dispatch({
        type: getSuccessActionType(type),
        payload: {
          original: payload,
          response,
        },
      });
      resolve(response);
    }, error => {
      dispatch({
        type: getFailureActionType(type),
        payload: {
          error,
          original: payload,
        },
      });
      reject(error);
    });
  });
}
