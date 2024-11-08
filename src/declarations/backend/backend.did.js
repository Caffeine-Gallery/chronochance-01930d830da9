export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'endTimer' : IDL.Func([], [IDL.Bool], []),
    'getRandomQuote' : IDL.Func([], [IDL.Text], []),
    'getSessionCount' : IDL.Func([], [IDL.Nat], ['query']),
    'getTimerStatus' : IDL.Func([], [IDL.Opt(IDL.Int)], ['query']),
    'startTimer' : IDL.Func([], [IDL.Int], []),
  });
};
export const init = ({ IDL }) => { return []; };
