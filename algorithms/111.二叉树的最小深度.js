/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
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
var minDepth = function(root) {
  let depth = 0
    let queue = []
    if(root) queue = [root]

    while(queue.length){
        let n = queue.length
        depth++
        for(let i=0;i<n;i++){
            let node = queue.shift()

            if(!node.left&&!node.right){
                return depth
            }

            node.left&&queue.push(node.left)
            node.right&& queue.push(node.right)
        }
    }

    return depth
};
// @lc code=end

