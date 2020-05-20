import React from "react";
import "../components";
import { PageData, Page } from "taro-builder-core";
import { services } from "../services";
import { Empty } from "../data-controls";
import { View } from "@tarojs/components";
import { Menu } from "../components";
import { parseUrl } from "maishu-toolkit";
import Picture from "../components/picture";

interface Props {
    tid: string
}

interface State {
    pageData: PageData | null | undefined
}

export class PageView extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        let params = parseUrl(this.props.tid)
        this.state = { pageData: undefined }
        let id = params.id || "66ca8aea-12d7-0d8e-1a70-7e2e6770953f";
        services.page.getPageRecord(id)
            .then(r => {
                if (r)
                    this.setState({ pageData: r.pageData });
                else
                    this.setState({ pageData: null })
            })
    }

    onScrollToUpper() { }

    // or 使用箭头函数
    // onScrollToUpper = () => {}

    onScroll(e) {
        console.log(e.detail)
    }

    render() {
        let { pageData } = this.state;
        if (pageData === undefined) {
            return <Empty text="数据正在加载中..." icon="" />
        }
        else if (pageData === null) {
            return <Empty text="页面不存在" icon="" />
        }

        return <>
            <Picture source="https://shop6.bailunmei.com/image/image?id=8811e0c5-b929-1bf1-616a-8384212d2941_1024_768&width=200&height=200" />
            <Page pageData={pageData} />
        </>
    }
}

export default PageView;