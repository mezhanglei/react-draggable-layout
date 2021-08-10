# react-draggable-layout

[English](./README.md) | 中文说明

[![Version](https://img.shields.io/badge/version-0.0.2-green)](https://www.npmjs.com/package/react-draggable-layout)

# 适用场景

通过拖拽进行自定义布局的组件，也可以通过固定格式的数据源来定义界面的元素布局。元素被设置为`position: absolute`。

# 注意事项

1. 子元素不能为行内(inline)类型元素,因为transform对行内元素无效!
2. 拖拽子元素被设置为`position: absolute`，最好外层用一层元素包裹以免被影响样式;
3. 子元素必须赋予唯一值`key`, 根据数据源`layout`中对应的布局进行设置位置和宽高;
4. 子元素的位置和宽高均以`width / cols`作为一个单位;
5. `props.style`需要赋值给目标元素的`style`属性，位置和大小属性才能生效;

### 快速安装
```
npm install --save react-draggable-layout
# or
yarn add react-draggable-layout
```

### 简单示例
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
                // {...provided.resizeHandle}
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

## DragGrid组件属性说明

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| layout                      | `GridItemEvent[]`            | -                                                  | 渲染数据源                                                                                  |
| cols                      | `number`            | 12                                                  | 行分割成几份                                                                                  |
| width                      | `number`            | -                                                  | 容器内的宽度                                                                                  |
| padding                      | `[number, number]`            | `[0,0]`                                                  | 容器的`padding`                                                                                  |
| rowHeight                      | `number`            | 30                                                  | 容器内的子元素布局的行高                                                                                  |
| margin                      | `[number, number]`           |`[10, 10]`                                                 | 容器内子元素的`margin`                                                                                  |
| onDragStart                      | `DragGridHandler`           |-                                                 | 拖拽开始事件                                                                                  |
| onDrag                      | `DragGridHandler`           |-                                                 | 拖拽事件                                                                                  |
| onDragEnd                      | `DragGridHandler`           |-                                                 | 拖拽结束事件                                                                                  |
| onResizeStart                      | `DragGridHandler`           |-                                                 | 缩放开始事件                                                                                  |
| onResizing                      | `DragGridHandler`           |-                                                 | 缩放事件                                                                                  |
| onResizeEnd                      | `DragGridHandler`           |-                                                 | 拖拽结束事件                                                                                  |
## layout属性说明(GridItemEvent[]类型)

| 名称                          | 类型                  | 默认值                                                         | 描述                                                                                                      |
| ----------------------------- | --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| GridX                      | `number`            | -                                                  | x轴布局位置                                                                                  |
| GridY                      | `number`            | -                                                  | y轴布局位置                                                                                  |
| w                      | `number`            | `1`                                                  | 宽度                                                                                  |
| h                      | `number`            | `1`                                                  | 高度                                                                                  |
| margin                      | `[number,number]`            | `[10,10]`                                                  | 元素的`margin`                                                                                  |
| uniqueKey                      | `string`           |-                                                 | 唯一key值                                                                                  |
| forbid                      | `boolean`           |-                                                 | 禁止拖拽，设置了这个就不会被拖拽，成为静态元素                                                                                  |
| handle                      | `string / HTMLElement`           |`document.body / document.documentElement`                                                 | 拖拽句柄                                                                                  |
| dragAxis                      | `x / y / both / none`           |`both`                                                 | 允许拖拽的方向                                                                                  |
| resizeAxis                      | `auto / x / y / angle / none`           |`auto`                                                 | 允许缩放的边角                                                                                  |
| zIndexRange                      | `[number, number]`           |-                                                 | zIndex的变化范围                                                                                  |
| isMove                      | `boolean`           |-                                                 | 是否在移动中                                                                                  |






