import { MyService } from "./service";

interface PageRecord {
    id: string;

    name: string;

    pageData: any;

    createDateTime: Date;

    applicationId?: string;

    type: "system" | "snapshoot" | "page";
}

export class PageServie extends MyService {
    url(path: string) {
        return `http://127.0.0.1:5251/${path}`
    }
    async getPageRecord(id: string): Promise<PageRecord> {
        let r = await this.getByJson<PageRecord>(this.url("page-data/item"), { id });
        return r;
    }
}