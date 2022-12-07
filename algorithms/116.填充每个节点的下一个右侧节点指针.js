/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  let queue = []

  if(root) queue.push(root)

  while(queue.length>0){
      let n = queue.length

      for(let i = 0;i<n;i++){
          let node = queue.shift()
          if(i+1<n){
              node.next = queue[0]
          } 
          if(node.left) queue.push(node.left)
          if(node.right) queue.push(node.right)
      }
  }
  return root
};
// @lc code=end

