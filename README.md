React app
---
小型框架

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

#### 生命周期
由于自身原因并没有使用函数组件(Hooks)封装开发。
[!github](https://yangandmore.github.io/img/ReactLifecycle/1.png)

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

* selection
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
* dispatch
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


