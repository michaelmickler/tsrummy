declare interface IAppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}