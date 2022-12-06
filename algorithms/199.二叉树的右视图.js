/*
 * @lc app=leetcode.cn id=199 lang=javascript
 *
 * [199] 二叉树的右视图
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
 * @return {number[]}
 */
var rightSideView = function(root) {
  // bfs
  let res = []; 
  let queue = [];

  if(root) queue.push(root)

  while(queue.length>0){
    let n = queue.length
    let levelRes = null;

    for(let i = 0; i < n; i++){
      let node = queue.shift()
      levelRes = node.val
      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }

    res.push(level.pop())
  }

  return res
};
// @lc code=end

