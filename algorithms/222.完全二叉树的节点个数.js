/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
var countNodes = function(root) {
  // 后序遍历
  if (root == null) return 0;
    let leftNum = countNodes(root.left);
    let rightNum = countNodes(root.right)
    return leftNum + rightNum + 1;

  // 随便遍历都行
};
// @lc code=end

