/* eslint-disable no-param-reassign */
import { MenuDataItem } from '@ant-design/pro-layout';

// 拍平menu_trees -> 一维数组
export const flattenAuthMenuTree = (treeData: any[]) => {
  const authMenuList: any[] = [];
  treeData.forEach((item) => {
    authMenuList.push(item);
    const childList = flattenAuthMenuTree(item.children);
    authMenuList.push(...childList);
  });
  return authMenuList;
};

export const getAuthRoutes = (menuRoutes: any[], authMenuList: any[]) => {
  return menuRoutes.filter((menuRoute: any) => {
    const { auth = {} } = menuRoute;
    const mapTreeNode = authMenuList.find(
      (authMenuNode) => (authMenuNode.url === menuRoute.path ||
        authMenuNode.url.startsWith(menuRoute.path)),
    );
    if (auth.required && !mapTreeNode) {
      return false;
    }
    // fill meta info
    menuRoute.meta = {
      ...menuRoute.meta,
      id: mapTreeNode?.id,
    };
    // deep first recursive
    if (menuRoute.routes) {
      menuRoute.routes = getAuthRoutes(menuRoute.routes, authMenuList);
      menuRoute.routes.forEach((item: any) => ({ ...item, parent: menuRoute }));
    }
    return true;
  });
};

export const fillAuthRoutes = (menuRoutes: any[], authMenuList: any[]) => {
  return menuRoutes.map((menuRoute: any) => {
    const mapTreeNode = authMenuList.find(
      (authMenuNode) => (authMenuNode.url === menuRoute.path ||
        authMenuNode.url.startsWith(menuRoute.path)),
    );
    if (!mapTreeNode) {
      return {
        ...menuRoute,
        auth: false,
      };
    }
    // fill meta info
    const menuRouteClone = {
      ...menuRoute,
      meta: {
        ...menuRoute.meta,
        id: mapTreeNode.id,
      },
    };
    // deep first recursive
    if (menuRoute.children) {
      menuRouteClone.children = fillAuthRoutes(menuRoute.children, authMenuList);
      menuRouteClone.children.forEach((item: any) => ({ ...item, parent: menuRoute }));
    }
    return menuRouteClone;
  });
};

/**
 * 统一权限平台菜单数据适配
 * @param data menu_trees
 * @param parentKeys []
 * @returns
 */
export const menuTreeDataAdaptor = (data: any[], parentKeys = []) => {
  const authMenuTreeData: MenuDataItem[] = data.map((item: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, name, parent_id, order_index, url, type, children } = item;
    const menuDataItem: MenuDataItem = {
      id,
      name,
      path: url,
      children: menuTreeDataAdaptor(children, parentKeys.concat(url)),
      parentKeys,
    };
    return menuDataItem;
  });
  return authMenuTreeData;
};

