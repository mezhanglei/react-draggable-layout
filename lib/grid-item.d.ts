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
    calGridXYToPx: (GridX?: number | undefined, GridY?: number | undefined) => {
        x: number | undefined;
        y: number | undefined;
    };
    calPxToGridXY: (x: number, y: number) => {
        GridX: number | undefined;
        GridY: number | undefined;
    };
    calWHtoPx: (w?: number | undefined, h?: number | undefined) => {
        wPx: number | undefined;
        hPx: number | undefined;
    };
    calPxToWH: (wPx: number, hPx: number) => {
        w: number | undefined;
        h: number | undefined;
    };
    addEventParams: (data: object) => {
        GridX: number | undefined;
        GridY: number | undefined;
        w: number | undefined;
        h: number | undefined;
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
