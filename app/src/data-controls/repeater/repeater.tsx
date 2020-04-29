import React from "react";
import { DataSource, DataSourceSelectResult } from "maishu-toolkit";
import { Loading, LoadingData } from "../loading";
import "./repeater.scss";

interface Props<T> {
    dataSource: DataSource<T>
}

export let RepeaterItem = React.createContext({ dataItem: null as any, index: -1, count: -1 })

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
    render() {
        return <Loading<DataSourceSelectResult<T>> loadData={() => this.props.dataSource.select()}
            ref={e => this.loading = e || this.loading}>
            <LoadingData.Consumer>
                {args => {
                    let data = args.data as DataSourceSelectResult<T>;
                    return <React.Fragment>
                        {data.dataItems.map((o, i) => {
                            let key = this.dataItemKey(o) || i;
                            return <RepeaterItem.Provider value={{ dataItem: o, index: i, count: data.dataItems.length as number }} key={key}>
                                {this.props.children}
                            </RepeaterItem.Provider>
                        })}
                    </React.Fragment>
                }}
            </LoadingData.Consumer>
        </Loading>
    }
}

Repeater.contextType = LoadingData;