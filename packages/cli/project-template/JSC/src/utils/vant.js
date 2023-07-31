
import Vue from 'vue'
import { Search,Loading,Tab, Tabs,Calendar,Uploader,Icon,Card,Divider,Grid,GridItem,List,Image as VanImage,Cell,CellGroup,Sticky,Sidebar, SidebarItem,Col, Row,Form,Popup ,Field,Button,Collapse, Stepper,CollapseItem,Panel,Step, Steps,Swipe,SwipeItem,DatetimePicker,DropdownMenu, DropdownItem,Popover,ActionSheet,Picker} from 'vant';
import Fragment from 'vue-fragment' // 支持无根组件,解决某些场景
Vue.use(Search);
Vue.use(Loading);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Calendar);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Sticky);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Panel);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Stepper);
Vue.use(Popover);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
Vue.use(ActionSheet);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Fragment.Plugin)