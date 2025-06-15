import IconMarkup from '@/components/ui/icon/utils/IconMarkup';

const getIconViewBox = (name: keyof typeof IconMarkup) => {
  switch (name) {
    case 'arrow-left':
      return '0 0 22 16';
    case 'arrow-right':
      return '0 0 26 23';
    case 'cross':
      return `0 -0.5 25 25`;
    case 'login':
      return '0 0 32 32';
    case 'refresh':
      return '0 0 21 21';
    case 'reload':
      return '0 0 16 16';
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
    case 'owl':
      return '0 0 512 512';
    case 'arrow-top-right':
      return '0 0 19 18';
    case 'settings-new':
      return '0 0 16 16';
    default:
      return '0 0 24 24';
  }
};

export default getIconViewBox;
