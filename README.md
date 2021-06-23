# vue3-admin

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### use commitizen

1. npm install -g commitizen 安装 cz 工具
2. commitizen init cz-conventional-changelog --save --save-exact 初始化适配器
3. npm install --save-dev @commitlint/config-conventional 安装符合 Angular 风格的校验规则
4. npm install husky --save-dev 安装 huksy（git 钩子工具）
5. npm install conventional-changelog -D
   "version": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"
   生成 changelog 文件
6.  "cz": "git add -A && npx git-cz"  cz风格提交 
