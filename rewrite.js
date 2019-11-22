const INF = Number.MAX_SAFE_INTEGER;
//dijkstra

function dijkstra(src) {
    let dist = [], visited = [], length = group.length;
    for (let i = 0; i < length; i++){
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0;
    for (let i = 0; i < length; i++){
        let u = minDistance(dist, visited);
        visited[u] = true;
        for (let v = 0; v < length; v++){
            if (!visited[v] && visited[u] != INF && group[u][v] != 0 && dist[u] + group[u][v] < dist[v]) {
                dist[v] = dist[u] + group[u][v];
            }
        }
    }
    return dist;
}
function minDistance(dist, visited) {
    let length = dist.length;
    let min = INF, minIndex = -1;
    for (let i = 0; i < length; i++){
        if (dist[i] <= min&&visited[i]==false) {
            min = dist[i];
            minIndex = i;
        }
    }
    return minIndex;
}

let group = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
];

console.log(dijkstra(0))