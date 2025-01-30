import { createContext, useContext } from "react";
const SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
};

export const defaultConfig = {
  themeColor: "black",
  direction: "ltr",
  mode: "light",
  locale: "en",
  primaryColorLevel: 600,
  cardBordered: false,
  controlSize: SIZES.MD,
  navMode: "light",
};

export const ConfigContext = createContext(defaultConfig);

const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
