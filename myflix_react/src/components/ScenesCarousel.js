import styles from '../css/Carousel.css';
import { useState, useEffect, useRef } from 'react';

function ScenesCarousel(props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);

  useEffect(() => {
    if (isAnimating) {
        const animate = () => {
            setTimeout(() => {
              animationRef1.current.style.animationPlayState = 'running';
              animationRef2.current.style.animationPlayState = 'running';
              requestAnimationFrame(animate);
            }, 10); // Adjust delay as needed
          };
          
      animate();
    }

    return () => {
      animationRef1.current.style.animationPlayState = 'paused';
      animationRef2.current.style.animationPlayState = 'paused';
    };
  }, [isAnimating]);

  useEffect(() => {
    setIsAnimating(true); // Start animation on mount
  }, []);

  return (
    <div className="logos" style={styles}>
      <div className="logos-slide" ref={animationRef1} style={styles}>
        {props.images.map((image) => (
          <img key={image.alt + "1"} src={image.src} alt={image.alt} />
        ))}
      </div>
      <div className="logos-slide" ref={animationRef2} style={styles}>
        {props.images.map((image) => (
          <img key={image.alt + "2"} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
}

export default ScenesCarousel;