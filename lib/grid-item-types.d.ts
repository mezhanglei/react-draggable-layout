/// <reference types="react" />
import { BoundsInterface } from "react-free-draggable";
export declare type EventType = MouseEvent | TouchEvent;
export declare enum DragTypes {
    Start = "start",
    Move = "move",
    End = "end",
    ResizeStart = "resizeStart",
    Resizing = "resizing",
    ResizeEnd = "resizeEnd"
}
export interface GridItemEvent {
    GridX?: number;
    GridY?: number;
    w?: number;
    h?: number;
    margin?: [number, number];
    uniqueKey?: string | number;
    forbid?: boolean;
    bounds?: string | HTMLElement | BoundsInterface;
    handle?: string | HTMLElement;
    direction?: string[];
}
export declare type GridItemEventHandle = (data: GridItemEvent, e: EventType) => void;
export interface GridItemProps extends GridItemEvent {
    /**外部容器属性 */
    cols: number;
    containerWidth: number;
    containerPadding: [number, number];
    rowHeight: number;
    onStart?: GridItemEventHandle;
    onMove?: GridItemEventHandle;
    onEnd?: GridItemEventHandle;
    onResizeStart?: GridItemEventHandle;
    onResizing?: GridItemEventHandle;
    onResizeEnd?: GridItemEventHandle;
    children: any;
    className?: string;
    style?: React.CSSProperties;
}
