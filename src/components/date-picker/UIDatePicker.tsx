'use client';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/radix-ui/button/button';
import { Calendar } from '@/components/radix-ui/calendar/calendar';
import Label from '@/components/ui/label/UILabel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/radix-ui/popover/popover';
import React, { useState } from 'react';

interface IUIDatepickerProps {
  label?: string;
  value: Date | undefined;
  onSetValue: (date: Date | undefined) => void;
}

const UIDatePicker: React.FC<IUIDatepickerProps> = ({ value, onSetValue, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={'flex flex-col gap-3'}>
      {label && (
        <Label
          htmlFor={'date'}
          className={'px-1'}
        >
          {label}
        </Label>
      )}
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            id={'date'}
            className={'w-48 justify-between font-normal'}
          >
            {value ? value.toLocaleDateString() : 'Укажите дату'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={'w-auto overflow-hidden p-0'}
          align={'start'}
        >
          <Calendar
            mode={'single'}
            selected={value}
            captionLayout={'dropdown'}
            onSelect={(date) => {
              onSetValue(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UIDatePicker;
