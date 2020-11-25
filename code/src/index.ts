import Jenkins from 'jenkins'
import xmlbuilder from 'xmlbuilder'
// jenkins 实例化
// url: 用户名:密码@
const jenkins = Jenkins({baseUrl:'http://admin:admin@123@localhost:8080',crumbIssuer:true})

// jenkins.info((err,data)=>{
//     if(err){
//         console.log('err',err);
//         return;
//     }
//     console.log(data)
// })

var obj = {
    project: {
        //描述
      description: {
          '#text': 'git://github.com/oozcitak/xmlbuilder-js.git' // text node
      },
      properties:{
          'com.coravy.hudson.plugins.github.GithubProjectProperty':{
            projectUrl:{
                '#text':"https://github.com/slashare/back-end-b.git"
            },
            displayName:{
                '#text':'测试'
            }
          }
      },
      // github 账号配置
      scm:{
        '@class':'hudson.plugins.git.GitSCM',
          userRemoteConfigs:{
              'hudson.plugins.git.UserRemoteConfig':{
                  url:{
                    '#text':"https://github.com/slashare/back-end-b.git"
                  },
                  credentialsId:{
                    '#text':"48e6b61f-62d0-4a4d-b02d-f8b3d5042583"
                  }
              }
          },
          branches:{
              'hudson.plugins.git.BranchSpec':{
                  name:{
                    '#text':"*/dev"
                  }
              }
          }
      },
      // 出发器
      triggers:{
          'hudson.triggers.SCMTrigger':{
              spec:{

              },
              ignorePostCommitHooks:{
                  '#text':false
              }
          }
      }
    }
  };
  var xml = xmlbuilder.create(obj).end({ pretty: true});
   console.log(xml)
  jenkins.job.create("test1",xml,(err)=>{
      console.log(err)
  })