"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const empty_1 = require("./empty");
const taro_ui_1 = require("taro-ui");
const components_1 = require("@tarojs/components");
class DataList extends taro_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
        console.log(`gg${this.props.uid}`);
        console.log(props);
    }
    onChanged(data) {
        let pk = this.props.dataSource.primaryKeys[0];
        let id = data[pk];
        console.assert(id != null);
        let items = this.state.items;
        let item = items.filter(o => (o[pk]) == id)[0];
        if (item == null) {
            items.push(data);
        }
        else {
            Object.assign(item, data);
        }
        this.setState({ items });
        // let dataItem = items.filter(o=>o)
    }
    static dataItem(dataListId) {
        return DataList.dataItems[dataListId];
    }
    createItem(item, index, items) {
        let { dataSource, itemProps } = this.props;
        let props = itemProps(item);
        let pk = dataSource.primaryKeys[0];
        let key = item[pk];
        console.log(key);
        return <components_1.View key={`${key}`}>
            <taro_ui_1.AtListItem key={`${key}`} {...props} hasBorder={false}/>
            {index < items.length - 1 ? <taro_ui_1.AtDivider height={10}/> : null}
        </components_1.View>;
    }
    componentDidMount() {
        this.props.dataSource.updated.add((sender, r) => this.onChanged(r));
        this.props.dataSource.inserted.add((sender, r) => this.onChanged(r));
        this.props.dataSource.select().then(r => {
            this.setState({ items: r.dataItems, status: "success" });
        });
    }
    render() {
        let { items, status } = this.state;
        if (!status)
            return null;
        switch (status) {
            case "fail": {
                return <empty_1.Empty icon="close" text="数据加载失败, 点击重新加载" onClick={() => this.loadData()}/>;
            }
            case "success": {
                return <taro_ui_1.AtList hasBorder={false}>
                    {items.map((o, index) => {
                    return this.createItem(o, index, items);
                })}
                </taro_ui_1.AtList>;
            }
        }
        return <empty_1.Empty icon="loading" text="数据正在加载中..."/>;
    }
}
exports.DataList = DataList;
DataList.dataItems = {};
//# sourceMappingURL=data-list.jsx.map