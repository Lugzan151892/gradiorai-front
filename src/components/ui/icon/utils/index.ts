import IconMarkup from '@/components/ui/icon/utils/IconMarkup';

const getIconViewBox = (name: keyof typeof IconMarkup, size: number) => {
  switch (name) {
    case 'arrow-left':
      return '0 0 22 16';
    case 'arrow-right':
      return '0 0 26 23';
    case 'cross':
    case 'search-book':
      return `0 0 ${size} ${size}`;
    case 'login':
      return '0 0 32 32';
    case 'user':
      return '0 0 16 16';
    case 'refresh':
      return '0 0 21 21';
    case 'reload':
      return '0 0 16 16';
    case 'password':
    case 'youtube':
    case 'email':
    case 'check':
    case 'warning':
    case 'eye-opened':
    case 'eye-closed':
    case 'question-outline':
      return '0 0 24 24';
    case 'star':
      return '0 0 1920 1920';
    case 'sand-clock':
      return '0 0 19 21';
    case 'user-login':
      return '0 0 25 25';
    case 'open-password':
      return '0 0 14 21';
    case 'wallet':
      return '0 0 30 30';
    case 'turn-off':
      return '0 0 32 32';
    default:
      return `0 0 ${size} ${size}`;
  }
};

export default getIconViewBox;
