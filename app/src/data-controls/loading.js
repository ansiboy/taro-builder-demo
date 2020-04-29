"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const empty_1 = require("./empty");
const components_1 = require("@tarojs/components");
exports.LoadingData = react_1.default.createContext({ data: null });
class Loading extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { status: "loading" };
    }
    loadData() {
        this.setState({ status: "loading" });
        this.props.loadData().then(r => {
            if (r == null || (Array.isArray(r) && r.length == 0)) {
                this.setState({ status: "empty" });
                return;
            }
            this.setState({ data: r, status: "success" });
        }).catch(err => {
            this.setState({ status: "fail", error: err });
        });
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        let { status, data, error } = this.state;
        if (status == "loading") {
            return react_1.default.createElement(components_1.View, { className: "loading" }, "\u6570\u636E\u6B63\u5728\u52A0\u8F7D\u4E2D...");
        }
        if (status == "fail") {
            return react_1.default.createElement(components_1.View, { className: "fail", onClick: () => this.loadData() },
                "\u6570\u636E\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u65B0\u52A0\u8F7D",
                react_1.default.createElement(components_1.View, { className: "title" }, "\u9519\u8BEF\u4FE1\u606F"),
                react_1.default.createElement(components_1.View, { className: "detail" }, error === null || error === void 0 ? void 0 : error.message));
        }
        if (status == "empty") {
            return react_1.default.createElement(empty_1.Empty, { icon: "file-generic", text: "\u6682\u65E0\u6570\u636E" });
        }
        if (status == "success") {
            return react_1.default.createElement(components_1.View, { style: { paddingTop: 0 } },
                react_1.default.createElement(exports.LoadingData.Provider, { value: { data } }, this.props.children));
        }
        return react_1.default.createElement(components_1.View, null,
            "Unkonown status ",
            status,
            ".");
    }
}
exports.Loading = Loading;
