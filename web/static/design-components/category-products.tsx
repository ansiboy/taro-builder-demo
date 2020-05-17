import BaseCategoryProducts, { Props } from "app/components/category-products";
import { component } from "taro-builder-core";
import { deepEqual } from "maishu-toolkit";

@component({ type: "CategoryProducts" })
export default class CategoryProducts extends BaseCategoryProducts {
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