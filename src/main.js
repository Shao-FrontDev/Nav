const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "A", url: "https://www.acfun.cn" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "");
};

const renderLogo = (url) => {
  return simplifyUrl(url)[0].toUpperCase();
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
          <div class="site">
            <div class="logo">${renderLogo(node.url)}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class='close'>❌</div>
          </div>
      </li>
        `).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      console.log("❌");
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = prompt("请输入你要添加的网址?");

  console.log(url);
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }
  hashMap.push({
    logo: renderLogo(url),
    url,
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

$(".searchBtn").on("click", () => {
  console.log($(".searchText").innerText);
});