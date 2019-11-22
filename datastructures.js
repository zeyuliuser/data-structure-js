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
}

// var graph = new Graph();
// var myVer = ['A', 'B', 'C', 'D'];
// for (let i in myVer) {
//     graph.addVertex(myVer[i]);
// }
// graph.addEdge('A', 'B');
// console.log(graph.toString());

// let d = new Dictionary();
// d.set('A', [1, 2, 3]);
// d.set('B', [2, 2, 5]);
// console.log(d.getItems())