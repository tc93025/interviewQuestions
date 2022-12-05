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
  let res = [];
    let queue = [];

    if(root != null) queue.push(root);

    while(queue.length > 0) {
        let n = queue.length
        let level = [];

        for(let i=0;i<n;i++){
            let node = queue.shift()
            level.push(node.val)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        // level.push(item)

        // if(item.left) queue.push(item.left)
        // if(item.right) queue.push(item.right)
        

        res.push(level)
    }

    return res
};
// @lc code=end

