import { Props as CarouselProps } from "./carousel";
import { Props as MenuProps } from "./menu";

let carousel: CarouselProps = { autoplay: true, items: [], clickType: "openPage" };
let menu: MenuProps = { items: [], showMenuIcon: false };
export let defaultProps = {
    carousel, menu
}