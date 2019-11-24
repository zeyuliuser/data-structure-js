const INF = Number.MAX_SAFE_INTEGER;
//链表
function LinkedList() {
    function Node(element) {
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let head = null;

    this.append = element => {
        let node = new Node(element), current;
        if (head === null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        length++;
    }

    this.insert = (position, element) => {
        if (position > -1 && position <= length) {
            let node = new Node(element), current = head, previous, index = 0;
            if (position === 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
            node.next = current;
            previous.next = node;
            }
            length++;
            return true;

        } else {
            return false;
        }
    }

    this.removeAt = position => {
        if (position > -1 && position < length) {
            let current = head, previous, index = 0;
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }

    this.remove = element => {
        let index = this.indexOf(element);
        return this.removeAt(index);
    }
    this.indexOf = element => {
        let current = head;
        index = 0;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    this.isEmpty = _ => {
        return length === 0;
    }
    this.size = _ => {
        return length;
    }
    this.getHead = _ => {
        return head;
    }
    this.toString = _ => {
        let current = head, string = '';
        while (current) {
            string += current.element + (current.next ? '\n' : '');
            current = current.next;
        }
        return string;
    }
}


//栈
function Stark() {
    let items = [];
    this.push = S => {
        items.push(s)
    }
    this.pop = _ => {
        return items.pop();
    }
    this.peek = _ => {
        return items[items.length-1];
    }
    this.isEmpty = _ => {
        return items.length == 0;
    }
    this.size = _ => {
        return items.length;
    }
    this.clear = _ => {
        items = [];
    }
    this.print = _ => {
        console.log(items.toString());
    }
}
//队列
function Queue() {
    let items = [];
    this.enqueue = s => {
        items.push(s);
    }
    this.dequeue = () => {
        return items.shift();
    }
    this.front = () => {
        return items[0];
    }
    this.isEmpty = _ => {
        return items.length == 0;
    }
    this.size = _ => {
        return items.length;
    }
    this.print = _ => {
        console.log(items.toString());
    }
}

//字典
function Dictionary() {
    let  items = {};
    this.has = key => {
        return key in items;
    }
    this.set = (key, value) => {
        items[key] = value;
    }
    this.delete = key => {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    }
    this.get = key => {
        return this.has(key) ? items[key] : undefined;
    }
    this.values =()=> {
        var values = [];
        for (let i in items) {
            if (this.has(i)) {
                values.push(items[i])
            }
        }
        return values;
    }
    this.keys = () => {
        return Object.keys(items);
    }
    this.getItems = () => {
        return items;
    }
    this.clear = () => {
        items = {};
    }
    this.size = () => {
        return Object.keys(items).length;
    }
}


function Graph() {
    var vertices = [];
    var adjList = new Dictionary();

    //新增顶点
    this.addVertex = v => {
        vertices.push(v);
        adjList.set(v,[])
    }
    //添加定点之间的边
    this.addEdge = (v, w) => {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }
    this.toString = () => {
        let  s = '';
        for (let i = 0; i < vertices.length; i++){
            s += vertices[i] + '->';
            let neighbors = adjList.get(vertices[i]);
            for (let j = 0; j < neighbors.length; j++){
                s += neighbors[j] + '';
            }
            s += '\n';
        }
        return s;
    }  
    let initializeColor = function () {
        let color = {};
        for (let i in vertices) {
            color[vertices[i]] = 'white';
        }
        return color;
    }
    //Breadth-First-Search
    this.bfs = function (v, callback) {
        let color = initializeColor();
        let queue = new Queue();
        queue.enqueue(v);
        while (!queue.isEmpty()) {
            let u = queue.dequeue();
            let neighbors = adjList.get(u);
            color[u] = 'grey';
            for (let i in neighbors) {
                let w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            if (callback) {
                callback(u);
            }
        }
    }
    //Deepth-First-Search
    this.dfs = callback => {
        let color = initializeColor();
        let dfsVisit = (u, color, callback) => {
            color[u] = 'grey';
            if (callback) {
                callback(u)
            }
            let neighbors = adjList.get(u);
            for (let i in neighbors) {
                let w = neighbors[i];
                if (color[w] === 'white') {
                    dfsVisit(w, color, callback);
                }
            }
            color[u] = 'black';
        }
        for (let i in vertices) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, callback);
            }
        }
    }
    //dijkstra
    /**
     * 1.init distance列表（下面为dist）所有元素都为INF，visited数组所有都为false
     * 2.dist[src]=0 设置自己到自己距离为0
     * 3.循环找出当前dist中最小路径，并标注为visited=>minDistance(dist,visited)//此时判断visited要为FALSE才可返回最短路径index
     * 4.更新dist列表
     * **条件
     * **1.visited[v]为FALSE（当前元素未确定最小路径）
     * **2.dist[u]不为INF（上一元素可联通src元素）
     * **3.graph里u->v的有路径可走 graph[u][v]!=0
     * **4.dist[u]+graph[u][v]<dist[v]
     * 5.返回dist
     */
    this.dijkstra = src => {
        let dist = [], vistied = [], length = this.graph.length;
        let minDistance = (dist, vistied) => {
            let min = INF, minIndex = -1;
            for (let v = 0; v < dist.length; v++){
                if (vistied[v] == false && dist[v] <= min) {
                    min = dist[v];
                    minIndex = v;
                }
            }
            return minIndex;
        }
        for (let i = 0; i < length; i++){
            dist[i] = INF;
            vistied[i] = false;
        }
        dist[src] = 0;
        for (let i = 0; i < length; i++){
            let u = minDistance(dist, vistied);
            vistied[u] = true;
            for (let v = 0; v < length; v++){
                if (!vistied[v] && this.graph[u][v] != 0 && dist[u] != INF && dist[u] + this.graph[u][v] < dist[v]) {
                    dist[v]=dist[u]+this.graph[u][v]
                }
                
            }
        }
        return dist;
    }
    //floy
    /**
     * 1.init 复制图 graph=>dist
     * 2.判断通过i,从j到k是否存在更短路径并更新
     * 3.返回dist
     */
    this.floydWarshall = () => {
        let dist = [], length = this.graph.length;
        for (let i = 0; i < length; i++){
            dist[i] = [];
            for (let j = 0; j < length; j++){
                dist[i][j]=this.graph[i][j]
            }
        }
        // console.log(dist);
        for (let i = 0; i < length; i++){
            for (let j = 0; j < length; j++){
                for (let k = 0; k < length; k++){
                    if (dist[j][i] + dist[i][k] < dist[j][k]) {
                        dist[j][k] = dist[j][i] + dist[i][k];
                    }
                }
            }
        }
        return dist;
    }
    
}

function printNode(value) {
    console.log('Visited vertex:'+value)
}


function ArrayList() {
    let array = [];
    this.insert = item => {
        if (typeof item === 'object') {
            array.push(...item);
        } else {
            array.push(item);
        }
        
    }
    this.toString = _ => {
        return array.join();
    }
    this.quickSort = _ => {
        quick(array, 0, array.length - 1);
    }

    //快速排序
    function quick(array, left, right) {
        let index;
        if (array.length > 1) {
            index = partition(array, left, right);
            if (left < index - 1) {
                quick(array, left, index - 1);
            }
            if (index < right) {
                quick(array, index, right);
            }
        }
    }
    function partition(array, left, right) {
        let pivot = array[Math.floor((right + left) / 2)],
            i = left,
            j = right;
        while (i <= j) {
            while (array[i] < pivot) {
                i++;
            }
            while (array[j] > pivot) {
                j--;
            }
            if (i <= j) {
                [array[i], array[j]] = [array[j], array[i]];
                i++;
                j--;
            }
        }
        return i;
    }
    //堆排序
    this.heapSort = _ => {
        let heapSize = array.length;
        buildHeap(array);
        while (heapSize > 1) {
            heapSize--;
            [array[0], array[heapSize]] = [array[heapSize], array[0]];
            heapify(array, heapSize, 0);
        }
    }
    function buildHeap(array) {
        let heapSize = array.length;
        for (let i =Math.floor(array.length / 2); i >= 0; i--){
            heapify(array, heapSize, i);
        }
    }
    function heapify(array, heapSize, i) {
        let left = i * 2 + 1, right = i * 2 + 2, largest = i;
        if (left < heapSize && array[left] > array[largest]) {
            largest = left;
        }
        if (right < heapSize && array[right] > array[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            heapify(array, heapSize, largest);
        }
    }
}

// var graph = new Graph();
// var myVer = ['A', 'B', 'C', 'D','E','F','G','H','I'];
// for (let i in myVer) {
//     graph.addVertex(myVer[i]);
// }
// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('A', 'D');
// graph.addEdge('C', 'D');
// graph.addEdge('C', 'G');
// graph.addEdge('D', 'G');
// graph.addEdge('D', 'H');
// graph.addEdge('B', 'E');
// graph.addEdge('B', 'F');
// graph.addEdge('E', 'I');
// console.log(graph.toString());


// graph.bfs(myVer[0],printNode)
// graph.dfs(printNode);

// let d = new Dictionary();
// d.set('A', [1, 2, 3]);
// d.set('B', [2, 2, 5]);
// console.log(d.getItems())

// graph.graph = [
//     [0, 2, 4, 0, 0, 0],
//     [0, 0, 1, 4, 2, 0],
//     [0, 0, 0, 0, 3, 0],
//     [0, 0, 0, 0, 0, 2],
//     [0, 0, 0, 3, 0, 2],
//     [0, 0, 0, 0, 0, 0]
// ];
// graph.graph = [
//     [0, 2, 4, INF, INF, INF],
//     [INF, 0, 1, 4, 2, INF],
//     [INF, INF, 0, INF, 3, INF],
//     [INF, INF, INF, 0, INF, 2],
//     [INF, INF, INF, 3, 0, 2],
//     [INF, INF, INF, INF, INF, 0]
// ];

// console.log(graph.floydWarshall())
// graph.dijkstra(0)


//单向链表

// let linkedList = new LinkedList();
// linkedList.append('a');
// linkedList.append('b');
// linkedList.append('c');
// linkedList.append('d');
// linkedList.append('e');
// linkedList.append('f');
// linkedList.append('g');

// console.log(linkedList.removeAt(3))
// console.log(linkedList.toString())


let arr = new ArrayList();
arr.insert([3, 5, 1, 6, 4, 7, 2]);
//快速排序
// arr.quickSort();
//堆排序
arr.heapSort();
console.log(arr.toString());
