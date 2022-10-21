/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
var zigzagLevelOrder = function(root) {
  const res = [];
  const queue = [];

  if(root != null) queue.push(root);

  while(queue.length > 0) {
    const level = [];
    let orderLeft = true;

    queue.forEach(item => {
      level.push(item)

      if(item.left) queue.push(item.left)
      if(item.right) queue.push(item.right)
    })

    res.push(level)
    if(orderLeft) queue.reverse()
    orderLeft = !orderLeft
  }

  return res
};
// @lc code=end

