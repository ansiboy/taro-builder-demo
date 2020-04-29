export declare interface Props {
    /** 商品来源 */
    productSourceType: 'category' | 'custom' | 'all',
    /** 图片大小 */
    imageSize: "small" | "medium" | "large",
    /** 商品名称行数 */
    productNameLines: 'singleLine' | 'doubleColumn',
    /** 选取要展示的商品编号 */
    productIds?: string[],
    /** 商品数量 */
    productsCount: number,
    /** 商品类别 */
    categoryId?: string,
    /** 显示商品类别 */
    showCategories: boolean,
}

export declare interface Product {

}