import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 3,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary opacity-20"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
          fill="currentColor"
          size={24}
        />
      ))}
    </div>
  );
};
