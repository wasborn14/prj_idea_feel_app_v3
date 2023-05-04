import { useWindowSize } from "../useWindowSize";

export const useIsSp = (): boolean => {
  const [width] = useWindowSize();
  return width < 1025 ? true : false;
};
