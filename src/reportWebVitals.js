const reportWebVitals = onPerfentrance => {
  if (onPerfentrance && onPerfentrance instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfentrance);
      getFID(onPerfentrance);
      getFCP(onPerfentrance);
      getLCP(onPerfentrance);
      getTTFB(onPerfentrance);
    });
  }
};

export default reportWebVitals;
