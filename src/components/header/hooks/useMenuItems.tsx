import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { EMENU_ITEM } from "@/components/header/interfaces";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import Api from "@/core/api/api";
import { logout } from '@/store/user/userSlice';
import { Trans } from "@/i18n/Trans";
import React from "react";
import { IMenuItemProps } from "@/components/header/components/MenuItem";

interface IMenuItemsProps {
  setShowMenu?: (val: boolean) => void;
}

interface IMenuItem extends IMenuItemProps {
  id: EMENU_ITEM;
  hide?: boolean;
}

export const useMenuItems = ({ setShowMenu }: IMenuItemsProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await Api.get('/auth/logout');

    if (result.success) {
      localStorage.removeItem('token');
    }

    dispatch(logout());
    router.push('/');
  };

  const handleMenuClick = (id: EMENU_ITEM) => {
    switch (id) {
      case EMENU_ITEM.PROFILE: {
        setShowMenu?.(false);
        router.push('/profile/information');
        break;
      }
      case EMENU_ITEM.SYSTEM: {
        setShowMenu?.(false);
        router.push('/system');
        break;
      }
      case EMENU_ITEM.TESTS: {
        setShowMenu?.(false);
        router.push('/tests');
        break;
      }
      case EMENU_ITEM.INTERVIEW: {
        setShowMenu?.(false);
        router.push('/interview');
        break;
      }
      case EMENU_ITEM.RESUME_CHECK: {
        setShowMenu?.(false);
        router.push('/interview/resume-check');
        break;
      }
      case EMENU_ITEM.RESUME_CREATE: {
        setShowMenu?.(false);
        router.push('/interview/resume-create');
        break;
      }
      case EMENU_ITEM.QUIT: {
        setShowMenu?.(false);
        handleLogout();
        break;
      }
      default: {
        setShowMenu?.(false);
        break;
      }
    }
  };

  const menuItems: IMenuItem[] = [
    {
      id: EMENU_ITEM.PROFILE,
      text: (
        <Trans
          ns={'common'}
          k={'common_profile'}
        />
      ),
      icon: 'profile',
      onClick: () => handleMenuClick(EMENU_ITEM.PROFILE),
    },
    {
      id: EMENU_ITEM.SYSTEM,
      text: (
        <Trans
          ns={'common'}
          k={'common_system'}
        />
      ),
      icon: 'settings',
      onClick: () => handleMenuClick(EMENU_ITEM.SYSTEM),
      hide: !user?.admin,
    },
    {
      id: EMENU_ITEM.INTERVIEW,
      text: (
        <Trans
          ns={'common'}
          k={'common_interview'}
        />
      ),
      icon: 'two-users',
      onClick: () => handleMenuClick(EMENU_ITEM.INTERVIEW),
    },
    {
      id: EMENU_ITEM.TESTS,
      text: (
        <Trans
          ns={'common'}
          k={'common_tests'}
        />
      ),
      icon: 'to-do-list',
      onClick: () => handleMenuClick(EMENU_ITEM.TESTS),
    },
    {
      id: EMENU_ITEM.RESUME_CHECK,
      text: (
        <Trans
          ns={'common'}
          k={'common_check_cv'}
        />
      ),
      icon: 'file-check',
      onClick: () => handleMenuClick(EMENU_ITEM.RESUME_CHECK),
    },
    {
      id: EMENU_ITEM.RESUME_CREATE,
      text: (
        <Trans
          ns={'common'}
          k={'common_create_cv'}
        />
      ),
      icon: 'file-create',
      onClick: () => handleMenuClick(EMENU_ITEM.RESUME_CREATE),
    },
    {
      id: EMENU_ITEM.QUIT,
      text: (
        <Trans
          ns={'common'}
          k={'common_logout'}
        />
      ),
      icon: 'logout',
      color: 'var(--main-error)',
      className: 'mt-auto',
      onClick: () => handleMenuClick(EMENU_ITEM.QUIT),
    },
  ];

  return {
    menuItems,
  };
};
