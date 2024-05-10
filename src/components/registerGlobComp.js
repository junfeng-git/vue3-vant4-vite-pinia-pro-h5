// vant ui 库的组件
import {
  Button, Swipe,
  SwipeItem,
  Skeleton,
  SkeletonTitle,
  SkeletonImage,
  SkeletonAvatar,
  SkeletonParagraph,
  Tabbar, TabbarItem,
  Icon,
  NavBar,
  Tab, Tabs, Empty,
  Sidebar, SidebarItem,
  IndexBar, IndexAnchor,
  Cell, CellGroup,
  Loading,
  ShareSheet,
  ImagePreview,
  ActionBar, ActionBarIcon, ActionBarButton
} from 'vant';

// 自定义的组件 - 注册全局组件
import { JNavBar } from './globalComponents/NavBar';
import { TabBar } from './globalComponents/TabBar';
import { VideoPlayer } from './globalComponents/VideoPlayer';
import { SvgIcon } from './globalComponents/SvgIcon';
import { TabNav } from './globalComponents/TabNav';
import { NoData } from './globalComponents/NoData';

const compList = [JNavBar, TabBar, VideoPlayer, SvgIcon, TabNav, NoData];

// vant ui 库的组件 - 注册全局组件
export function registerGlobComp(app) {
  compList.forEach((comp) => {
    app.component(comp.name, comp);
  });

  app.use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(Skeleton)
    .use(SkeletonTitle)
    .use(SkeletonImage)
    .use(SkeletonAvatar)
    .use(SkeletonParagraph)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Icon)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(Empty)
    .use(Sidebar)
    .use(SidebarItem)
    .use(IndexBar)
    .use(IndexAnchor)
    .use(Cell)
    .use(CellGroup)
    .use(Loading)
    .use(ShareSheet)
    .use(ImagePreview)
    .use(ActionBar)
    .use(ActionBarIcon)
    .use(ActionBarButton)
}
