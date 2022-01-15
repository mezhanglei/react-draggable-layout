/// <reference types="react" />
import { BoundsInterface } from "react-free-draggable";
import { Direction } from "react-resize-zoom";
export declare type EventType = MouseEvent | TouchEvent;
export declare enum DragTypes {
    dragStart = "dragStart",
    draging = "draging",
    dragEnd = "dragEnd",
    resizeStart = "resizeStart",
    resizing = "resizing",
    resizeEnd = "resizeEnd"
}
export interface GridItemEvent {
    GridX: number;
    GridY: number;
    w: number;
    h: number;
    margin?: [number, number];
    uniqueKey?: string | number;
    forbid?: boolean;
    bounds?: string | HTMLElement | BoundsInterface;
    handle?: string | HTMLElement;
    dragAxis?: string[];
    resizeAxis?: Direction[];
    zIndexRange?: [number, number];
}
export declare type GridItemEventHandle = (data: GridItemEvent, e: EventType) => void;
export interface GridItemProps extends GridItemEvent {
    /**外部容器属性 */
    cols: number;
    containerWidth: number;
    containerPadding: [number, number];
    rowHeight: number;
    onDragStart?: GridItemEventHandle;
    onDragEnd?: GridItemEventHandle;
    onDrag?: GridItemEventHandle;
    onResizeStart?: GridItemEventHandle;
    onResizing?: GridItemEventHandle;
    onResizeEnd?: GridItemEventHandle;
    children: any;
    className?: string;
    style?: React.CSSProperties;
}
