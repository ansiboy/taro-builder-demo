import { DataSource } from "maishu-toolkit";
import { services } from "./index";
import { ReceiptInfo, Product } from "../models/models";

export let dataSources = {
    receiptInfo: new DataSource<ReceiptInfo>({
        primaryKeys: ["Id"],
        select: async () => {
            let items = await services.shopping.receiptInfos();
            return { dataItems: items, totalRowCount: items.length };
        },
        async insert(item) {
            return services.shopping.saveReceiptInfo(item);
        },
        async update(item) {
            return services.shopping.saveReceiptInfo(item);
        }
    }),
    product: new DataSource<Product>({
        select: async (args) => {
            let r = await services.shopping.products();
            return { totalRowCount: r.length, dataItems: r };
        }
    })
}