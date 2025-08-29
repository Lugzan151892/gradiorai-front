'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import Api from '@/core/api/api';
import UISelect from '@/components/ui/select/UISelect';
import { TLocale } from '@/i18n/interfaces/locale';
import UITextarea from '@/components/ui/textarea/UITextarea';
import UILabel from '@/components/ui/label/UILabel';
import UIButton from '@/components/ui/button/UIButton';

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState('');
  const { locale, updateTranslationInMemory } = useI18n();
  const [selectedLocale, setSelectedLocale] = useState<TLocale>(locale);
  const [nsKey, setNsKey] = useState<{ ns: string; key: string } | null>(null);
  const [modalPos, setModalPos] = useState<{ top: number; left: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasBeenPositioned = useRef(false);

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

  const loadValue = useCallback(
    async (ns: string, key: string) => {
      try {
        const resp = await Api.get<undefined, { value: string }>(`/translations/${selectedLocale}/${ns}/${key}`);
        setValue(resp.payload?.value);
      } catch {}
    },
    [selectedLocale]
  );

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

      // Устанавливаем позицию каждый раз при открытии модального окна
      if (!hasBeenPositioned.current) {
        const newPos = {
          top: Math.round(window.innerHeight * 0.2),
          left: Math.round(window.innerWidth / 2 - 170),
        };
        setModalPos(newPos);
        hasBeenPositioned.current = true;

        // Устанавливаем локаль только при первом открытии модального окна
        setSelectedLocale(locale as TLocale);
      }

      // Определяем какую локаль использовать для API запроса
      // const localeToUse = hasBeenPositioned.current ? selectedLocale : (locale as TLocale);

      // Используем текущую выбранную локаль для API запроса
      try {
        loadValue(ns, key);
      } catch {
        setValue(current);
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, loadValue]);

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

  // drag handlers
  function onDragStart(e: React.MouseEvent<HTMLDivElement | HTMLHeadingElement>) {
    if (!modalPos) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - modalPos.left, y: e.clientY - modalPos.top });
    // prevent text selection while dragging
    e.preventDefault();
    e.stopPropagation();
  }

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      setModalPos((pos) => {
        if (!pos) return pos;
        const nextLeft = e.clientX - dragOffset.x;
        const nextTop = e.clientY - dragOffset.y;
        return { top: Math.max(0, nextTop), left: Math.max(0, nextLeft) };
      });
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, dragOffset.x, dragOffset.y]);

  return (
    <>
      {active && (
        <div className={'fixed top-2 right-2 p-4 rounded bg-main-error z-50'}>
          <div>Включен редактор текстов</div>
        </div>
      )}
      {children}

      {active && targetEl && (
        <>
          <div
            className={'rounded-xl bg-main-black p-5 border-1 border-white z-10 fixed'}
            style={{
              top: (modalPos?.top ?? Math.round(window.innerHeight * 0.2)) + 'px',
              left: (modalPos?.left ?? Math.round(window.innerWidth / 2 - 170)) + 'px',
            }}
          >
            <h3
              style={{ cursor: 'grab', userSelect: 'none', margin: 0, marginBottom: '10px' }}
              onMouseDown={onDragStart}
              className={'text-center text-2xl'}
            >
              Изменить текст
            </h3>
            <div className={'mb-3 flex items-center'}>
              <div>Язык: </div>
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
            <UILabel
              className={'mb-2'}
              htmlFor={'value'}
            >
              Текущее значение
            </UILabel>
            <UITextarea
              id={'value'}
              className={'min-w-[350px]'}
              rows={3}
              value={value}
              onInput={(e) => setValue(e)}
            />
            <div className={'flex justify-between'}>
              <UIButton
                text={'Отмена'}
                onClick={() => {
                  setTargetEl(null);
                  setModalPos(null);
                  hasBeenPositioned.current = false;
                }}
              />
              <UIButton
                text={'Сохранить'}
                onClick={save}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
