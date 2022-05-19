//app.js 
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options) {

  },
  appData: {
    hasLogin: false,
    token: null,
    userInfo:null,
    userId:null,
    matchnames: ['','蓝桥杯', '大学生创新创业项目', '计算机设计大赛','ACM国际大学生程序设计竞赛', '力扣竞赛','Hackathon','Kaggle','华为软件精英挑战赛','全国高校计算机能力挑战赛','阿里天池竞赛'],
  },
  onShow: function(options) {

  },
  onHide: function() {

  },
  onError: function(msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options) {

  }
});
