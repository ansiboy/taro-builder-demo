import { SingleColumnProducts, Props } from "app/components/single-column-products";
import { component } from "taro-builder-core";
import { deepEqual } from "maishu-toolkit";

@component({ type: "SingleColumnProducts" })
export default class DesignSingleColumnProducts extends SingleColumnProducts {
    private originalProps: Props;

    constructor(props: Props) {
        super(props)

        this.copyProps(props)
    }

    private copyProps(props: Props) {
        this.originalProps = JSON.parse(JSON.stringify(props));

    }

    //========================================================
    // 设计时支持
    componentWillReceiveProps(props: Props) {
        // let isChanged = props.productsCount != self.props.productsCount || props.showCategories != self.props.showCategories;
        let isChanged = !deepEqual(this.originalProps, props)
        if (isChanged) {
            this.copyProps(props);
            setTimeout(() => {
                this.repeater.reload();
            }, 100);
        }
    }
    //========================================================
}