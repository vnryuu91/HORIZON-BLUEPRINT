import { useState } from 'react';
import { Orbit } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover',
  containerClassName = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#0F1624] border border-slate-800/80 p-6 text-center overflow-hidden ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 25%, rgba(0, 240, 255, 0.25), transparent 55%), radial-gradient(circle at 75% 80%, rgba(112, 0, 255, 0.25), transparent 55%)',
          }}
        />
        <Orbit className="w-8 h-8 text-[#00F0FF]/70 mb-3 relative z-10" aria-hidden="true" />
        <p className="text-xs font-mono text-slate-400 max-w-xs relative z-10">
          {title || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
