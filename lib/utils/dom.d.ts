import { GridItemEvent } from "../grid-item-types";
export declare function getLayoutItem(layout: GridItemEvent[], id: string): GridItemEvent | undefined;
export declare const colslision: (a: GridItemEvent, b: GridItemEvent) => boolean;
/**获取layout中，item第一个碰撞到的物体 */
export declare const getFirstcolslison: (layout: GridItemEvent[], item: GridItemEvent) => GridItemEvent | null;
export declare const layoutCheck: (layout: GridItemEvent[], layoutItem: GridItemEvent) => GridItemEvent[];
export declare const sortLayout: (layout: GridItemEvent[]) => any;
export declare function bottom(layout: GridItemEvent[]): number;
/**
 * 压缩单个元素，使得每一个元素都会紧挨着边界或者相邻的元素
 * @param {*} finishedLayout 压缩完的元素会放进这里来，用来对比之后的每一个元素是否需要压缩
 * @param {*} item
 */
export declare const compactItem: (finishedLayout: GridItemEvent[], item: GridItemEvent) => GridItemEvent;
/**
 * 压缩layout，使得每一个元素都会紧挨着边界或者相邻的元素
 * @param {*} layout
 */
export declare const compactLayout: (layout: GridItemEvent[], movingItem?: GridItemEvent | undefined) => any[];
export declare const checkInContainer: (GridX: number, GridY: number, cols: number, w: number) => {
    GridX: number;
    GridY: number;
};
export declare const checkWidthHeight: (GridX: number, w: number, h: number, cols: number) => {
    w: number;
    h: number;
};
export declare const correctLayout: (layout: GridItemEvent[], cols: number) => GridItemEvent[];
