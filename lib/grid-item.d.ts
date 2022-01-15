import React from "react";
import { EventHandler as ResizeEventHandler } from "react-resize-zoom";
import { DragHandler as DragEventHandler } from "react-free-draggable";
import { GridItemProps, DragTypes } from './grid-item-types';
export default class GridItem extends React.Component<GridItemProps, {
    dragType?: DragTypes;
}> {
    constructor(props: GridItemProps);
    static defaultProps: {
        cols: number;
        containerWidth: number;
        containerPadding: number[];
        margin: number[];
        rowHeight: number;
        w: number;
        h: number;
        dragAxis: import("react-free-draggable").DragAxis[];
        resizeAxis: import("react-resize-zoom").Direction[];
    };
    calcolsWidth: () => number;
    calGridXYToPx: (GridX: number, GridY: number) => {
        x: number;
        y: number;
    };
    calPxToGridXY: (x: number, y: number) => {
        GridX: number;
        GridY: number;
    };
    calWHtoPx: (w: number, h: number) => {
        wPx: number;
        hPx: number;
    };
    calPxToWH: (wPx: number, hPx: number) => {
        w: number;
        h: number;
    };
    addEventParams: (data: object) => {
        GridX: number;
        GridY: number;
        w: number;
        h: number;
        uniqueKey: string | number | undefined;
        margin: [number, number] | undefined;
        forbid: boolean | undefined;
        handle: string | HTMLElement | undefined;
        dragAxis: string[] | undefined;
        resizeAxis: import("react-resize-zoom").Direction[] | undefined;
        zIndexRange: [number, number] | undefined;
    };
    onDragStart: DragEventHandler;
    onDrag: DragEventHandler;
    onDragEnd: DragEventHandler;
    onResizeStart: ResizeEventHandler;
    onResizing: ResizeEventHandler;
    onResizeEnd: ResizeEventHandler;
    canDrag: () => boolean;
    canResize: () => boolean;
    render(): JSX.Element;
}
