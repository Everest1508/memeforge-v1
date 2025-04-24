"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const AnimatedImage = ({ src, alt, width, height, className }: AnimatedImageProps) => {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    let interval: ReturnType<typeof setInterval>;
    
    const startShaking = () => {
      let degrees = 0;
      let direction = 1;
      
      interval = setInterval(() => {
        degrees += 0.5 * direction;
        
        if (degrees > 3) {
          direction = -1;
        } else if (degrees < -3) {
          direction = 1;
        }
        
        if (img) {
          img.style.transform = `rotate(${degrees}deg)`;
        }
      }, 50);
    };
    
    const stopShaking = () => {
      clearInterval(interval);
      if (img) {
        img.style.transform = 'rotate(0deg)';
      }
    };
    
    startShaking();
    
    return () => {
      stopShaking();
    };
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={cn("transition-transform duration-200", className)}
      style={{ transform: 'rotate(0deg)' }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-w-full h-auto object-contain"
      />
    </div>
  );
};

export default AnimatedImage;