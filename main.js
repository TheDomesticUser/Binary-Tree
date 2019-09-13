class BinaryTree {
    constructor(){
        this.root = null;
    }
    insert(value){
        let traversal = this.root;
        const newNode = {
            left: null,
            right: null,
            value
        };

        if (!traversal) {
            this.root = newNode;
        } else {
            while (true) {
                const left = traversal.left;
                const right = traversal.right;

                if (left && value < traversal.value) traversal = left;
                else if (right && value >= traversal.value) traversal = right;
                else break;
            }
            if (value < traversal.value) traversal.left = newNode;
            else traversal.right = newNode;
        }
    }
    lookup(value){
        let iterNode = this.root;

        while (iterNode) {
            if (value < iterNode.value) iterNode = iterNode.left;
            else if (value > iterNode.value) iterNode = iterNode.right;
            else break;
        }

        // iterNode gets assigned null if it finds no match
        if (iterNode) return true;
        
        return false;
    }
    remove(value) {
        let deleteNode = this.root;
        let prevDeleteNode;

        if (!deleteNode) return;
        if (!this.root.left && !this.root.right && this.root.value === value) {
            this.root = null;
        } else {
            while (deleteNode) {
                const bufferDeleteNode = deleteNode;

                if (value < deleteNode.value) deleteNode = deleteNode.left;
                else if (value > deleteNode.value) deleteNode = deleteNode.right;
                else break;
                prevDeleteNode = bufferDeleteNode;
            }
            if (!deleteNode) return;

            if (!deleteNode.left && !deleteNode.right) {
                if (this._leftNodeValueValid(prevDeleteNode, value)) prevDeleteNode.left = null;
                else prevDeleteNode.right = null;
            } else if (deleteNode.right) {
                let prevReplaceNode = deleteNode;
                let replaceNode = deleteNode.right;

                while (replaceNode.left) {
                    prevReplaceNode = replaceNode;
                    replaceNode = replaceNode.left;
                }
                deleteNode.value = replaceNode.value;

                if (this._leftNodeValueValid(prevReplaceNode, replaceNode.value)) prevReplaceNode.left = replaceNode.right;
                else prevReplaceNode.right = replaceNode.right;
            } else {
                // Check for root here
                if (deleteNode.value === this.root.value) {
                    this.root = this.root.left;
                } else {   
                    if (this._leftNodeValueValid(prevDeleteNode, value)) prevDeleteNode.left = deleteNode.left;
                    else prevDeleteNode.right = deleteNode.left;
                }
            }
        }
    }
    _leftNodeValueValid(node, value) {
        if (!node.left) return false;
        if (node.left.value === value) return true;
        return false;
    }
}
