## rebase：重设基础点

将当前的`branch`的基础点移动到目标分支。 这么做的好处是主干`master`明确。

```bash
git rebase <目标分支>
```

不过`rebase`之后master并没有跟随过去，需要再合并一下：

```bash
git checkout master
git merge <刚刚的分支>
```

这样master就和分支合并了。

## 刚刚的提交提错了，想要修改怎么办？

文件修改好之后使用 `--amend`，这会产生一个新的`commit`并替换掉最后一个`commit`

```bash
git add 文件
git commit --amend -m 说明
```

## 错了的是倒数第二个commit，不是最后一个commit，还能修改吗？

当然可以，这里可使用交互式`rebase`, 参数：`-i`

```bash
git rebase -i HEAD^^
```

这里的`^^`意思是后退几个`commit`，数量为`^`的数量,也可以写成`~2`,数字代表后退的数量。

回车之后，我们发现进入到了一个可编辑的页面，值得注意的是，上面的`commit`排序是倒叙的，我们可以看到每个`commit`前面有一个`pick`，我们按`i`进入编辑，把想要重新修改的commit前面的`pick`改成`edit`,退出界面之后我们可以看到状态就是在当前的`commit`上了，修改完成之后时候使用`--amend`提交，成功之后我们可以通过`git rebase --continue`来跳过不需要修改的`commit`，整个过程就结束了。

## diff：对比

用来对比修改。

```bash
git diff //对比工作区和暂存区
git diff --staged // 对比暂存区和上一次提交
git diff HEAD // 对比工作区和上一次提交
```

## 想要暂存工作区？

暂存并清空工作目录。

```bash
git stash
```

> [!WARNING]
-git stash并不会暂存你未追踪的文件，假如说你新建了一个文件，你还没有来得及add就stash，这个文件并不会存起来，想要把这些文件一起暂存使用-u。
-恢复文件请使用git stash pop命令。
> 

## 想要回滚commit?

`reset`可以重置`HEAD`和`branch`的位置

```bash
  git reset <分支名或SHA-1>
```

- `-mixed` 默认，把工作区和暂存区全部保存为工作区
- `-hard`：不保留工作区，你的工作区会被清空！！
- `-soft`：保留工作区和暂存区