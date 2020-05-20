import { DataSource } from "maishu-toolkit"
import { LocalService } from "./local-service"
import { errorHandle } from "maishu-chitu-admin/static"

let s = new LocalService(err => errorHandle(err));
let pageDataSource = new DataSource({
    select: async (args) => {
        let r = await s.pageRecordList(args);
        return r;
    }
})
export let dataSources = {
    page: pageDataSource
}