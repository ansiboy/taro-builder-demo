"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maishu_toolkit_1 = require("maishu-toolkit");
const index_1 = require("./index");
exports.dataSources = {
    receiptInfo: new maishu_toolkit_1.DataSource({
        primaryKeys: ["Id"],
        select: async () => {
            let items = await index_1.services.shopping.receiptInfos();
            return { dataItems: items, totalRowCount: items.length };
        },
        async insert(item) {
            return index_1.services.shopping.saveReceiptInfo(item);
        },
        async update(item) {
            return index_1.services.shopping.saveReceiptInfo(item);
        }
    })
};
//# sourceMappingURL=data-sources.js.map