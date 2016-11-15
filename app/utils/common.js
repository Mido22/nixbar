export const APP_LOCATION = 'http://localhost:1331';
const STATIC_ROOT = `${APP_LOCATION}/file`;
const IMG_ROOT = `${STATIC_ROOT}/IMG`;
const IMG_PLATFORM = `${IMG_ROOT}/defaults`;

export function log() {
  console.log(...arguments);
}

export function loge() {
  console.error(...arguments);
}

export function getImageLocation(type, data) {
  switch (type) {
    case 'platform':
      return `${IMG_PLATFORM}/${data.System}/100.png`;
      break;
    default:
      return null;
  }
}
