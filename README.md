# Delete Merged Branches
This [GitHook](http://githooks.io) automatically deletes branches after they have been merged via a pull request.

Warning: the branch will get deleted no matter what it is merged into (this is the intended behaviour). Example - you have three branches:

* master
* featureA
* featureB

You open a PR to merge featureB into featureA. When you press 'Merge', featureB will be deleted.

You then open a PR to merge featureA with master. When you press 'Merge', featureA will be deleted.

## How to install
On the [githook-delete-merged-branches page on GitHooks.io](http://githooks.io/githooks/ChrisBAshton/githook-delete-merged-branches), there's a big 'Install' button. Just choose the repo you want to install it to, then hit the button!
