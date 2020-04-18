"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@tarojs/components");
const maishu_jueying_core_1 = require("maishu-jueying-core");
const react_1 = __importDefault(require("react"));
let Carousel = class Carousel extends react_1.default.Component {
    render() {
        return react_1.default.createElement(components_1.Swiper, { className: 'test-h', indicatorColor: '#999', indicatorActiveColor: '#333', vertical: true, circular: true, indicatorDots: true, autoplay: true },
            react_1.default.createElement(components_1.SwiperItem, null,
                react_1.default.createElement(components_1.View, { className: 'demo-text-1' }, "1")),
            react_1.default.createElement(components_1.SwiperItem, null,
                react_1.default.createElement(components_1.View, { className: 'demo-text-2' }, "2")),
            react_1.default.createElement(components_1.SwiperItem, null,
                react_1.default.createElement(components_1.View, { className: 'demo-text-3' }, "3")));
    }
};
Carousel = __decorate([
    maishu_jueying_core_1.component({ displayName: "轮播", icon: "icon-list-alt", introduce: "多张图片轮流播放" })
], Carousel);
exports.Carousel = Carousel;
//# sourceMappingURL=carousel.js.map