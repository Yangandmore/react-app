React app
---
自用react小型框架，添加记录与使用心得方便后续查看。

## 技术加入
* [x] es6
* [x] react
* [x] redux
* [x] redux-storage
* [x] immutable
* [x] react-router-dom
* [x] fetch
* [x] eslint && prettier
* [ ] history
* [ ] 加密
* [ ] 版本控制
* [x] 刷新控制

#### local storage

###### 黑白名单配置
  通过数组的方式配置白名单，当需要控制的深层节点时，可以将节点增加至数组中即可。
* 1.whitelisted-key:白名单
* 2.blacklisted-key:黑名单
```
project/src/store.js

// 白名单
// 黑名单
// 多层数组表示嵌套
engine = filter(engine, ['whitelisted-key', ['main']], ['blacklisted-key', ['user', 'data']]);
```


#### 生命周期
由于自身原因并没有使用函数组件(Hooks)封装开发。  
***注意：使用getDerivedStateFromProps()函数，代替componentWillReceiveProps()函数。***  
![github](https://yangandmore.github.io/img/ReactLifecycle/1.png)
***注意：如果在使用action调用redux时，出现了两次调用钩子函数，需要注意去除strictMode，开发环境故意为之。***
[问题---->](https://link.zhihu.com/?target=https%3A//github.com/facebook/react/issues/17786)

#### redux

###### action

将文件添加至**redux**中，模仿**main**即可。

* index.js:添加redux全部配置工作。
* api.js:添加redux中需要的api访问的接口。

```
const mainAction = {};
mainAction.actionLocalTest = createAction(LOCAL_TEST, 'data');
mainAction.actionApiTest = createActionAsync(API_TEST, testApi);
```

###### reducer
action请求后的数据会到这边处理：
```
const defaultState = fromJS({
  ...
});
const mainReducer = createReducer({
  ...
}, defualtState);
```

处理方式分别针对**createAction**和**createActionAsync**两种action。
```
// createAction
[LOCAL_TEST](state, action) {
  return state.merge({
    ...
  });
},
// createAction
[API_TEST](state, action) {
  return {
    REQUEST() {
        ...
    },
    SUCCESS() {
        ...
    },
    FAILURE() {
        ...
    },
  };
},
```

###### selection
将数据返回的数据进行合并、拆封等操作，也有利于数据流复用后的统一管理。
```
// 配置一级拆分
const select = (state) => state.get('main');
const mainSelect = {};
// 配置当前reducer下的拆分
mainSelect.dataSelect = createSelector(select, (state) => {
  return state.get('data');
});
```
完成后在**container**中使用。
```
const mapStateToProps = (state) => ({
  data: mainSelect.dataSelect(state),
});
export default connect(mapStateToProps)(Main);
```
###### dispatch
完成上述配置后即可使用
```
import { connect } from 'react-redux';
...

this.props.dispatch(mainAction.actionXXX(...));

...

const mapStateToProps = (state) => ({
  data: mainSelect.dataSelect(state),
});
export default connect(mapStateToProps)(Main);
```

###### 关于Props、State、Redux三种在项目下的抉择使用
> 1.State更趋向于当前组件下的本身的状态。  
> 2.此处的Props分为两个部分：父组件传递数据和Redux中返回的状态。因此在使用的时候需要合理区分。  
> 3.区分的方案:是否牵扯到当前组件的数据相关性的props建议从**getDerivedStateFromProps()**函数中将其转换为State来使用。1.数据相关性更接近UI数据，方便本地state管理；2.反向考虑更没有接近UI数据，减少本地state的数据量，这些数据从props中获取提高数据类型隔离。  
> 4.redux是否真的需要？并不是所有的组件都需要他，react自身的状态管理能够满足组件之间的交互。更将他接近与项目数据管理库。  


