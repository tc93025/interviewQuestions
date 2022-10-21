/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const res = [];
  const queue = [];

  if(root != null) queue.push(root);

  while(queue.length > 0) {
    const level = [];

    queue.forEach(item => {
      level.push(item)

      if(item.left) queue.push(item.left)
      if(item.right) queue.push(item.right)
    })

    res.push(level)
  }

  return res
};
// @lc code=end

