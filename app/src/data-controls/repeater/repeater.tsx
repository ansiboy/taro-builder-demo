import React from "react";
import { DataSource, DataSourceSelectResult } from "maishu-toolkit";
import { Loading, LoadingData } from "../loading";

interface Props<T> {
    dataSource: DataSource<T>
}

export let RepeaterItem = React.createContext({ dataItem: null as any, index: -1, count: -1 })
export let RepeaterEmtpy = React.createContext({});

export class Repeater<T> extends React.Component<Props<T>> {
    private loading: Loading<DataSourceSelectResult<T>>;
    constructor(props: Props<T>) {
        super(props);
        this.state = {};
    }
    dataItemKey(dataItem: any) {
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
    children() {
        let children: React.ReactNode[] = [];
        if (this.props != null) {
            children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        }
        return children as React.ReactElement[];
    }
    render() {
        return <Loading<DataSourceSelectResult<T>> loadData={() => this.props.dataSource.select()}
            ref={e => this.loading = e || this.loading}>
            <LoadingData.Consumer>
                {args => {
                    let data = args.data as DataSourceSelectResult<T>;
                    let children = this.children().filter((o: React.ReactElement) => o.type == RepeaterEmtpy.Consumer);
                    if (data.dataItems.length == 0) {
                        return <RepeaterEmtpy.Provider value={{}}>
                            {children}
                        </RepeaterEmtpy.Provider>
                    }
                    return <React.Fragment>
                        {data.dataItems.map((o, i) => {
                            let key = this.dataItemKey(o) || i;
                            let children = this.children().filter((o: React.ReactElement) => o.type == RepeaterItem.Consumer);
                            return <RepeaterItem.Provider value={{ dataItem: o, index: i, count: data.dataItems.length as number }} key={key}>
                                {children}
                            </RepeaterItem.Provider>
                        })}
                    </React.Fragment>
                }}
            </LoadingData.Consumer>
        </Loading>
    }
}

Repeater.contextType = LoadingData;