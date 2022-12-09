/*
 * @lc app=leetcode.cn id=1161 lang=javascript
 *
 * [1161] 最大层内元素和
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
var maxLevelSum = function (root) {
  const queue = []
  let resLayer = 1
  let currentLayer = 0
  if (!root) return 0
  queue.push(root)
  let currentRes = 0;

  while (queue.length > 0) {
    currentLayer++
    const n = queue.length
    let levelRes = 0
    for (let i = 0; i < n; i++) {
      let node = queue.shift()
      levelRes += node.val
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    console.log(levelRes, currentLayer)
    if (currentLayer == 1) {
      currentRes = levelRes
      resLayer = currentLayer
    }
    if (currentRes < levelRes) {
      currentRes = levelRes
      resLayer = currentLayer
    }

  }

  return resLayer
};
// @lc code=end

