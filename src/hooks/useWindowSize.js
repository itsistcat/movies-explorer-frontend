import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowDimensions, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const { innerWidth: width } = window;
    return width;
  }

  // Эффект для отслеживания изменений размера окна
  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleResize);

    // Очистка слушателя события при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
