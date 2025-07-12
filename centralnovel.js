function fetchNovels() {
  const url = 'https://centralnovel.com/series/';
  const document = http.get(url).document();
  const novels = [];

  document.select('.page-item-detail').forEach(novel => {
    novels.push({
      name: novel.select('h5 a').text(),
      url: novel.select('h5 a').attr('href'),
      cover: novel.select('img').attr('src')
    });
  });

  return novels;
}

function fetchChapters(novelUrl) {
  const document = http.get(novelUrl).document();
  const chapters = [];

  document.select('.wp-manga-chapter a').forEach(chapter => {
    chapters.unshift({
      name: chapter.text(),
      url: chapter.attr('href')
    });
  });

  return chapters;
}

function fetchChapterContent(chapterUrl) {
  const document = http.get(chapterUrl).document();
  return document.select('.text-left').html(); // conteúdo do capítulo
}
