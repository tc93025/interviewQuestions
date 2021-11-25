# NodePath

- The NodePath object passed to visitor methods is a wrapper around an AST node, and it serves to provide access to the chain of ancestor objects (all the way back to the root of the AST) and scope information.
- 传递给访问者方法的 NodePath 对象是一个 AST 节点的包装器，它用于提供对祖先对象链（一直回到 AST 的根）和范围信息的访问。
- In general, path.node refers to the wrapped node, path.parent.node refers to the nearest Node ancestor, path.parent.parent.node to the grandparent, and so on.
- 一般来说，path.node 指的是被包裹的节点，path.parent.node 指的是最近的 Node 祖先，path.parent.parent.node 指的是祖父，依此类推
- Note that path.node may not be a direct property value of path.parent.node; for instance, it might be the case that path.node is an element of an array that is a direct child of the parent node:
- 注意 path.node 可能不是 path.parent.node 的直接属性值；例如， path.node 可能是一个数组的元素，它是父节点的直接子节点：
  ``` javascript
  path.node === path.parent.node.elements[3]
  ```
- in which case you should know that path.parentPath provides finer-grained access to the complete path of objects (not just the Node ones) from the root of the AST:
- 在这种情况下，您应该知道 path.parentPath 提供了从 AST 根目录对对象的完整路径（不仅仅是 Node 的）的更细粒度的访问：
  ``` javascript
  // In reality, path.parent is the grandparent of path:
  path.parentPath.parentPath === path.parent

  // The path.parentPath object wraps the elements array (note that we use
  // .value because the elements array is not a Node):
  path.parentPath.value === path.parent.node.elements

  // The path.node object is the fourth element in that array:
  path.parentPath.value[3] === path.node

  // Unlike path.node and path.value, which are synonyms because path.node
  // is a Node object, path.parentPath.node is distinct from
  // path.parentPath.value, because the elements array is not a
  // Node. Instead, path.parentPath.node refers to the closest ancestor
  // Node, which happens to be the same as path.parent.node:
  path.parentPath.node === path.parent.node

  // The path is named for its index in the elements array:
  path.name === 3

  // Likewise, path.parentPath is named for the property by which
  // path.parent.node refers to it:
  path.parentPath.name === "elements"

  // Putting it all together, we can follow the chain of object references
  // from path.parent.node all the way to path.node by accessing each
  // property by name:
  path.parent.node[path.parentPath.name][path.name] === path.node
  ```
- These NodePath objects are created during the traversal without modifying the AST nodes themselves, so it's not a problem if the same node appears more than once in the AST (like Array.prototype.slice.call in the example above), because it will be visited with a distict NodePath each time it appears.
- 这些 NodePath 对象是在遍历过程中创建的，并没有修改 AST 节点本身，所以如果同一个节点在 AST 中出现不止一次也不是问题（如上例中的 Array.prototype.slice.call）,因为每次出现时都会使用一个 distict NodePath 访问它
- Child NodePath objects are created lazily, by calling the .get method of a parent NodePath object:
- 子 NodePath 对象是通过调用父 NodePath 对象的 .get 方法延迟创建的：
``` javascript
// If a NodePath object for the elements array has never been created
// before, it will be created here and cached in the future:
path.get("elements").get(3).value === path.value.elements[3]

// Alternatively, you can pass multiple property names to .get instead of
// chaining multiple .get calls:
path.get("elements", 0).value === path.value.elements[0]
```
- NodePath objects support a number of useful methods:
  ``` javascript
    // Replace one node with another node:
    var fifth = path.get("elements", 4);
    fifth.replace(newNode);

    // Now do some stuff that might rearrange the list, and this replacement
    // remains safe:
    fifth.replace(newerNode);

    // Replace the third element in an array with two new nodes:
    path.get("elements", 2).replace(
      b.identifier("foo"),
      b.thisExpression()
    );

    // Remove a node and its parent if it would leave a redundant AST node:
    //e.g. var t = 1, y =2; removing the `t` and `y` declarators results in `var undefined`.
    path.prune(); //returns the closest parent `NodePath`.

    // Remove a node from a list of nodes:
    path.get("elements", 3).replace();

    // Add three new nodes to the beginning of a list of nodes:
    path.get("elements").unshift(a, b, c);

    // Remove and return the first node in a list of nodes:
    path.get("elements").shift();

    // Push two new nodes onto the end of a list of nodes:
    path.get("elements").push(d, e);

    // Remove and return the last node in a list of nodes:
    path.get("elements").pop();

    // Insert a new node before/after the seventh node in a list of nodes:
    var seventh = path.get("elements", 6);
    seventh.insertBefore(newNode);
    seventh.insertAfter(newNode);

    // Insert a new element at index 5 in a list of nodes:
    path.get("elements").insertAt(5, newNode);

  ```