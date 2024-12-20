// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
  // 查找所有包含Mermaid代码的元素
  var mermaidDivs = document.querySelectorAll('.highlight-source-mermaid');

  mermaidDivs.forEach(function(div) {
    // 提取Mermaid代码
    var codeElement = div.querySelector('code');
    if (codeElement) {
      var mermaidCode = codeElement.textContent;

      // 创建新的div来放置渲染后的图表
      var renderDiv = document.createElement('div');
      renderDiv.className = 'mermaid';
      renderDiv.textContent = mermaidCode;

      // 替换原来的pre元素
      var preElement = div.querySelector('pre');
      if (preElement) {
        preElement.parentNode.replaceChild(renderDiv, preElement);
      }
    }
  });

  // 初始化Mermaid
  mermaid.initialize({ startOnLoad: true });
});
