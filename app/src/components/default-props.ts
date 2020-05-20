import { Props as CarouselProps } from "./carousel";
import { Props as MenuProps } from "./menu";
import { Props as CategoryProductsProps } from "./category-products";
import { allProductParts, ProductPrice, ProductBuyButton } from "./product/product-parts";
import { ProductItemProps } from "./product/product-item";
import { guid } from "maishu-toolkit";

let carousel: CarouselProps = { autoplay: true, items: [], clickType: "openPage" };
let menu: MenuProps = { items: [], showMenuIcon: false };

export let defaultProductParts: ProductItemProps["productParts"] =
    allProductParts.filter(o => o.type == "ProductPrice" || o.type == "ProductBuyButton")
        .map(o => Object.assign(o, { id: guid() }));

let productItem = { productParts: defaultProductParts };

let categoryProducts: CategoryProductsProps = { categories: [], productParts: defaultProductParts };
export let defaultProps = {
    carousel, menu, categoryProducts, productItem,
}