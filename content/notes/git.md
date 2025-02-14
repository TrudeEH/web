---
tags:
  - notes
  - programming
  - tools
author: TrudeEH
draft: false
showToc: true
title: Version Control [GIT]
---
Git is a version control system first developed by Linus Torvalds. It facilitates collaboration on large projects, keeps track of changes, and allows mistakes to be rolled back into a previous state.

## Configure Git

Git uses a hierarchy of configuration files:
- **System**: (`/etc/gitconfig`) Configuration for all users in a system.
- **Global**: (`~/.gitconfig`) Configure Git for all project of the current user.
- **Local**: (`.git/config`) Configure Git for the current project.
- **Worktree**: (`.git/config.worktree`) Configure part of a project.

```Shell
# Check if user name and email are set.
git config --get user.name
git config --get user.email
# If not, set those values.
git config --add --global user.name "username"
git config --add --global user.email "email@example.com"
git config --add --global init.defaultBranch main  # GitHub's default
git config --unset example.key      # Remove a configuration value
git config --unset-all example.key  # Remove all instances of a configuration key
git config --remove-section section # Remove an entire section
# Rebase on pull by default to keep a linear history
git config --global pull.rebase true
```

## Create a Repository

Git stores all project information in the `.git` directory. This includes branches, commits, and metadata.

```Shell
mkdir project && cd project
git init
```

## Status

A file can be in one of several states in a Git repository.
- `untracked`: Not being tracked by Git
- `staged`: Marked to be included in the next commit
- `committed`: Saved to the repository's history

```Shell
git status # Shows he state of a repository.
```

## Staging

Untracked files need to be indexed before being committed.

```Shell
git add filename.ext # Add a file
git add .            # Add every file in the current directory, recursively.
```

## Commit

A commit is a snapshot of the entire repository at a given point in time. Each commit has a message that describes the changes made in that commit.  
To commit all staged files:

```Shell
git commit -m "message"         # Commit all staged files
git commit --amend -m "message" # Replace the last commit's message
```

## Git Log

The `git log` command shows the history of commits in a repository. It provides information on who made a commit, when it was made, and what files were changed.  
Each commit also has a unique identifier (commit hash).  
For example, this is a valid commit hash: `46a4b5904d4ad737447052fed90c754ce8c616b6`.  
Since these identifiers are very long, they are often shortened to their first `7` characters (`46a4b59` in this example).

```Shell
git log                  # Show the log in an interactive pager
git --no-pager log -n 10 # Show the last 10 lines from the log, without using the pager
git log -1               # Fetch the header of the first commit
git log --decorate=full  # Shows the full pointer to a commit
git log --decorate=no    # Don't show branch names
git log --oneline        # Show each commit in a single line. ("compact" mode)
git reflog               # History of actions. Commits, clone, pull, etc.
```

## Git Diff

Show differences:

```Shell
git diff        # Differences between the working tree and the last commit
git diff HEAD~1 # Same, but includes the last commit and uncommitted changes
git diff COMMIT_HASH_1 COMMIT_HASH_2 # Differences between two commits
```

## Git Tags

A tag is a name linked to a commit that doesn't move between commits. Useful to mark versions.

```Shell
git tag                                 # List the current tag
git tag -a "tag name" -m "tag message"  # Add a new tag
git tag -a v3.10.2 -m "Fixed a lil bug" # Example marking a release
```

### Semantic Versioning (Semver)

Naming convention for versioning software.

```Plain
v3.12.5
 |  | |
 |  | Patch (safe bug fixes)
 |  Minor (safe features)
 Major (breaking changes)
```

## Branch

A Git branch allows you to keep track of different changes separately.

```Plain
    D - E  other_branch
  /
A - B - C  main
```

```Shell
git branch # Check which branches are available, and which one is selected
git branch -m oldname newname # Rename a branch
git branch my_new_branch      # Create a new branch
git switch -c my_new_branch   # Create a new branch and switch to it immediately
git switch branch_name        # Switch to an existing branch
git checkout branch_name      # Deprecated alternative to git switch
git branch -d branch_name     # Delete a branch
```

### Merge

After modifying a new branch, all commits performed on it can be merged into the main branch.

```Plain
A - B - C - F    main
   \     /
    D - E        other_branch
```

```Shell
git log --oneline --graph --all # Show an ASCII representation of the commit history
git log --oneline --decorate --graph --parents # Also display any parent branches
git merge branch_name            # Merge a branch into the current branch
```

### Rebase

After a branch is created, it might fall behind its origin. A rebase includes the new changes from the origin into the current branch, without leaving a merge message behind. While merging can often accomplish the same task, a rebase keeps history linear and makes it easier to read. It's recommended to use it on the main branch, for example, when updating smaller ones.  
Before a rebase, the commit history might have the following structure:

```Plain
A - B - C    main
   \
    D - E    feature_branch
```

After a rebase, the target branch is updated against its origin:

```Plain
A - B - C         main
         \
          D - E   feature_branch
```

```Shell
git rebase origin_name  # Rebase against the origin
```

> You should *never* rebase a public branch (like `main`) onto anything else, to not break commit history.

### Conflicts

If a modified is pushed to another branch where that same file has been modified as well, a conflict arises. These can be fixed manually by editing text, or using Git commands.

```Shell
git checkout --theirs path/to/file # Discard the current branch's changes and accept the target's changes
git checkout --ours path/to/file   # Discard the target changes and replace with the ones in the current branch
git reset --soft HEAD~1            # Undo an accidental conflict resolution
```

### Squash

Combine various commits into one:
1. Start an interactive rebase with the command `git rebase -i HEAD~n`, where `n` is the number of commits you want to squash.
2. Git will open your default editor with a list of commits. Change the word `pick` to `squash` for all but the first commit.
3. Save and close the editor.

> If the squashed commits already existed in the remote repository, it might be needed to push using: `git push origin main --force`.

### Stash

`git stash` saves the state of the current working directory and the index (staging area), then returns the repository to `HEAD`. This allows you to work on a different issue, and then resume your previous task.

```Shell
git stash
git stash -m "message" # It's also possible to stash with a message
git stash list  # List all stashes
git stash pop   # Apply the most recent stash to the working directory
git stash apply # Same as before, but doesn't delete the stash after applying
git stash drop  # Discard a stash without applying changes
git stash apply stash@{2} # Apply the third most recent stash
```

### Worktrees

The directory where the code tracked with Git lives. (And where the `.git` directory is located).  
Use instead of a `stash` if the current worktree is too busy, or for long-lived changes. This acts like cloning the repo again and working there, except it doesn't take up space on the host machine.  
Any change done on a linked worktree is reflected on the main one instantly. Think of it as a different view of the main worktree.

```Shell
git worktree list                  # Lists worktrees
git worktree add <path> [<branch>] # Create a worktree linked to the main one
git worktree remove WORKTREE_NAME  # Remove a worktree
git worktree prune                 # Remove an empty worktree if its directories were removed
```

### Bisect

Find a specific commit with binary tree search.  
For example, if trying to find a bug in 100 commits, `git bisect` allows it to be found with only `7` attempts.
1. `git bisect start`
2. Use: `git bisect good <commitish>` to select a commit where the bug wasn't introduced yet.
3. Select a commit where the bug exists using: `git bisect bad <commitish>`.
4. Git will checkout a commit between the good and bad commits for you to test to see if the bug is present.
5. Execute `git bisect good` or `git bisect bad`.
6. Loop back to step 4 (until `git bisect` completes)
7. Exit the bisect mode with `git bisect reset`

```Shell
git bisect start
git bisect good <commitish> # Select a commit where the bug wasn't introduced yet.
git bisect bad <commitish>  # Select a commit where the bug exists
```

#### Automated Bisect

If you have a script that can tell if the current source code is good or bad, you can bisect by issuing the command:

```Shell
git bisect run <script> <arguments>
```

The script should exit with code `0` if the current source code is good/old, and exit with a code between `1` and `127` (inclusive), except `125`, if the current source code is bad/new.

### Cherry-Pick

Apply only the selected commit to the working directory.

```Shell
git cherry-pick <commit-hash>
```

## Undo Changes

```Shell
git reset --soft COMMITHASH # Undo the last commit, but keep its changes staged (does not delete files)
git reset --hard COMMITHASH # Undo the last commit and discard all changes (deletes files).
git reset --hard a1b2c3d    # Rollback to an earlier commit, deleting all changes up to that point.
git revert COMMITHASH       # Create a new commit that does the opposite of the one provided. (Reset, but keeps history)
```

### Recover a Deleted Commit

`HEAD` always keeps track of every change, including rollbacks, so it can be used to recover lost files.

```Shell
git merge HEAD@{1}
```

## Git Remote

'Remotes' are eternal repositories with a similar Git history to our local one. GitHub, for example, is a remote repository. It is not part of Git, but is often used as the "source of truth" for convenience.  
If a repository is considered to be the project's "true" source, it should be named `origin`.

```Shell
git remote add <name> <uri>     # Add a remote repository (local folder or external url)
git fetch                       # Download a copy of the origin's metadata (.git/objects)
git log remote/branch           # See the log of a remote branch after fetching data
git merge remote/branch         # Merge between local and remote repos
git push origin main            # Push (send) local changes to the selected remote
git push origin <localbranch>:<remotebranch> # Push a local branch to a remote, with a different name
git push origin :<remotebranch> # Push an empty branch to delete the remote branch
git pull [<remote>/<branch>]    # Update local repo with remote changes (downloads files).
```

### Pull Requests

Propose changes to a repository, before they are actually applies. A pull request is typically accepted by a maintainer or other team members.

### GitHub

GitHub serves several purposes:
- As a backup of all your code on the cloud in case something happens to your computer
- As a central place to share your code and collaborate on it with others
- As a public portfolio for your coding projects

```Shell
# Install GitHub CLI either through a package manager, or using the command:
curl -sS https://webi.sh/gh | sh
# Login through the browser
gh auth login
# Add a remote from GitHub
git remote add origin https://github.com/your-username/repo-name.git
# List remote repos
git ls-remote
```

#### Forks

On GitHub (and similar platforms), a repository can be forked, or, copied, to serve as the base for a future pull request.  
The steps to submit a PR are usually as follows:
1. Fork their repo into your account
2. Clone your fork to your local machine
3. Create a new branch (let's call it `your_feature`)
4. Make changes
5. Commit and push changes to your fork's remote `your_feature` branch
6. Create a pull request to `original_owner/repo` `main` from `your_username/repo` `your_feature`

## `.gitignore`

Prevents the specified files from being tracked by git.

```Shell
folder_name          # Ignores all directories with that name, even subdirectories of different directories
file.txt             # Ignores a specific file in the current directory
folder/file.txt      # Ignores a file inside a subdirectory
*.txt                # Ignore all text files
/main.py             # Ignore a file only in the current directory, not subdirectories
!important.txt       # Track a file that would previously be ignored
```

If a file was already staged or committed, it won't be ignored, however. Use the following command to remove it from cache and ignore it on the next commit:

```Shell
git rm --cached file 
```

> It's common to have `.gitignore` files in subdirectories. These only affect the directories they are inside of.  

**Which files should be ignored?**
1. Ignore things that can be *generated* (e.g. compiled code, minified files, etc.)
2. Ignore dependencies (e.g. `node_modules`, `venv`, `packages`, etc.)
3. Ignore things that are personal or specific to how you like to work (e.g. editor settings)
4. Ignore things that are sensitive or dangerous (e.g. `.env` files, passwords, API keys, etc.)
