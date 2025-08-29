'use client';

import React, { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import Api from '@/core/api/api';
import UISelect from '@/components/ui/select/UISelect';
import { TLocale } from '@/i18n/interfaces/locale';

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState('');
  const [selectedLocale, setSelectedLocale] = useState<TLocale>('ru');
  const [nsKey, setNsKey] = useState<{ ns: string; key: string } | null>(null);
  const { locale, updateTranslationInMemory } = useI18n();

  /** горячая клавиша Ctrl+Shift+E */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        setActive((a) => !a);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, locale]);

  useEffect(() => {
    if (!active) return;

    const onClick = async (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-i18n]') as HTMLElement | null;
      if (!el) return;

      e.preventDefault();
      e.stopPropagation();
      const maybeStopImmediate = (e as any).stopImmediatePropagation as (() => void) | undefined;
      if (typeof maybeStopImmediate === 'function') maybeStopImmediate.call(e);
      const current = el.getAttribute('data-i18n-value') ?? el.textContent ?? '';
      setTargetEl(el);
      const attr = el.getAttribute('data-i18n');
      if (!attr) return;
      const [ns, key] = attr.split(':');
      setNsKey({ ns, key });
      setSelectedLocale(locale as TLocale);

      try {
        const resp = await Api.get<undefined, { value: string }>(`/translations/${locale}/${ns}/${key}`);
        setValue(resp.payload?.value ?? current);
      } catch {
        setValue(current);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [active]);

  async function save() {
    if (!targetEl) return;
    const attr = targetEl.getAttribute('data-i18n');
    if (!attr) return;

    const [ns, key] = attr.split(':');
    await Api.patch('/translations/update', { locale: selectedLocale, namespace: ns, key, value });

    updateTranslationInMemory(selectedLocale, ns, key, value);
  }

  async function handleLocaleChange(nextLocale: string | number) {
    if (!nsKey) return;
    const l = String(nextLocale) as TLocale;
    setSelectedLocale(l);
    try {
      const resp = await Api.get<undefined, { value: string }>(`/translations/${l}/${nsKey.ns}/${nsKey.key}`);
      setValue(resp.payload?.value ?? '');
    } catch {
      // keep current value if fetch fails
    }
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
            zIndex: 10,
          }}
        >
          <h3>Edit translation</h3>
          <div style={{ marginBottom: '10px' }}>
            <UISelect
              options={[
                { id: 'ru', text: 'ru' },
                { id: 'en', text: 'en' },
              ]}
              value={selectedLocale}
              onChange={handleLocaleChange}
              className={''}
              placeholder={'locale'}
            />
          </div>
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
