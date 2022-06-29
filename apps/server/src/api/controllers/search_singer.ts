import { ALIAS_DIVIDER, AssetType } from '#/constants';
import { SEARCH_KEYWORD_MAX_LENGTH } from '#/constants/singer';
import { ExceptionCode } from '#/constants/exception';
import * as db from '@/db';
import { Singer, Property as SingerProperty } from '@/db/singer';
import { getUserListByIds, Property as UserProperty, User } from '@/db/user';
import excludeProperty from '#/utils/exclude_property';
import { getAssetUrl } from '@/platform/asset';
import { Context } from '../constants';

const MAX_PAGE_SIZE = 50;

export default async (ctx: Context) => {
  const { keyword, page, pageSize } = ctx.request.query as {
    keyword?: unknown;
    page?: unknown;
    pageSize?: unknown;
  };
  const pageNumber = page ? Number(page) : undefined;
  const pageSizeNumber = pageSize ? Number(pageSize) : undefined;
  if (
    typeof keyword !== 'string' ||
    !keyword.length ||
    keyword.includes(ALIAS_DIVIDER) ||
    keyword.length > SEARCH_KEYWORD_MAX_LENGTH ||
    typeof pageNumber !== 'number' ||
    !pageNumber ||
    pageNumber < 0 ||
    typeof pageSizeNumber !== 'number' ||
    !pageSizeNumber ||
    pageSizeNumber < 0 ||
    pageSizeNumber > MAX_PAGE_SIZE
  ) {
    return ctx.except(ExceptionCode.PARAMETER_ERROR);
  }

  const pattern = `%${keyword}%`;
  const [total, singerList] = await Promise.all([
    db.get<{ value: number }>(
      `
        select count(*) from singer
          where name like ? or aliases like ?
      `,
      [pattern, pattern],
    ),
    db.all<
      Pick<
        Singer,
        | SingerProperty.ID
        | SingerProperty.AVATAR
        | SingerProperty.NAME
        | SingerProperty.ALIASES
        | SingerProperty.CREATE_USER_ID
      >
    >(
      `
        select id, avatar, name, aliases, createUserId from singer
          where name like ? or aliases like ?
          limit ?
          offset ?
      `,
      [pattern, pattern, pageSizeNumber, pageSizeNumber * (pageNumber - 1)],
    ),
  ]);

  const userList = await getUserListByIds(
    Array.from(new Set(singerList.map((s) => s.createUserId))),
    [UserProperty.ID, UserProperty.AVATAR, UserProperty.NICKNAME],
  );
  const userIdMapUser: {
    [key: string]: Pick<
      User,
      UserProperty.ID | UserProperty.AVATAR | UserProperty.NICKNAME
    >;
  } = {};
  userList.forEach((user) => {
    userIdMapUser[user.id] = {
      ...user,
      avatar: getAssetUrl(user.avatar, AssetType.USER_AVATAR),
    };
  });

  return ctx.success({
    total: total!.value,
    singerList: singerList.map((singer) => ({
      ...excludeProperty(singer, [SingerProperty.CREATE_USER_ID]),
      avatar: getAssetUrl(singer.avatar, AssetType.SINGER_AVATAR),
      createUser: userIdMapUser[singer.createUserId],
    })),
  });
};
