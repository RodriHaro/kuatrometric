'use client';

import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/images/Scene.json';

interface LottieAnimationProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({ 
  className = '', 
  loop = true, 
  autoplay = true 
}: LottieAnimationProps) {
  const lottieRef = useRef(null);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}
