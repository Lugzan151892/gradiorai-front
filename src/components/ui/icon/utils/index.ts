import IconMarkup from '@/components/ui/icon/utils/IconMarkup';

const getIconViewBox = (name: keyof typeof IconMarkup) => {
  switch (name) {
    case 'cross':
      return `0 -0.5 25 25`;
    case 'star':
    case 'star-transparent':
      return '0 0 44 44';
    case 'user-login':
      return '0 0 25 25';
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
    case 'document-upload':
    case 'document-ready':
      return '0 0 32 32';
    case 'close-circle':
      return '0 0 22 22';
    case 'send':
    case 'microphone':
      return '0 0 24 25';
    case 'item-hut':
    case 'item-analize':
    case 'item-list':
    case 'item-education':
      return '0 0 50 50';
    case 'profile':
      return '0 0 26 26';
    default:
      return '0 0 24 24';
  }
};

export default getIconViewBox;
