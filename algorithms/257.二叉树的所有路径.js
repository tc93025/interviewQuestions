/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  const paths = [];

    // 暂时理解没有return是递归 有return是回溯
    const construct_paths = (node, path) => {
        if (!node) return

        path += node.val
        if (!node.left && !node.right) {
            paths.push(path)
        } else {
            path += '->'
            construct_paths(node.left, path)
            construct_paths(node.right, path)
        }
    }
    construct_paths(root, '')

    return paths
};
// @lc code=end

