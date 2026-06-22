async function run() {
  try {
    const res = await fetch('https://api.github.com/users/JimiR3d/repos?sort=updated&per_page=100');
    const repos = await res.json();
    console.log(JSON.stringify(repos.map(r => ({ name: r.name, url: r.html_url, homepage: r.homepage, description: r.description })), null, 2));
  } catch (e) {
    console.error(e);
  }
}
run();
