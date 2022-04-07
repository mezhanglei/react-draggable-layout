import React from "react";
import { EventHandler as ResizeEventHandler } from "react-resize-zoom";
import { DragHandler as DragEventHandler } from "react-free-draggable";
import { GridItemProps, DragTypes } from './grid-item-types';
export default class GridItem extends React.Component<GridItemProps, {
    dragType?: DragTypes;
}> {
    lastZindex: any;
    constructor(props: GridItemProps);
    static defaultProps: {
        cols: number;
        containerWidth: number;
        containerPadding: number[];
        margin: number[];
        rowHeight: number;
        w: number;
        h: number;
        direction: import("./grid-item-types").DragDirection[];
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
        direction: string[] | undefined;
    };
    onStart: DragEventHandler;
    onMove: DragEventHandler;
    onEnd: DragEventHandler;
    onResizeStart: ResizeEventHandler;
    onResizing: ResizeEventHandler;
    onResizeEnd: ResizeEventHandler;
    canDrag: () => boolean;
    canResize: () => boolean;
    render(): JSX.Element;
}
