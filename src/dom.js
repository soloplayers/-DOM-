window.dom = {
  /* 
        创建元素节点
        1、直接创建一个元素，输入元素名
        2、创建很多个元素的组合
        */
  create(string) {
    if (!(string.trim()[0] === "<")) {
      return document.createElement(string);
    } else {
      const contaier = document.createElement("template");
      contaier.innerHTML = string.trim();
      return contaier.content.firstChild;
    }
  },

  /* 
        后面插入元素 -- 详情查看MDN insertBefore
        1、在node1后面添加node2    
    */
  after(node1, node2) {
    node1.parentNode.insertBefore(node2, node1.nextSibling);
  },

  /* 在前面插入元素 */
  before(node1, node2) {
    node1.parentNode.insertBefore(node2, node1);
  },

  /* 新增儿子 */
  append(parent, node) {
    parent.appendChild(node);
  },

  /* 新增爸爸 -- 画图理解*/
  wrap(node, parentNode) {
    dom.before(node, parentNode);
    dom.append(parentNode, node);
  },

  /* 删除元素 */
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  /* 清空节点及其子代所有的信息 */
  empty(node) {
    const arr = [];
    let x = node.firstChild;
    while (x) {
      arr.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return arr;
  },

  /* 设置自定义属性 */
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute("data-" + name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  /* 设置文本内容 */
  text(node, string) {
    /* 兼容写法 */
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = strng;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  /* 设置HTML内容 */
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },

  /* 设置style样式 */
  style(node, name) {
    if (name instanceof Object) {
      const obj = name;
      for (let k in obj) {
        node.style[k] = obj[k];
      }
    } else if (typeof name === String) {
      return node.style[name];
    }
  },

  /* 设置类名class各种属性 */
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remoce(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },

  /* 事件监听 */
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },

  /* 移除事件监听 */
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  /* dom的选择器 */
  find(string, scope) {
    return (scope || document).querySelectorAll(string);
  },

  /* 获取父元素 */
  parent(node) {
    return node.parentNode;
  },

  /* 获取子节点 */
  children(node) {
    return node.children;
  },

  /* 获取兄弟姐妹（除开自己） */
  siblings(node) {
    return Array.from(node.parentNode.children.filter((n) => n !== node));
  },

  /* 获取弟弟 */
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      // 除开文本节点
      x = x.nextSibling;
    }
    return x;
  },

  /* 获取哥哥节点 */
  previous() {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  /* 遍历元素 */
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  /* 获取排行第几 */
  index(node) {
    console.log(node.parentNode);
    const list = dom.children(node.parentNode);
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) {
        return i + 1;
      }
    }
  },
};
