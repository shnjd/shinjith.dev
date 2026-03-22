import { tw } from '@/utils/cn';
import React, { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isClosed: boolean;
};

const MenuButton: React.FC<Props> = ({ isClosed, className, ...props }) => {
  return (
    <button
      aria-label="Menu"
      className={tw(
        `group flex h-6 max-h-6 w-5 max-w-5 flex-col items-end gap-1.25 overflow-hidden transition-all`,
        className
      )}
      {...props}
    >
      <div
        className={`bg-subtle h-0.5 w-full origin-right rounded-full transition-all ${isClosed ? 'rotate-0' : '-rotate-45'}`}
      />
      <div
        className={`bg-subtle h-0.5 w-1/2 rounded-full transition-all duration-300 ${isClosed ? 'translate-x-0' : 'translate-x-full'}`}
      />
      <div
        className={`bg-subtle h-0.5 w-full origin-right rounded-full transition-all ${isClosed ? 'rotate-0' : 'rotate-45'}`}
      />
    </button>
  );
};

export default MenuButton;
