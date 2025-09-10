import IconMarkup from "@/components/ui/icon/utils/IconMarkup";
import { sleep } from "@/core/utils/common";
import { Trans } from "@/i18n/Trans";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface ILinkItem {
  id: string;
  text: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  submenu?: {
    subTitle: string | React.ReactNode;
    links: Array<{
      id: number;
      text: string | React.ReactNode;
      description: string | React.ReactNode;
      href: string;
      icon: keyof typeof IconMarkup;
    }>;
  };
}

export const useHeaderItems = ({ scrollRef }: Readonly<{ scrollRef?: React.RefObject<HTMLDivElement | null> }>) => {
  const router = useRouter();
  const pathName = usePathname();

  const goHome = () => {
    const el = document.getElementById('home');
    if (el) {
      const offset = 112;
      const scrollContainer = scrollRef?.current;

      if (scrollContainer) {
        const elTop = el.getBoundingClientRect().top;
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const scrollOffset = elTop - containerTop + scrollContainer.scrollTop - offset;

        scrollContainer.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }
    router.push('/');
  };

  const headerLinks: ILinkItem[] = [
    {
      id: 'HOME',
      text: (
        <Trans
          ns={'main'}
          k={'main_go_home'}
          format={'uppercase'}
        />
      ),
      onClick: goHome,
    },
    {
      id: 'ABOUT',
      text: (
        <Trans
          ns={'main'}
          k={'main_about'}
          format={'uppercase'}
        />
      ),
      onClick: async () => {
        if (pathName !== '/') {
          router.push('/');
          await sleep(300);
        }
        const el = document.getElementById('about');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'INSTRUMENTS',
      text: (
        <Trans
          ns={'common'}
          k={'common_instruments'}
          format={'uppercase'}
        />
      ),
      submenu: {
        subTitle: (
          <Trans
            ns={'common'}
            k={'common_instruments'}
          />
        ),
        links: [
          {
            id: 1,
            text: (
              <Trans
                ns={'common'}
                k={'common_interview'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_interview_description'}
              />
            ),
            href: '/interview',
            icon: 'two-users',
          },
          {
            id: 2,
            text: (
              <Trans
                ns={'common'}
                k={'common_tests'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_tests_description'}
              />
            ),
            href: '/tests',
            icon: 'to-do-list',
          },
          {
            id: 3,
            text: (
              <Trans
                ns={'common'}
                k={'common_check_cv'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_check_cv_description'}
              />
            ),
            href: '/interview/resume-check',
            icon: 'file-check',
          },
          {
            id: 4,
            text: (
              <Trans
                ns={'common'}
                k={'common_create_cv'}
                format={'uppercase'}
              />
            ),
            description: (
              <Trans
                ns={'common'}
                k={'common_create_cv_description'}
              />
            ),
            href: '/interview/resume-create',
            icon: 'file-create',
          },
        ],
      },
    },
    {
      id: 'FAQ',
      text: (
        <Trans
          ns={'common'}
          k={'common_faq'}
          format={'uppercase'}
        />
      ),
      onClick: async () => {
        if (pathName !== '/') {
          router.push('/');
          await sleep(300);
        }
        const el = document.getElementById('faq');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return {
    headerLinks,
    goHome,
  };
};