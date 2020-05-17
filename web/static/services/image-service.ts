import { Service } from "maishu-chitu-admin/static";
import { DataSourceSelectArguments, DataSourceSelectResult } from "maishu-wuzhui-helper";
import { pathContact } from "maishu-toolkit";
import { config } from "../config";

export let errors = {
    serviceUrlCanntNull(serviceName: string) {
        let msg = `Service '${serviceName}' base url can not null.`
        return new Error(msg)
    },
    unexpectedNullResult() {
        let msg = `Null result is unexpected.`
        return new Error(msg)
    },
    unexpectedNullValue(name: string) {
        let msg = `variable ${name} is unexpected null value.`
        return new Error(msg)
    },
    argumentNull(name: string) {
        let msg = `Arugment ${name} cannt null or empty.`
        return new Error(msg)
    },
    fieldNull<T>(field: keyof T, itemName: string) {
        let msg = `${itemName} ${field} cannt be null or empty`
        return new Error(msg)
    },
    instanceMessangerStart() {
        let msg = `Instance messanger is start.`
        return new Error(msg)
    },
    notSupportedInNode() {
        let msg = `Not implement in node environment.`
    }
}

export let settings = {
    noImageText: "暂无图片"
}

/** 图片服务，实现图片的上传，获取 */
export class ImageService extends Service {

    // static baseUrl: string

    protected url(path: string) {
        return pathContact(config.imageUrl, path);
    }

    get applicationId() {
        return config.applicationId;
    }

    /** 获取图片的 URL
     * @param id 图片的 ID
     * @param width 图片的宽度，如果不指定则为实际图片的宽度
     * @param height 图片的高度，如果不指定则为实际图片的高度
     */
    imageSource(id: string, width?: number, height?: number) {
        let isBase64 = id.startsWith('data:image')
        if (isBase64) {
            return id;
        }

        if (id != null && id.startsWith("http://"))
            return id;

        if (id != null && id.indexOf("/") >= 0)
            return pathContact(config.imageFileUrl, id);

        if (!id) {
            width = width == null ? 200 : width
            height = height == null ? 100 : height
            id = this.generateImageBase64(width, height, settings.noImageText)
            return id;
        }

        let url = this.url('image')
        url = `${url}?id=${id}`;
        if (width != null)
            url = url + `&width=${width}`

        if (height != null)
            url = url + `&height=${height}`

        return url
    }

    private generateImageBase64(width: number, height: number, text: string, options?: DrawOption): string
    private generateImageBase64(width: number, height: number, draw: CanvasDraw): string
    private generateImageBase64(width: number, height: number, obj: CanvasDraw | string, options?: DrawOption): string {
        if (document == null) {
            throw errors.notSupportedInNode()
        }

        var canvas = document.createElement('canvas');
        canvas.width = width; //img_width;
        canvas.height = height; //img_height;
        var ctx = canvas.getContext('2d');
        if (ctx == null) throw new Error('ccreate canvas context fail.')
        let draw = typeof obj == 'string' ? draws.text(obj, options) : obj;
        draw(ctx, width, height)

        return canvas.toDataURL();
    }

    private getImageSize(imageBase64: string) {
        if (!imageBase64) throw errors.argumentNull('imageBase64')
        return new Promise<{ width: number, height: number }>((resolve, reject) => {
            var i = new Image();
            i.onload = function () {
                resolve({ width: i.width, height: i.height })
            };

            i.src = imageBase64;
        })
    }

    /**
     * 对图片进行缩放
     * @param imageBase64 图片 base64 格式数据
     * @param width 目标图片的宽度
     * @param height 目标图片的高度
     */
    async resize(imageBase64: string, width: number, height: number): Promise<string> {

        if (!imageBase64) throw errors.argumentNull('imageBase64')
        if (!width) throw errors.argumentNull('width')
        if (!height) throw errors.argumentNull('height')

        var canvas = document.createElement('canvas') //.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        canvas.width = width
        canvas.height = height

        return await new Promise<string>((resolve, reject) => {
            var img = new Image()
            img.src = imageBase64
            img.onload = function () {
                // width = img.width
                // height = img.height
                if (ctx == null)
                    throw 'get canvas context fail'

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                resolve(canvas.toDataURL())
            }
        })
    }

    async list(args: DataSourceSelectArguments) {
        let url = this.url("list"); //`${ImageService.baseUrl}/list`;
        type T = { id: string, with: number, height: number };
        let result = await this.postByJson<DataSourceSelectResult<T>>(url, args);
        return result;
    }

    /**
     * 上传图片
     * @param imageBase64 图片的 base64 数据
     */
    async upload(imageBase64: string) {
        if (!imageBase64) throw errors.argumentNull('imageBase64')

        let url = this.url('upload')

        let imageSize = await this.getImageSize(imageBase64)
        let maxWidth = 800
        let maxHeight = 800
        if (imageSize.width > maxWidth) {// || imageSize.height > maxHeight
            let height = imageSize.height / imageSize.width * maxWidth
            imageBase64 = await this.resize(imageBase64, maxWidth, height)
        }
        else if (imageSize.height > maxHeight) {
            let width = imageSize.width / imageSize.height * maxHeight
            imageBase64 = await this.resize(imageBase64, width, maxHeight)
        }

        return this.postByJson<{ id: string }>(url, { image: imageBase64 })
    }

    /**
     * 
     * @param id 删除图片
     */
    async remove(id: string) {
        if (!id) throw errors.argumentNull('id')

        let url = this.url("remove")
        return this.postByJson(url, { id })
    }
}

export type CanvasDraw = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void
export type DrawOption = { fontSize?: number, bgColor?: string, textColor?: string };
let draws = {
    text: (imageText: string, options?: DrawOption): CanvasDraw => {

        return (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {

            // let fontSize1 = Math.floor(canvasHeight / 3 * 0.8);
            let fontSize = Math.floor((canvasWidth / imageText.length) * 0.6);
            let bgColor = 'whitesmoke';
            let textColor = '#999';
            // let fontSize = Math.min(fontSize1, fontSize2);

            options = options || {}

            ctx.fillStyle = options.bgColor || bgColor; //'whitesmoke';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // 设置字体
            ctx.font = `Bold ${options.fontSize}px Arial`;
            // 设置对齐方式
            ctx.textAlign = "left";
            // 设置填充颜色
            ctx.fillStyle = options.textColor || textColor; //"#999";

            let textWidth = fontSize * imageText.length;
            let startX = Math.floor((canvasWidth - textWidth) * 0.5);
            let startY = Math.floor((canvasHeight - (options.fontSize || fontSize)) * 0.3);
            // 设置字体内容，以及在画布上的位置
            ctx.fillText(imageText, startX, Math.floor(canvasHeight * 0.6));
        }
    }
};