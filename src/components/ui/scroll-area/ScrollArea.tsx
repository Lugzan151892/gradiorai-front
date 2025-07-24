'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

interface ScrollAreaProps extends React.ComponentProps<typeof ScrollAreaPrimitive.Root> {
  viewportRef?: React.Ref<HTMLDivElement>;
  scrollbarTopOffset?: number | string;
}

function ScrollArea({ className, children, viewportRef, scrollbarTopOffset = 0, ...props }: ScrollAreaProps) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot={'scroll-area'}
      className={cn('relative h-full', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot={'scroll-area-viewport'}
        className={
          'focus-visible:ring-ring/50 h-full flex size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1'
        }
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar topOffset={scrollbarTopOffset} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  topOffset = 0,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  topOffset?: number | string;
}) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot={'scroll-area-scrollbar'}
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' && 'w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        className
      )}
      style={{ top: typeof topOffset === 'number' ? `${topOffset}px` : topOffset }}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot={'scroll-area-thumb'}
        className={'bg-border relative flex-1 rounded-full'}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
