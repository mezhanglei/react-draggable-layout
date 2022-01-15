/// <reference types="react" />
import { DragTypes, GridItemEvent, EventType } from './grid-item-types';
export declare type DragGridHandler = (layoutItem: GridItemEvent, oldLayout: GridItemEvent[], currentLayout?: GridItemEvent[], e?: EventType) => void;
export interface DragGridProps {
    layout: GridItemEvent[];
    cols: number;
    width: number;
    padding?: [number, number];
    rowHeight: number;
    margin: [number, number];
    children: any;
    onDragStart?: DragGridHandler;
    onDrag?: DragGridHandler;
    onDragEnd?: DragGridHandler;
    onResizeStart?: DragGridHandler;
    onResizing?: DragGridHandler;
    onResizeEnd?: DragGridHandler;
    className: number | string;
    style?: React.CSSProperties;
}
export interface DragGridState {
    layout: GridItemEvent[];
    parentDragType?: DragTypes;
}
export interface GridItemProvided {
    isDragging: Boolean;
}