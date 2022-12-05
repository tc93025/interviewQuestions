/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
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
var averageOfLevels = function (root) {
  const res = [];
  const queue = [];

  if (root != null) {
    queue.push(root)
  }

  while (queue.length > 0) {
    let n = queue.length
    let levelRes = 0;
    
    for(let i=0;i<n;i++){
      let node = queue.shift()
      levelRes += node.val;
      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }
    res.push(levelRes / n);

  }

  return res
}

// let res=[],queue=[];
//     queue.push(root);
//     while(queue.length&&root!==null){
//         //每一层节点个数
//         let length=queue.length;
//         //sum记录每一层的和
//         let sum=0;
//         for(let i=0;i<length;i++){
//             let node=queue.shift();
//             sum+=node.val;
//             node.left&&queue.push(node.left);
//             node.right&&queue.push(node.right);
//         }
//         //每一层的平均值存入数组res
//         res.push(sum/length);
//     }
//     return res;
  
// @lc code=end

