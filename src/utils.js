export const getImageUrl = (path) => `/assets/${path}`;

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");
