// 1.Kahn 算法Kahn 算法实际上用的是贪心算法思想，思路非常简单、好懂。定义数据结构的时候，如果 s 需要先于 t 执行，那就添加一条 s 指向 t 的边。所以，如果某个顶点入度为 0， 也就表示，没有任何顶点必须先于这个顶点执行，那么这个顶点就可以执行了。我们先从图中，找出一个入度为 0 的顶点，将其输出到拓扑排序的结果序列中（对应代码中就是把它打印出来），并且把这个顶点从图中删除（也就是把这个顶点可达的顶点的入度都减 1）。我们循环执行上面的过程，直到所有的顶点都被输出。最后输出的序列，就是满足局部依赖关系的拓扑排序。
public void topoSortByKahn() { int[] inDegree = new int[v]; // 统计每个顶点的入度 
for (int i = 0; i < v; ++i) { for (int j = 0; j < adj[i].size(); ++j) { int w = adj[i].get(j); // i->w 
inDegree[w]++; } } 
LinkedList queue = new LinkedList<>(); 
for (int i = 0; i < v; ++i) {
   if (inDegree[i] == 0) queue.add(i); } while (!queue.isEmpty()) { 
     int i = queue.remove(); System.out.print("->" + i); for (
       int j = 0; j < adj[i].size(); ++j) {
          int k = adj[i].get(j); inDegree[k]--; if (inDegree[k] == 0) queue.add(k); 
          } }}