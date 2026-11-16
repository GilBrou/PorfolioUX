/***** ANIMATED BACKGROUND COMPONENT *****/

import { useMemo } from "react";

export default function AnimatedBackground() {
  const icons = [
    // UX / UI Design
    "fa-palette",
    "fa-layer-group",
    "fa-eye",
    "fa-code",
    "fa-code-branch",
    "fa-graduation-cap",
    "fa-pen",
    "fa-lightbulb",
    "fa-book-open",
  ];

  const styles = useMemo(() => {
    return icons.map(() => {
      const randLeft = Math.floor(Math.random() * 90) + 1;
      const randFontSize = Math.floor(Math.random() * 1.5) + 1.5;
      const randRotation = Math.floor(Math.random() * 360) + 1;
      const randDelay = Math.floor(Math.random() * 5) + 1;
      /*const randDuration = Math.floor(Math.random() * 10) + 5;*/
      /*const randDuration = Math.floor(Math.random() * 20) + 20;*/
      const randDuration = Math.floor(Math.random() * 30) + 30;

      return {
        position: "absolute",
        left: `${randLeft}vw`,
        fontSize: `${randFontSize}vw`,
        transform: `rotate(${randRotation}deg)`,
        animationDelay: `${randDelay}s`,
        animationDuration: `${randDuration}s`,
      };
    });
  }, []);

  return (
    <div className="presContainer" aria-hidden="true">
      {icons.map((icon, i) => (
        <i
          key={i}
          className={`fa ${icon}`}
          style={styles[i]}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
