import { Callback } from "maishu-toolkit";
import { ReceiptInfo } from "./models/models";

export let events = {
    receiptInfoSave: Callback.create<{ item: ReceiptInfo }>()
}