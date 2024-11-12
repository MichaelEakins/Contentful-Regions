import Reactotron from "reactotron-react-js";

export const debug = (...args: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    Reactotron.log(`[DEBUG] ${JSON.stringify(args)}`)
  }
};
