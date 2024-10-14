# Gitの便利コマンドを覚える
## 課題1

### 特定のcommitとの差分

```diff
❯ git diff 2b73dcf4d1a86f3af332f546cbed5c876a612568
diff --git "a/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md" "b/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
new file mode 100644
index 0000000..8d095a6
--- /dev/null
+++ "b/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
@@ -0,0 +1,5 @@
+# Gitの便利コマンドを覚える
+## 課題1
+
+### 特定のcommitとの差分
+
```

### 差分があるファイル名だけを一覧表示

```sh
❯ git diff --name-only

"7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"

```

### 部分的に選択しながらステージング

```sh
❯ git add -p 7_チーム開発/Gitの便利コマンドを覚える/README.md
diff --git "a/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md" "b/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
index 8d095a6..9e7a3d1 100644
--- "a/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
+++ "b/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
@@ -3,3 +3,18 @@
 
 ### 特定のcommitとの差分
 
+```diff
+❯ git diff 2b73dcf4d1a86f3af332f546cbed5c876a612568
+diff --git "a/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md" "b/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
+new file mode 100644
+index 0000000..8d095a6
+--- /dev/null
++++ "b/7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"
+@@ -0,0 +1,5 @@
++# Gitの便利コマンドを覚える
++## 課題1
++
++### 特定のcommitとの差分
++
+```
+
(1/1) Stage this hunk [y,n,q,a,d,e,?]?
```

### 一時的に変更内容を退避

```sh
❯ git stash
Saved working directory and index state WIP on main: e4817b4 init Gitの便利コマンドを覚える
```

※ 最新のstashを復元

```sh
❯ git stash pop
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   "7_\343\203\201\343\203\274\343\203\240\351\226\213\347\231\272/Git\343\201\256\344\276\277\345\210\251\343\202\263\343\203\236\343\203\263\343\203\211\343\202\222\350\246\232\343\201\210\343\202\213/README.md"

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (677c9489d5cc105027578444dccf27b8eea9f99d)
```

### 特定のファイルのコミット履歴

```sh
❯ git log -- 7_チーム開発/アジャイル開発を学ぼう/README.md
commit 2b73dcf4d1a86f3af332f546cbed5c876a612568
Author: Shota Furuno <76472239+UR-deR@users.noreply.github.com>
Date:   Mon Oct 14 16:41:58 2024 +0900

    課題2に回答

commit 4f64e0f581972605b3df84a626cff8dccf8a661f
Author: Shota Furuno <76472239+UR-deR@users.noreply.github.com>
Date:   Mon Oct 14 15:20:30 2024 +0900

    課題1に回答

commit 4cffb51fc722a6d29580c64f3e120e1199436acd
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Mon Oct 14 08:11:20 2024 +0900

    init アジャイル開発を学ぼう
```

### 複数コミットを一つにまとめる

**まとめる前**

```sh
❯ git log -- .gitignore 
commit c9ba6d261247148811ba63f9ed18c9b8b613aacc (HEAD -> git-test)
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Mon Oct 14 18:41:31 2024 +0900

    add piyo

commit c21b41de478b5453564da91395a5e8565e5f16a8
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Mon Oct 14 18:41:18 2024 +0900

    add fuga

commit 26834a8c11025fa30059d8c307e8134ea82b130a
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Mon Oct 14 18:41:06 2024 +0900

    add hoge

commit e43a707d4b8889b3350f97d56f397fe71019a583
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Fri Feb 23 09:26:40 2024 +0900

    fix dependencies to run localhost

commit 8fced3d0037b63e29467339d592e78d0c20e39ce
Author: axtx4869 <shota.furuno@claves.co.jp>
Date:   Thu Nov 16 19:07:09 2023 +0900

    Add .gitignore for /data directory
```

**まとめる**

```sh
❯ git rebase -i HEAD~3
hint: Waiting for your editor to close the file...
```

<img width="780" alt="スクリーンショット 2024-10-14 18 45 52" src="https://github.com/user-attachments/assets/fcc5df1e-5d43-4961-806f-804d9f527603">


**まとめた後**

```sh
❯ git log -- .gitignore
commit caf29b55666f6308e19201e196ef5b0c22617f67 (HEAD -> git-test)
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Mon Oct 14 18:41:06 2024 +0900

    add hoge, fuga, piyo

commit e43a707d4b8889b3350f97d56f397fe71019a583
Author: UR-deR <shota.furuno@claves.co.jp>
Date:   Fri Feb 23 09:26:40 2024 +0900

    fix dependencies to run localhost

commit 8fced3d0037b63e29467339d592e78d0c20e39ce
Author: axtx4869 <shota.furuno@claves.co.jp>
Date:   Thu Nov 16 19:07:09 2023 +0900

    Add .gitignore for /data directory
```

### 新たなブランチの作成

```sh
❯ git checkout -b new-branch
Switched to a new branch 'new-branch'
```

or 

```sh
❯ git switch -c swith-new-branch
Switched to a new branch 'swith-new-branch'
```

### 最新コミットだけクローンする

```sh
git clone --depth 1 https://github.com/example/repo.git
```

shallow cloneと呼ぶらしい。  
[Git - git-clone Documentation](https://git-scm.com/docs/git-clone#Documentation/git-clone.txt-code--depthcodeemltdepthgtem)

### マージを中断する

```sh
git merge --abort
```

コンフリクト発生時のみ使用可能。
