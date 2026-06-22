import React, { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export default function ScrambleText({ text, className = '', trigger = true, speed = 40, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text.replace(/./g, '█'));
  const intervalRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * 3;

      intervalRef.current = setInterval(() => {
        const revealed = Math.floor(frame / 3);
        const scrambled = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < revealed) return char;
            if (i === revealed) return CHARS[Math.floor(Math.random() * CHARS.length)];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplayText(scrambled);
        frame++;

        if (frame > totalFrames + 6) {
          setDisplayText(text);
          clearInterval(intervalRef.current);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalRef.current);
    };
  }, [trigger, text, speed, delay]);

  return <span className={className}>{displayText}</span>;
}