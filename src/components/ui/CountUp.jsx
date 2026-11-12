import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function CountUp({ to, suffix = "", duration = 1 }) {
  const ref = useRef(null);
  const controlsRef = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    controlsRef.current?.stop();

    controlsRef.current = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setValue(Math.round(latest));
      },
    });

    return () => {
      controlsRef.current?.stop();
    };
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("fa-IR", {
        useGrouping: false,
      })}
      {suffix}
    </span>
  );
}
