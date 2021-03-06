import { GridItemEvent } from "../grid-item-types";
import { deepClone } from "./object";

// 根据key获取目标
export function getLayoutItem(layout: GridItemEvent[], id: string) {
  for (let i = 0, len = layout?.length; i < len; i++) {
    if (layout[i].uniqueKey === id) return layout[i];
  }
}

// 检测是否碰撞
export const colslision = (a: GridItemEvent, b: GridItemEvent) => {
  if (a.GridX === b.GridX && a.GridY === b.GridY &&
    a.w === b.w && a.h === b.h) {
    return true
  }
  if (typeof a.GridX !== 'number'
    || typeof b.GridX !== 'number'
    || typeof a.GridY !== 'number'
    || typeof b.GridY !== 'number'
    || typeof a.w !== 'number'
    || typeof b.w !== 'number'
    || typeof a.h !== 'number'
    || typeof b.h !== 'number'
  ) return false;
  if (a.GridX + a.w <= b.GridX) return false
  if (a.GridX >= b.GridX + b.w) return false
  if (a.GridY + a.h <= b.GridY) return false
  if (a.GridY >= b.GridY + b.h) return false
  return true
}


/**获取layout中，item第一个碰撞到的物体 */
export const getFirstcolslison = (layout: GridItemEvent[], item: GridItemEvent) => {

  for (let i = 0, length = layout.length; i < length; i++) {
    if (colslision(layout[i], item)) {
      return layout[i]
    }
  }
  return null
}

// 检测碰撞进行重排
export const layoutCheck = function () {

  let caches: any = {};

  const _layoutCheck = function (layout: GridItemEvent[], layoutItem: GridItemEvent) {


    if (layoutItem.GridX === caches.GridX
      && layoutItem.GridY === caches.GridY
      && layoutItem.w === caches.w
      && layoutItem.h === caches.h) {
      return layout;
    }

    caches = { ...layoutItem };
    const uniqueKey = layoutItem?.uniqueKey;

    const newLayout = [];
    for (let i = 0; i < layout?.length; i++) {
      const item = layout?.[i];
      if (typeof layoutItem?.GridY === 'number'
        && typeof item.GridY === 'number'
        && typeof item.h === 'number') {
        // 非拖拽元素
        if (item?.uniqueKey !== uniqueKey) {
          // 当元素和移动元素碰撞时
          if (colslision(item, layoutItem) && !item?.forbid) {
            let offsetY;
            if (layoutItem.GridY > item.GridY && layoutItem.GridY < item.GridY + item.h) {
              offsetY = item.GridY;
            } else {
              offsetY = item.GridY + 1;
            }
            const newItem = { ...item, GridY: offsetY }
            newLayout?.push(newItem);
          } else {
            newLayout?.push(item);
          }
        } else {
          const newItem = { ...item, ...layoutItem };
          newLayout?.push(newItem);
        }
      }
    }
    return newLayout;
  }
  return _layoutCheck;
}();

export const sortLayout = (layout: GridItemEvent[]) => {
  const newLayout = deepClone(layout);
  return newLayout?.sort((a: GridItemEvent, b: GridItemEvent) => {
    if (typeof a.GridY === 'number' && typeof a.GridX === 'number' && typeof b.GridY === 'number' && typeof b.GridX === 'number') {
      if (a.forbid || b.forbid) {
        return 0;
      } else if (a.GridY === b.GridY) {
        return a.GridX - b.GridX;
      } else {
        return a.GridY - b.GridY;
      }
    }
    return -1
  });
}

// 获取整个布局多少行
export function bottom(layout: GridItemEvent[]): number {
  let max = 0,
    bottomY;
  for (let i = 0, len = layout.length; i < len; i++) {
    const layoutItem = layout[i];
    if (typeof layoutItem.GridY === 'number' && typeof layoutItem.h === 'number') {
      bottomY = <number>layoutItem.GridY + <number>layoutItem.h;
      if (bottomY > max) max = bottomY;
    }
  }
  return max;
}

/**
 * 压缩单个元素，使得每一个元素都会紧挨着边界或者相邻的元素
 * @param {*} finishedLayout 压缩完的元素会放进这里来，用来对比之后的每一个元素是否需要压缩
 * @param {*} item 
 */
export const compactItem = (finishedLayout: GridItemEvent[], item: GridItemEvent) => {
  if (item.forbid) return item;
  const newItem = { ...item, uniqueKey: item.uniqueKey + '' }
  if (finishedLayout.length === 0) {
    return { ...newItem, GridY: 0 }
  }
  /**
   * 类似一个递归调用
   */
  while (true) {
    let Firstcolslison = getFirstcolslison(finishedLayout, newItem)
    if (Firstcolslison) {
      /**第一次发生碰撞时，就可以返回了 */
      if (typeof Firstcolslison.GridY === 'number' && typeof Firstcolslison.h === 'number') {
        newItem.GridY = Firstcolslison.GridY + Firstcolslison.h
        return newItem
      }
    }

    if (typeof newItem?.GridY === 'number') {
      newItem.GridY--
      if (newItem.GridY < 0) return { ...newItem, GridY: 0 }/**碰到边界的时候，返回 */
    }
  }
}

/**
 * 压缩layout，使得每一个元素都会紧挨着边界或者相邻的元素
 * @param {*} layout 
 */
export const compactLayout = function () {
  let _cache: any = {
  };

  return function (layout: GridItemEvent[], movingItem?: GridItemEvent) {
    if (movingItem) {
      if (_cache.GridX === movingItem.GridX
        && _cache.GridY === movingItem.GridY &&
        _cache.w === movingItem.w &&
        _cache.h === movingItem.h &&
        _cache.uniqueKey === movingItem.uniqueKey
      ) {
        return layout;
      }
      _cache = movingItem;
    }
    let sorted = sortLayout(layout) //把静态的放在前面
    const needCompact = Array(layout.length)
    const compareList = []


    for (let i = 0, length = sorted.length; i < length; i++) {
      let finished = compactItem(compareList, sorted[i])
      if (movingItem) {
        if (movingItem.uniqueKey === finished.uniqueKey) {
          movingItem.GridX = finished.GridX;
          movingItem.GridY = finished.GridY;
        }
      }
      compareList.push(finished)
      needCompact[i] = finished
    }

    return needCompact;
  }

}()

// grid位置边界
export const checkInContainer = (cols: number, GridX?: number, GridY?: number, w?: number) => {
  if (typeof GridX === 'number' && typeof GridY === 'number' && typeof w === 'number') {
    /**防止元素出container */
    if (GridX + w > cols - 1) GridX = cols - w //右边界
    if (GridX < 0) GridX = 0//左边界
    if (GridY < 0) GridY = 0//上边界
  }
  return { GridX, GridY }
}

// grid宽高边界
export const checkWidthHeight = (cols: number, GridX?: number, w?: number, h?: number) => {
  let newW = w;
  let newH = h;
  if (typeof GridX === 'number' && typeof w === 'number' && typeof h === 'number') {
    if (GridX + w > cols - 1) newW = cols - GridX //右边界
    if (w < 1) newW = 1;
    if (h < 1) newH = 1;
  }
  return {
    w: newW, h: newH
  }
}

// 边界纠正
export const correctLayout = (layout: GridItemEvent[], cols: number) => {
  let copy = [...layout];
  for (let i = 0; i < layout?.length - 1; i++) {
    copy[i].GridX = checkInContainer(cols, copy[i].GridX, copy[i].GridY, copy[i].w)?.GridX;
    copy[i].GridY = checkInContainer(cols, copy[i + 1].GridX, copy[i + 1].GridY, copy[i + 1].w)?.GridY;

    if (colslision(copy[i], copy[i + 1])) {
      copy = layoutCheck(copy, <GridItemEvent>copy[i])
    }
  }

  return copy;
}