# How to view configs [wiki](http://confluence:8090/display/KIKLOS/Git+Setup)
### show all git settings and corresponding locations
```
git config --list --show-origin
```

# How to manage proxy 
### setup proxy
```
git config --global http.proxy http://proxyvip1:8080
```

### check proxy
```
git config --global --get http.proxy
```

### reset proxy
```
git config --global --unset http.proxy
```

# How to add configs
### create a project specific config, you have to execute this under the project's directory.
```
git config user.name "John Doe Project"
```

### create a global config for current user profile
```
git config --global user.name "John Doe Global"
```

### create a system config for current machine
```
git config --system user.name "John Doe System"
```

### cache credentials at repo level [wiki](https://help.github.com/articles/caching-your-github-password-in-git/)
```
git config credential.helper wincred
git config --global credential.helper wincred
```


# How to manage branches [wiki](https://www.atlassian.com/git/tutorials/using-branches)

### list branches
```
git branch
```

### create branch
```
git branch [name]

```

### publish branch
```
git push -u origin [name]
```

### delete branch
```
git branch -d [name]
```
or force delete
```
git branch -D [name]
```

### rename branch to [name]
```
git branch -m [name]
```

### checkout branch
```
git checkout [name]
```

### create and check out 
```
git checkout -b [name]
```