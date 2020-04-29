"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const loading_1 = require("../loading");
require("./repeater.scss");
exports.RepeaterItem = react_1.default.createContext({ dataItem: null, index: -1, count: -1 });
class Repeater extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    dataItemKey(dataItem) {
        let primaryKeys = this.props.dataSource.primaryKeys;
        if (primaryKeys == null || primaryKeys.length == 0) {
            console.error("Primary keys is null or empty.");
            return null;
        }
        let key = "";
        for (let i = 0; i < primaryKeys.length; i++) {
            key = key + dataItem[primaryKeys[i]];
        }
        return key;
    }
    reload() {
        this.loading.loadData();
    }
    render() {
        return react_1.default.createElement(loading_1.Loading, { loadData: () => this.props.dataSource.select(), ref: e => this.loading = e || this.loading },
            react_1.default.createElement(loading_1.LoadingData.Consumer, null, args => {
                let data = args.data;
                return react_1.default.createElement(react_1.default.Fragment, null, data.dataItems.map((o, i) => {
                    let key = this.dataItemKey(o) || i;
                    return react_1.default.createElement(exports.RepeaterItem.Provider, { value: { dataItem: o, index: i, count: data.dataItems.length }, key: key }, this.props.children);
                }));
            }));
    }
}
exports.Repeater = Repeater;
Repeater.contextType = loading_1.LoadingData;
