import { ComponentData } from "maishu-jueying-core";
import React from "react";
import { Carousel } from "./carousel";
import { SingleColumnProducts } from "./single-column-products";

export { Carousel } from "./carousel";
export { SingleColumnProducts } from "./single-column-products";
export { StoreInfo } from "./store-info";

export function factory(componentData: ComponentData) {
    switch (componentData.name) {
        case "Carousel":
            return <Carousel {...componentData.props} />;
        case "SingleColumnProducts":
            return <SingleColumnProducts {...componentData.props} />
    }
}