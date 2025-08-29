'use client';

import React, { useEffect, useState } from 'react';
import { useI18n } from './I18nProvider';
import Api from '@/core/api/api';

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState('');
  const { locale, updateTranslationInMemory } = useI18n();

  // горячая клавиша Ctrl+Shift+E
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        setActive((a) => !a);
        console.log('toggle editor mode:', !active);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  // обработка клика по элементам
  useEffect(() => {
    if (!active) return;

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-i18n]') as HTMLElement | null;
      if (!el) return;

      e.preventDefault();
      const current = el.getAttribute('data-i18n-value') ?? el.textContent ?? '';
      setTargetEl(el);
      setValue(current);
      console.log('clicked element:', el, 'value:', current);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [active]);

  async function save() {
    console.log(targetEl);
    if (!targetEl) return;
    const attr = targetEl.getAttribute('data-i18n');
    console.log(attr);
    if (!attr) return;

    const [ns, key] = attr.split(':');
    const result = await Api.patch('/translations/update', { locale, namespace: ns, key, value });

    console.log(result);

    updateTranslationInMemory(locale, ns, key, value);
    setTargetEl(null);
  }

  return (
    <>
      {active && (
        <div className={'fixed top-2 right-2 p-4 rounded bg-main-error z-50'}>
          <div>Включен редактор текстов</div>
        </div>
      )}
      {children}

      {active && targetEl && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--main-black)',
            padding: '20px',
            border: '1px solid #ccc',
            zIndex: 9999,
          }}
        >
          <h3>Edit translation</h3>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '300px', height: '100px' }}
          />
          <div>
            <button onClick={save}>Save</button>
            <button onClick={() => setTargetEl(null)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
