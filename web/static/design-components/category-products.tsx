import BaseCategoryProducts, { Props, Category } from "app/components/category-products";
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

    private findCategory(items: Category[], id: string) {
        let s = [...items];
        while (s.length > 0) {
            let item = s.pop();
            if (item.id == id)
                return item;

            s.push(...item.children || [])
        }
    }

    //========================================================
    // 设计时支持
    componentWillReceiveProps(props: Props) {
        let isChanged = !deepEqual(this.originalProps, props)
        if (isChanged) {

            let currentCategory = this.currentCategory(props);
            let originalCategory = this.findCategory(this.originalProps.categories, currentCategory.id);//(this.originalProps.categories || []).filter(o => o.id == currentCategory.id)[0] || {} as Category;

            let c1: Partial<Category> = {
                source: currentCategory.source,
                categoryId: currentCategory.categoryId,
                productIds: currentCategory.productIds,
            };
            let c2: Partial<Category> = {
                source: originalCategory.source,
                categoryId: originalCategory.categoryId,
                productIds: originalCategory.productIds
            }
            let categoryToLoadChanged = !deepEqual(c1, c2);
            if (categoryToLoadChanged) {
                setTimeout(() => {
                    this.repeater.reload();
                }, 100);
            }

            this.copyProps(props);
        }
    }
    //========================================================
}