'use client';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Simple wrapper - no smooth scroll for now
  return (
    <>{children}</>
  );
}
