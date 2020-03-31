import React from "react";
import { View } from "@tarojs/components";
import { DataSource } from "maishu-toolkit";
import "./data-list.scss";

interface Props<T> {
    dataSource: DataSource<T>
}

interface State<T> {
    status: "loading" | "success" | "fail",
    dataItems: T[],
    error?: Error,
}

export let DataListContext = React.createContext({ dataItem: null as any, index: -1, count: -1 })

export class DataList<T> extends React.Component<Props<T>, State<T>> {
    constructor(props: Props<T>) {
        super(props);
        this.state = { status: "loading", dataItems: [] };
    }
    componentDidMount() {
        this.loadData();
        this.props.dataSource.inserted.add(args => {
            let { dataItems } = this.state;
            dataItems.push(args.dataItem);
            this.setState({ dataItems });
        })
        this.props.dataSource.updated.add(args => {
            console.assert(args.sender.primaryKeys.length == 1);
            let key = args.sender.primaryKeys[0];
            let { dataItems } = this.state;
            let dataItem = dataItems.filter(o => o[key] == args.dataItem[key])[0];
            if (dataItem) {
                Object.assign(dataItem, args.dataItem);
                this.setState({ dataItems });
            }
        })
        this.props.dataSource.error.add(args => {
            this.setState({ status: "fail", error: args.error });
        })
    }
    loadData() {
        this.props.dataSource.select().then(r => {
            this.setState({ status: "success", dataItems: r.dataItems || [] });
        })
    }
    dataItemKey(dataItem: any) {
        let primaryKeys = this.props.dataSource.primaryKeys;
        let key = "";
        for (let i = 0; i < primaryKeys.length; i++) {
            key = key + dataItem[primaryKeys[i]];
        }
        return key;
    }
    render() {
        let { status, dataItems, error } = this.state;
        if (status == "loading") {
            return <View className="loading">数据正在加载中...</View>
        }
        if (status == "fail") {
            return <View className="fail" onClick={() => this.loadData()}>
                数据加载失败，点击重新加载
                <View className="title">错误信息</View>
                <View className="detail">
                    {error?.message}
                </View>
            </View>
        }

        return <React.Fragment>
            {dataItems?.map((o, i) => {
                let key = this.dataItemKey(o);
                console.log(key);
                return <DataListContext.Provider value={{ dataItem: o, index: i, count: dataItems?.length as number }} key={key}>
                    {this.props.children}
                </DataListContext.Provider>
            })}
        </React.Fragment>
    }
}