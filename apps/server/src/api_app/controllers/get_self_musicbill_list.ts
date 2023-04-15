import { AssetTypeV1 } from '#/constants';
import { getUserMusicbillList, Property } from '@/db/musicbill';
import { getAssetPublicPathV1 } from '@/platform/asset';
import { Context } from '../constants';

export default async (ctx: Context) => {
  const musicbillList = await getUserMusicbillList(ctx.user.id, [
    Property.ID,
    Property.COVER,
    Property.NAME,
    Property.PUBLIC,
    Property.CREATE_TIMESTAMP,
  ]);

  return ctx.success(
    musicbillList.map((mb) => ({
      ...mb,
      cover: getAssetPublicPathV1(mb.cover, AssetTypeV1.MUSICBILL_COVER),
    })),
  );
};
