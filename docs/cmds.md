
## Install (some requirements)
   
* Local
```
  npm install rimraf -g
  rimraf node_modules dist
  npm install --save-dev @angular/cli@latest
  npm install
```

* Global
```
  npm uninstall -g @angular/cli
  npm cache clean
  npm install -g @angular/cli@latest
```

## Deploy (with gh-pages)

* Install gh pages plugin globally
  - https://github.com/tschaub/gh-pages
  ```  
  npm install -g gh-pages
  ```

* Build the deployable artifacts
  ```
  ng build --base-href https://github.com/dandohotaru/labs.beers/
  copy dist/index.html dist/404.html
  gh-pages -d dist
  ```