React app
---
小型框架

## 技术加入
* [x] react
* [x] redux
* [x] redux-storage
* [x] immutable
* [x] react-router-dom
* [x] fetch
* [x] eslint && prettier
* [ ] history

#### local storage
* 黑白名单配置
    通过数组的方式配置白名单，当需要控制的深层节点时，可以将节点增加至数组中即可。
    > whitelisted-key:白名单
    > blacklisted-key:黑名单
    ```
    project/src/store.js

    // 白名单
    // 黑名单
    // 多层数组表示嵌套
    engine = filter(engine, ['whitelisted-key', ['main']], ['blacklisted-key', ['user', 'data']]);
    ```

#### redux
* action
    将文件添加至**redux**中，模仿**main**即可。
    > index.js:添加redux全部配置工作。
    > api.js:添加redux中需要的api访问的接口。
    ```
    const mainAction = {};
    mainAction.actionLocalTest = createAction(LOCAL_TEST, 'data');
    mainAction.actionApiTest = createActionAsync(API_TEST, testApi);
    ```

* reducer
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
