"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const empty_1 = require("./empty");
exports.LoadingContext = taro_1.default.createContext({ data: null });
class Loading extends taro_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { status: "loading" };
    }
    loadData() {
        this.setState({ status: "loading" });
        this.props.loadData().then(r => {
            this.setState({ data: r, status: "success" });
        }).catch(err => {
            this.setState({ status: "fail" });
        });
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        let { status, data } = this.state;
        if (status == "fail") {
            return <empty_1.Empty icon="close" text="数据加载失败, 点击重新加载" onClick={() => this.loadData()}/>;
        }
        if (status == "loading") {
            return <empty_1.Empty icon="loading" text="数据正在加载中..."/>;
        }
        console.log(data);
        return <exports.LoadingContext.Provider value={{ data }}>
            {this.props.children}
        </exports.LoadingContext.Provider>;
    }
}
exports.Loading = Loading;
//# sourceMappingURL=loading.jsx.map