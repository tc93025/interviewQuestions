/*
 * @lc app=leetcode.cn id=129 lang=javascript
 *
 * [129] 求根节点到叶节点数字之和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  let res = 0

  const dfs = (node, curRes) => {
    if (!node) return
    curRes += node.val
    console.log(curRes)
    if (!node.left && !node.right) {
      res += +curRes
    } else {
      dfs(node.left, curRes)
      dfs(node.right, curRes)
    }
  }

  dfs(root, '', res)

  return res
};
// @lc code=end

