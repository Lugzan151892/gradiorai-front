'use client';

import UIButton from '@/components/ui/button/UIButton';
import CustomIcon from '@/components/ui/icon/CustomIcon';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef } from 'react';
import MenuItem from '@/components/header/components/MenuItem';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar/UserAvatar';
import { Trans } from '@/i18n/Trans';
import LocaleSelect from '@/components/locale-select/LocaleSelect';
import { useMenuItems } from '@/components/header/hooks/useMenuItems';

interface IHeaderUserStateProps {
  showMenu?: boolean;
  setShowMenu?: (val: boolean) => void;
}

const HeaderUserState: React.FC<Readonly<IHeaderUserStateProps>> = ({ showMenu, setShowMenu }) => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const menuRef = useRef<HTMLDivElement>(null);

  const { menuItems } = useMenuItems({ setShowMenu });

  const handleLogin = () => {
    router.push('/login');
  };

  const username = useMemo(() => {
    if (!user) {
      return null;
    }

    return `${user.username || user.email}${user.admin ? ' (ADMIN)' : ''}`;
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu?.(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  return (
    <>
      <div className={'flex gap-4'}>
        <LocaleSelect />
        {!user?.id ? (
          <div className={'flex'}>
            <UIButton
              onClick={handleLogin}
              text={'ВОЙТИ'}
            >
              <Trans
                ns={'auth'}
                k={'auth_login'}
                format={'uppercase'}
              />
            </UIButton>
          </div>
        ) : (
          <div
            className={'flex items-center'}
            ref={menuRef}
          >
            <div
              className={'flex items-center cursor-pointer select-none'}
              onClick={() => setShowMenu?.(!showMenu)}
            >
              <UserAvatar size={40} />
              <CustomIcon
                name={'menu-arrow'}
                color={'var(--main-white)'}
                className={cn('ml-1 transform transition-transform duration-300', showMenu && 'rotate-180')}
              />
            </div>
            {showMenu && (
              <div
                className={cn(
                  'z-50 p-4 bg-black lg:border lg:border-main-gray lg:rounded-xl flex flex-col overflow-hidden',
                  'lg:w-[350px] w-full max-w-full lg:max-h-[500px] h-screen max-h-[calc(100dvh-90px)] absolute top-[90px] lg:right-[100px] right-0 overflow-y-auto'
                )}
              >
                <MenuItem
                  icon={'user'}
                  text={username || ''}
                  isLink
                  isStatic
                  className={'mb-4'}
                  onClick={() => router.push('/profile/information')}
                />
                <div className={'flex flex-col gap-1 h-full'}>
                  {menuItems
                    .filter((e) => !e.hide)
                    .map((item) => (
                      <MenuItem
                        key={item.id}
                        {...item}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderUserState;
