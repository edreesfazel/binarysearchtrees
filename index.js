class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr){
        //sort and remove duplicates first
        let sortedArray = [...new Set(arr)].sort((a,b) => a - b)
        this.root = this.buildTree(sortedArray)
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        if(start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2)
        let node = new Node(arr[mid])

        node.left = this.buildTree(arr, start, mid - 1)
        node.right = this.buildTree(arr, mid + 1, end)

        return node;
    }
    
    //add the pretty print method
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    find(value) {
        let currentNode = this.root

        while (currentNode !== null) {
            if(currentNode.data === value) {
                return currentNode
            } else if (value < currentNode.data) {
                currentNode = currentNode.left
            } else if (value > currentNode.data) {
                currentNode = currentNode.right
            }
        }
        return null;
    }

    insert(value) {
        //create a helper function called searchTree
        const searchTree = (node, value) => {
            if(value < node.data) {
                if(node.left === null) {
                    node.left = new Node(value)
                } else {
                    searchTree(node.left, value)
                }
            }

            else if (value > node.data) {
                if(node.right === null) {
                    node.right = new Node(value)
                } else {
                    searchTree(node.right, value)
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
            if(node === null) {
                return null
            }

            //if the node has 1 child, return the child to replace
            // the current node
            if(value === node.data) {
                if(node.left === null) {
                    return node.right
                }
                if(node.right === null) {
                    return node.left
                }

                let tempNode = node.right
                while(tempNode.left !== null) {
                    tempNode = tempNode.left
                }
                node.data = tempNode.data 
                node.right = deleteNode(node.right, tempNode.data)

                return node
            } else if (value < node.data) {
                node.left = deleteNode(node.left, value)
                return node
            } else {
                node.right = deleteNode(node.right, value)
                return node
            }
        }
        this.root = deleteNode(this.root, value)
    }
  

    levelOrder(callback = null) {
        let result = []; //stores data if no callback provided
        
        if(this.root === null) { //if tree is empty, return empty
            return result
        }

        let queue = []; //initiailze a queue to help with level order traversal
        queue.push(this.root) //start by pushing root node of tree onto the queue
    
        while(queue.length > 0) {
            let node = queue.shift(); //remove 1st node from queue, assign it to node variable

            if(callback) {
                callback(node)
            } else {
                result.push(node.data)
            }

            if (node.left !== null) {
                queue.push(node.left)
            } 
            if (node.right !== null) {
                queue.push(node.right)
            }
        }

        return callback ? null : result;
    }

    inOrder(callback = null) {
        let result = []

        const traverse = (node) => {
            if(node !== null) {
                traverse(node.left)

                if(callback) {
                    callback(node)
                } else {
                    result.push(node.data)
                }

                traverse(node.right)
            }
        }

        traverse(this.root) //start at the root node

        return callback ? null : result;
    }
    

    preOrder(callback = null) {
        let result = []

        //define the helper function

        const traverse = (node) => {
            if(node !== null) {
                if(callback) {
                    callback(node)
                } else {
                    result.push(node.data)
                }

                traverse(node.left)
                traverse(node.right)
            }
        }

        //start the traversal from the root
        traverse(this.root)

        // if no callback provided, return the array of node values
        return callback ? null : result;
    }

    postOrder(callback = null) {
        let result = []

        //define the helper function
        const traverse = (node) => {
            if (node !== null) {

                traverse(node.left)

                traverse(node.right)

                if(callback) {
                    callback(node)
                } else  {
                    result.push(node.data)
                }
            }
        }

        //start the traversal from the root
        traverse(this.root)

        // if no callback provided, return the array of node values
        return callback ? null : result;
    }
    
    height(node) {
        if(node === null) {
            return -1
        } else {
            let leftHeight = this.height(node.left)
            let rightHeight = this.height(node.right)

            return Math.max(leftHeight, rightHeight) + 1
        }

    }

    depth(node) {
        let currentDepth = 0;
        let currentNode = this.root;

        while(currentNode !== null) {
            if(currentNode.data === node.data) {
                return currentDepth
            } else if (node.data < currentNode.data) {
                currentNode = currentNode.left;
                currentDepth++;
            } else {
                currentNode = currentNode.right;
                currentDepth++;
            }
        }
        return -1;
    }
    
    isBalanced(node = this.root) {
        const checkBalance = (node) => {
            //a null node is considered balanced
            if(node === null) {
                return true;
            }

            //get height of left, right subtree
            let leftHeight = this.height(node.left)
            let rightHeight = this.height(node.right)

            let isHeightOk = Math.abs(leftHeight - rightHeight) <= 1;

            //recursively check the left subtree
            let isLeftOk = checkBalance(node.left)

            //recursively check the right subtree
            let isRightOk = checkBalance(node.right)

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
    while(node.right !== null) {
        node = node.right
    }
    return node;
}

function unbalanceTree(tree){
    let rightmost = findRightmost(tree.root);
    rightmost.right = new Node(101)
}

unbalanceTree(tree)

//Confirm that the tree is unbalanced by calling isBalanced.
console.log("Is the tree unbalanced after adding a node?" + tree.isBalanced())

//Balance the tree by calling rebalance.
tree.rebalance();

//Confirm that the tree is balanced by calling isBalanced.
console.log("Is the tree balanced after rebalancing? " + tree.isBalanced())

