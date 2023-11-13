class Node {
    constructor(data = null, leftChild = null, rightChild = null) {
        this.data = data;
        this.leftChild = leftChild
        this.rightChild = rightChild;
    }
}

class Tree {
    constructor(arr) {
        let uniqueSortedArray =  [...new Set(arr)].sort((a,b) => a - b)
        this.root = this.buildTree(uniqueSortedArray)
    }

 
    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) {
            return null
        }

        let mid = Math.floor(((start + end) / 2))
        const node = new Node(arr[mid])
        node.leftChild = this.buildTree(arr, start, mid - 1)
        node.rightChild = this.buildTree(arr, mid + 1, end)

        return node;
    }
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.rightChild !== null) {
          this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.leftChild !== null) {
          this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value) {

        //create a helper function
        const searchTree = (node, value) => {
            if(value < node.data) {
                if(node.leftChild === null) {
                    node.leftChild = new Node(value)
                } else {
                    searchTree(node.leftChild, value)
                }
            }
            else if (value > node.data) {
                if(node.rightChild === null) {
                    node.rightChild = new Node(value)
                } else {
                    searchTree(node.rightChild, value)
                }
            }
        }
        if(this.root === null) {
            this.root = new Node(value)
        } else {
            searchTree(this.root, value)
        }
    }

    delete(value) {
        const deleteNode = (node, value) => {
            if(node === null){
                return null
            }
            if(value === node.data) {
                if(node.leftChild === null && node.rightChild === null) {
                    return null
                } else if (node.leftChild === null) {
                    return node.rightChild
                } else if (node.rightChild === null) {
                    return node.leftChild
                } else {
                    let tempNode = node.rightChild
                    while(tempNode.leftChild !== null) {
                        tempNode = tempNode.leftChild
                    }
                    node.data = tempNode.data 
                    node.rightChild = deleteNode(node.rightChild, tempNode.data)
                }
            } else if (value < node.data) {
                node.leftChild = deleteNode(node.leftChild, value)
            } else {
                node.rightChild = deleteNode(node.rightChild, value)
            }
            return node;
        }
        this.root = deleteNode(this.root, value)
    }

    find(value) {
        const findNode = (node, value) => {
            if(node === null) {
                return null
            } else if (value === node.data) {
                return node
            } else if (value < node.data) {
                return findNode(node.leftChild,value)
            } else {
                return findNode(node.rightChild, value)
            }
        }

        return findNode(this.root, value)
    }

    levelOrder(callback = null) {
        let result = [];

        if(this.root === null) {
            return result;
        }

        let queue = [];
        queue.push(this.root)

        while(queue.length > 0) {
            let node = queue.shift() //removes the 1st node from the queue
        
        if(callback) {
            callback(node)
        } else {
            result.push(node.data)
        }

        if(node.leftChild !== null) {
            queue.push(node.leftChild)
        } 
        if(node.rightChild !== null) {
            queue.push(node.rightChild)
        }
        }

        return callback ? null : result;
    }

    inOrder(callback = null) {
        let result = [];

        const traverse = (node) => {
            if(node !== null) {
                traverse(node.leftChild)

                if(callback) {
                    callback(node)
                } else {
                    result.push(node.data)
                } 
                traverse(node.rightChild)
            }
        }

        traverse(this.root)

        return callback ? null : result
    }

    preOrder(callback = null) {
        let result = [];

        const traverse = (node) => {
            if(node !== null) {
                if(callback) {
                    callback(node)
                } else {
                    result.push(node.data)
                }

                traverse(node.leftChild)
                traverse(node.rightChild)
            }
        }
        //start from the root
        traverse(this.root)

        return callback ? null : result
    }

    postOrder(callback = null) {
        let result = [];

        const traverse = (node) => {
            if(node !== null) {
                traverse(node.leftChild)
                traverse(node.rightChild)

                if(callback) {
                    callback(node)
                } else {
                    result.push(node.data)
                }
            }
        }
        traverse(this.root)

        return callback ? null : result
    }

    height(node) {
        if(node === null) {
            return -1
        } else {
            let leftHeight = this.height(node.leftChild)
            let rightHeight = this.height(node.rightChild)

            return Math.max(leftHeight, rightHeight) + 1

        }

    }

    depth(node) {
        let currentDepth = 0
        let currentNode = this.root
        
        while(currentNode !== null) {
            if(currentNode.data === node.data) {
                return currentDepth
            } else if (node.data < currentNode.data) {
                currentNode = currentNode.leftChild
                currentDepth++;
            } else {
                currentNode = currentNode.rightChild
                currentDepth++;
            }
        }

        return -1;
    }

    isBalanced(node = this.root) {
        const checkBalance = (node) => {
            //a null node is considred balanced
            if(node === null) {
                return true;
            }
            // get height of left, right subtree
            let leftHeight = this.height(node.leftChild)
            let rightHeight = this.height(node.rightChild)

            let isHeightOk = Math.abs(leftHeight - rightHeight) <= 1;

            //recursively check the left subtree
            let isLeftOk = checkBalance(node.leftChild)

            //recursively check the right subtree
            let isRightOk = checkBalance(node.rightChild)

            let nodeIsBalanced = isHeightOk && isLeftOk && isRightOk

            return nodeIsBalanced
        }
        return checkBalance(node)
    }

    rebalance() {
        const elements = this.inOrder();

        this.root = this.buildTree(elements)
    }
}

function generateRandomArray(count) {
    let randomArray = []

    for(var i =0; i < count; i++) {
        randomArray.push(Math.floor(Math.random() * 100))
    }

    return randomArray;
}

function printOrders(tree) {
    console.log("Level order: " + tree.levelOrder().join(", "))
    console.log("Preorder: " + tree.preOrder().join(", "))
    console.log("Inorder: " + tree.inOrder().join(", "))
    console.log("Postorder: " + tree.postOrder().join(", "))
}
//Create a binary search tree from an array of random numbers < 100.

const randomArray = generateRandomArray(10)
console.log("Random Array: ", randomArray.join(", ")) 
let tree = new Tree(randomArray)


//confirm that the tree is balanced
console.log("Is the tree balanced? " + tree.isBalanced())

//print out all elements in level, pre, post, and in order:
function printOrders(tree) {
    console.log("Level order: " + tree.levelOrder().join(", "))
    console.log("Preorder: " + tree.preOrder().join(", "))
    console.log("Inorder: " + tree.inOrder().join(", "))
    console.log("Postorder: " + tree.postOrder().join(", "))
}

printOrders(tree)

//unbalance the tree by added several numbers > 100

function findRightmost(node) {
    while(node.rightChild !== null) {
        node = node.rightChild
    }
    return node;
}

function unbalanceTree(tree){
    let rightmost = findRightmost(tree.root);
    rightmost.rightChild = new Node(101)
}

unbalanceTree(tree)

//Confirm that the tree is unbalanced by calling isBalanced.
console.log("Is the tree unbalanced after adding a node?" + tree.isBalanced())

//Balance the tree by calling rebalance.
tree.rebalance();

//Confirm that the tree is balanced by calling isBalanced.
console.log("Is the tree balanced after rebalancing? " + tree.isBalanced())

