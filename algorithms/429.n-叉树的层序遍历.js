/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let res = [];
  let queue = [];

  if(root != null) queue.push(root);

  while(queue.length > 0) {
      let n = queue.length
      let level = [];

      for(let i=0;i<n;i++){
          let node = queue.shift()
          level.push(node.val)
          for(const child of node.children){
              queue.push(child)
          }
      }
      // level.push(item)

      // if(item.left) queue.push(item.left)
      // if(item.right) queue.push(item.right)
      

      res.push(level)
  }

  return res
};
// @lc code=end

