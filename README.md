# react-draggable-layout

English | [中文说明](./README_CN.md)

[![Version](https://img.shields.io/badge/version-0.2.4-green)](https://www.npmjs.com/package/react-draggable-layout)

# Introduction?
Components with custom layout by drag and drop can also define the layout of the elements of the interface by means of a fixed format data source. The element is set to `position: absolute`.

# Matters

1. The child element cannot be an inline element because transform does not work on inline elements!
2. The child element cannot be an inline element, because transform does not work on inline elements!
3. The child element must be given a unique value `key`, which sets the position and height according to the corresponding layout in the data source `layout`;
4. The position and width of the child element is given in `width / cols` as a unit;
5. `props.style` needs to be assigned to the target element's `style` attribute, position and size attributes in order to take effect;

### install
```
npm install --save react-draggable-layout
# or
yarn add react-draggable-layout
```

### Example
```javascript
import *as React from 'react';
import DragGrid from 'react-draggable-layout'
import { Words } from './largedata';
import './index.css';

const fakeData = () => {
    var Y = 0;
    return Words.map((item, index) => {
        if (index % 4 === 0) Y++;

        return { ...item, GridX: index % 4 * 4, GridY: Y * 4, w: 4, h: 3, uniqueKey: index + '' }
    })
}

export const Card: (any: any) => any = React.forwardRef(({ item, style }, ref) => {
    return (
        <div
            className='layout-Item'
            ref={ref}
            style={{ ...style, background: '#fff' }}
        >
            <div
                style={{ padding: 5, textAlign: 'center', color: '#595959' }}
            >
                <span>title</span>
                <div style={{ borderBottom: '1px solid rgba(120,120,120,0.1)' }} />
                {item.content}
            </div>
            <span
                style={{
                    position: 'absolute',
                    width: 10, height: 10, right: 2, bottom: 2, cursor: 'se-resize',
                    borderRight: '2px solid rgba(15,15,15,0.2)',
                    borderBottom: '2px solid rgba(15,15,15,0.2)'
                }}
            />
        </div>
    )
})


export class LayoutDemo extends React.Component<{}, {}> {
    render() {
        const margin: [number, number] = [5, 5];
        const dragactInit = {
            width: 600,
            cols: 16,
            rowHeight: 40,
            margin: margin,
            className: 'normal-layout',
            layout: fakeData()
        }
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div>
                    <h1 style={{ textAlign: 'center' }}>
                        普通布局demo
                    </h1>
                    <DragGrid
                        {...dragactInit}
                        style={{
                            background: '#003A8C'
                        }}
                    >
                        {
                            fakeData()?.map((item, index) => {
                                return <Card item={item} key={item.uniqueKey} />
                            })
                        }
                    </DragGrid>
                </div>
            </div>
        )
    }
}
```

## DragGrid Component Attributes

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| layout                      | `GridItemEvent[]`            | -                                                  | layout dataSource                                                                                  |
| cols                      | `number`            | 12                                                  | Row split into several parts                                                                                  |
| width                      | `number`            | -                                                  | container's width                                                                                  |
| padding                      | `[number, number]`            | `[0,0]`                                                  | container's `padding`                                                                                  |
| rowHeight                      | `number`            | 30                                                  | The row height of the layout of the child elements within the container                                                                                  |
| margin                      | `[number, number]`           |`[10, 10]`                                                 | the child elements in the container's `margin`                                                                                  |
| onStart                      | `DragGridHandler`           |-                                                 | Drag start event                                                                                  |
| onMove                      | `DragGridHandler`           |-                                                 | Draging event                                                                                  |
| onEnd                      | `DragGridHandler`           |-                                                 | Drag end event                                                                                  |
| onResizeStart                      | `DragGridHandler`           |-                                                 | scale start event                                                                                  |
| onResizing                      | `DragGridHandler`           |-                                                 | scaling event                                                                                  |
| onResizeEnd                      | `DragGridHandler`           |-                                                 | scale end event                                                                                  |
## layout Attributes(GridItemEvent[])

| name                          | type                  | defaultValue                                                   | description                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| GridX                      | `number`            | -                                                  | x-axis layout position                                                                                  |
| GridY                      | `number`            | -                                                  | y-axis layout position                                                                                  |
| w                      | `number`            | `1`                                                  | width                                                                                  |
| h                      | `number`            | `1`                                                  | height                                                                                  |
| margin                      | `[number, number]`            | `[10,10]`                                                  | the element's `margin`                                                                                  |
| uniqueKey                      | `string`           |-                                                 | Unique key value                                                                                  |
| forbid                      | `boolean`           |-                                                 | forbid dragging, set this so it won't be dragged and becomes a static element                                                                                  |
| handle                      | `string / HTMLElement`           |`document.body / document.documentElement`                                                 | Drag handles                                                                                  |
| direction                      | `['vertical', 'horizontal', 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw']`           |-                                                 | Allowed directions for dragging                                                                                  |



