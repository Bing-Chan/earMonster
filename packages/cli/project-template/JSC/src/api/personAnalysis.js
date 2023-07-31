import service from "@/utils/service";
import { head } from "lodash";

//获取折线图数据
export function queryTrend(data) {
 
  return service({
    url: "/ps/linechart",
    method: "post",
    data: data // body参数
  });
}



//列表（下钻）
export function queryList(data) {
   
    return service({
      url: "/ps/details",
      method: "post",
      data: data // body参数
    });
  }


  //饼形图
  export function querySource(data) {
    return service({
      url: "/ps/piechart",
      method: "post",
      data: data // body参数
    });
  };


  //饼形图上部tab切换

 getTabData(headerTypeTypeList,dimensionTypeTypeList){
    var params={};
     params.head=headerTypeTypeList
     params.dimension=dimensionTypeTypeList
    
     //入职情况下，全部操作类职能类，饼形图上部tab 切换规则
    if(params.head=="1" && params.dimension=="1"){

      chartTabList= [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "work",
          label: "工龄"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "degree",
          label: "学历"
        },
        {
          value: "sex",
          label: "性别"
        },
        {
          value: "recruitment",
          label: "职级"
        }
      ]
    }
    if(params.head=="1" && params.dimension=="2"){
      chartTabList= [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "gwlx",
          label: "岗位类型"
        },
        {
          value: "work",
          label: "工龄"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "degree",
          label: "学历"
        },
        {
          value: "sex",
          label: "性别"
        }
      ]
    }
    if(params.head=="1" && params.dimension=="3"){
      chartTabList= [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "work",
          label: "工龄"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "degree",
          label: "学历"
        },
        {
          value: "sex",
          label: "性别"
        },
        {
          value: "zj",
          label: "职级"
        }
      ]
    }
     //在职情况下，全部操作类职能类，饼形图上部tab 切换规则
    if(params.head=="2"&& params.dimension=="1"){
      chartTabList= [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "recruitment",
        label: "招聘来源"

      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
     ]

    }
    if(params.head=="2"&& params.dimension=="2"){
      chartTabList= [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "recruitment",
        label: "招聘来源"

      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
     ]

    }
    if(params.head=="2"&& params.dimension=="3"){
      chartTabList= [
      {
        value: "all",
        label: "全部"
      },
      {
        value: "recruitment",
        label: "招聘来源"

      },
      {
        value: "work",
        label: "工龄"
      },
      {
        value: "age",
        label: "年龄"
      },
      {
        value: "degree",
        label: "学历"
      },
      {
        value: "sex",
        label: "性别"
      },
      {
        value: "zj",
        label: "职级"
      }
     ]

    }
     //离职情况下，全部操作类职能类，饼形图上部tab 切换规则
    if(params.head=="3"&& params.dimension=="1"){
      chartTabList= [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "lzyy",
          label: "离职原因"

        },
        {
          value: "work",
          label: "工龄"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "degree",
          label: "学历"
        },
        {
          value: "sex",
          label: "性别"
        },
        {
          value: "zj",
          label: "职级"
        }
     ]

    }
    if(params.head=="3"&& params.dimension=="2"){
      chartTabList= [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "lzyy",
          label: "离职原因"

        },
        {
          value: "work",
          label: "工龄"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "degree",
          label: "学历"
        },
        {
          value: "sex",
          label: "性别"
        },
        {
          value: "zj",
          label: "职级"
        }
     ]

    }
    if(params.head=="3"&& params.dimension=="3"){
      chartTabList= [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "lzyy",
          label: "离职原因"

        },
        {
          value: "work",
          label: "工龄"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "degree",
          label: "学历"
        },
        {
          value: "sex",
          label: "性别"
        },
        {
          value: "zj",
          label: "职级"
        }
     ]

    }


  };
//饼形图下切换
  getBtData(val){
     var params={};
    params.tabval=val
    //饼形图上部tab 为全部，下部tab切换规则
    if(params.tabval=="all"){
      chartTabListB=[
        {
          value: "e0",
          label: "全部"
        },
        {
          value: "e1",
          label: "合同工"
        },
        {
          value: "e2",
          label: "明亮类"
        },
        {
          value: "e3",
          label: "劳务工"
        },
        {
          value: "e4",
          label: "其他"
        },
        
      ]
    }
   //饼形图上部tab 为职级，下部tab切换规则
    if(params.tabval=="zj"){
      chartTabListB=[
        {
          value: "M",
          label: "M岗"
        },
        {
          value: "T",
          label: "T岗"
        },
        {
          value: "P",
          label: "P岗"
        },
        {
          value: "O",
          label: "O岗"
        },
        
        
      ]
    }
   //饼形图上部tab 为离职原因，下部tab切换规则 
    if(params.tabval=="lzyy"){
      chartTabListB=[
        {
          value: "l1",
          label: "健康欠佳及家庭生活因素"
        },
        {
          value: "l2",
          label: "工作氛围不佳，福利活动少"
        },
        {
          value: "l3",
          label: "工作强度大，工作时间长"
        },
        {
          value: "l4",
          label: "中心现场管理问题"
        },
        {
          value: "l5",
          label: "职业发展受限"
        },
        {
          value: "l6",
          label: "缺乏绩效激励，涨薪难"
        },
        {
          value: "l7",
          label: "食宿交通工作环境不佳"
        },
        
        
      ]
    }
     
   
  }


  