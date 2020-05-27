0. 添加远端仓库

git remote add ${name} ${git location[ssh, https]}

1. 放弃修改

git checkout .  //全部
git checkout ${filename}

2. 本地新增了一堆文件(并没有git add到暂存区)，想放弃修改。
单个文件/文件夹：

$ rm filename / rm dir -rf

所有文件/文件夹：

$ git clean -xdf

// 删除新增的文件，如果文件已经已经git add到暂存区，并不会删除！

3. 本地修改/新增了一堆文件，已经git add到暂存区，想放弃修改。
单个文件/文件夹：

$ git reset HEAD filename

所有文件/文件夹：

$ git reset HEAD .

4. 本地通过git add & git commit 之后，想要撤销此次commit

$ git reset commit_id

这个id是你想要回到的那个节点，可以通过git log查看，可以只选前6位
// 撤销之后，你所做的已经commit的修改还在工作区！

$ git reset --hard commit_id

这个id是你想要回到的那个节点，可以通过git log查看，可以只选前6位
// 撤销之后，你所做的已经commit的修改将会清除，仍在工作区/暂存区的代码也将会清除！
