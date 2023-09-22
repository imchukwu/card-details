import  { useState, useEffect } from 'react';

const ImageChange = ({ smallImageSrc, largeImageSrc }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const thresholdWidth = 768; // Adjust this threshold as needed

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <div>
      <img className="bgimg"
        src={screenWidth >= thresholdWidth ? largeImageSrc : smallImageSrc}
        alt="Responsive Image"
      />
    </div>
  );
};

export default ImageChange;
