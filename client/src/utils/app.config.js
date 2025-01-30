import {
  DASHBOARD_PREFIX_PATH,
  LOGIN_PREFIX_PATH,
} from "../constants/route.constant";

const appConfig = {
  authenticatedEntryPath: DASHBOARD_PREFIX_PATH,
  unAuthenticatedEntryPath: LOGIN_PREFIX_PATH,
};

export default appConfig;
