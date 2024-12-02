export type EmojiProps = {
  id?: string;
  shortcodes?: string;
  native?: string;
  size?: string;
  fallback?: string;
  set?: 'native' | 'apple' | 'facebook' | 'google' | 'twitter';
  skin?: 1 | 2 | 3 | 4 | 5 | 6;
};
