import React from "react";
import { Empty } from "./empty";
import { View } from "@tarojs/components";
import "./loading.scss";

interface LoadingProps<T> {
    loadData: () => Promise<T>
}

interface LoadingState<T> {
    data?: T
    status: "loading" | "success" | "fail" | "empty"
    error?: Error
}

export let LoadingData = React.createContext<{ data: any }>({ data: null });

export class Loading<T> extends React.Component<LoadingProps<T>, LoadingState<T>> {
    constructor(props) {
        super(props);
        this.state = { status: "loading" };
    }
    loadData() {
        this.setState({ status: "loading" })
        this.props.loadData().then(r => {
            if (r == null || (Array.isArray(r) && r.length == 0)) {
                this.setState({ status: "empty" });
                return;
            }

            this.setState({ data: r, status: "success" });
        }).catch(err => {
            this.setState({ status: "fail", error: err });
        })
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        let { status, data, error } = this.state;
        let main: JSX.Element;
        switch (status) {
            case "loading":
                main = <View className="loading">数据正在加载中...</View>
                break;
            case "fail":
                main = <View className="fail" onClick={() => this.loadData()}>
                    数据加载失败，点击重新加载
                <View className="title">错误信息</View>
                    <View className="detail">
                        {error?.message}
                    </View>
                </View>
                break;
            case "empty":
                main = <Empty icon="file-generic" text="暂无数据" />
                break;
            case "success":
                main = <View style={{ paddingTop: 0 }}>
                    <LoadingData.Provider value={{ data }}>
                        {this.props.children}
                    </LoadingData.Provider>
                </View>
                break;
            default:
                main = <View>
                    Unkonown status {status}.
                </View>

        }
        return <View className="loading-control">
            {main}
        </View>
    }
}