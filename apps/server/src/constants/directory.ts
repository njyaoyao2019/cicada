import path from 'path';
import { AssetType } from '#/constants';
import argv from '@/argv';
import { DownloadType } from '.';

export const ROOT_ASSET_DIR = `${argv.base}/assets`;
export const ASSET_DIR: Record<AssetType, string> = {
  [AssetType.USER_AVATAR]: `${ROOT_ASSET_DIR}/${AssetType.USER_AVATAR}`,
  [AssetType.SINGER_AVATAR]: `${ROOT_ASSET_DIR}/${AssetType.SINGER_AVATAR}`,
  [AssetType.MUSIC_COVER]: `${ROOT_ASSET_DIR}/${AssetType.MUSIC_COVER}`,
  [AssetType.MUSIC_SQ]: `${ROOT_ASSET_DIR}/${AssetType.MUSIC_SQ}`,
  [AssetType.MUSIC_HQ]: `${ROOT_ASSET_DIR}/${AssetType.MUSIC_HQ}`,
  [AssetType.MUSIC_AC]: `${ROOT_ASSET_DIR}/${AssetType.MUSIC_AC}`,
  [AssetType.MUSICBILL_COVER]: `${ROOT_ASSET_DIR}/${AssetType.MUSICBILL_COVER}`,
};

export const DB_SNAPSHOT_DIR = `${argv.base}/db_snapshots`;

export const TRASH_DIR = `${argv.base}/trash`;

export const LOG_DIR = `${argv.base}/logs`;

export const ROOT_DOWNLOAD_DIR = path.join(__dirname, '../../../../downloads');
export const DOWNLOAD_DIR: Record<DownloadType, string> = {
  [DownloadType.MUSICBILL_EXPORT]: `${ROOT_DOWNLOAD_DIR}/${DownloadType.MUSICBILL_EXPORT}`,
};
