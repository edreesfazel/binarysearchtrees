/*
// the idea of a balanced binary search tree is to find the middle
//element of the array and make it the root of the tree, then 
//perform the same operation on the left subarray for the root's
//left child and the same operation on the root's right child


//PSUEDOCODE:
// 1. set the middle element of the array as the root
// 2. Recursively do the same for the left half and the right half
//      2a. Get the middle of the left half and make it the left child
            //of the root created in step 1
        2b. Get the middle of the right half and make it the right child of the
            root in step 1
    3. Print the preorder of the tree 
*/

//a binary tree node:

class Node {
    constructor (d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

var root = null;

/* A function that constructs Balanced Binary Search Tree from a
sorted array */

function sortedArrayToBST(arr, start, end) {
    /* Base Case */ 
    if (start > end) {
        return null;
    }
    /*Get the middle element and make it root */
    var mid = parseInt((start + end) / 2);
    var node = new Node(arr[mid]);
    /* Recursively construct the left subtree and make it
    the left child of root */
    node.left = sortedArrayToBST(arr, start, mid -1);
    /*Recursively construct the right subtree and make it
    the left child of root */
    node.right = sortedArrayToBST(arr, mid + 1, end);
    return node;
}

/* A utility function to print preorder traversal of BST */
function preOrder(node) {
    if (node === null) {
        return;
    }
    console.log(node.data + " ");
    preOrder(node.left);
    preOrder(node.right)
}

var arr = [1, 2, 3, 4, 5, 6, 7];
var n = arr.length;
root = sortedArrayToBST(arr, 0, n-1 );
console.log("Preorder traversal of constructed BST<br>");
preOrder(root);