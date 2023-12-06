import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowDimensions, setWindowSize] = useState(
    getWindowSize()
  );

  function getWindowSize() {
    const { innerWidth: width } = window;
    return width;
  }
  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}
