/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
    let result = []
    let nowList = []

    const dfs = (root, targetSum) =>{
        if(!root) return 
        nowList.push(root.val)
        targetSum -= root.val
        if(!root.left && !root.right && targetSum===0) {
            result.push(nowList.map(item=>item)) // 数组浅拷贝一下
        }
        dfs(root.left,targetSum)
        dfs(root.right,targetSum) 
        nowList.pop()
    }

    dfs(root,targetSum)

    return result

};
// @lc code=end

