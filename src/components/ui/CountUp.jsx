import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function CountUp({ to, suffix = "", duration = 1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    const from = valueRef.current;
    const target = isInView ? to : 0;
    const dur = isInView ? duration : 0.3;

    const controls = animate(from, target, {
      duration: dur,
      ease: "easeOut",
      onUpdate: (v) => {
        valueRef.current = v;
        setValue(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("fa-IR", { useGrouping: false })}
      {suffix}
    </span>
  );
}
