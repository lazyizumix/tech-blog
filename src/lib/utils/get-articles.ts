import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

const getArticles: () => void = () => {
  const articlesRoot = path.join(process.cwd(), 'src/lib/content/articles');
  const years = fs.readdirSync(articlesRoot);

  const articles: ArticleMeta[] = [];

  for (const year of years) {
    const yearDir = path.join(articlesRoot, year);
    if (!fs.statSync(yearDir).isDirectory()) continue;

    const categories = fs.readdirSync(yearDir);
    for (const category of categories) {
      const categoryDir = path.join(yearDir, category);
      const files = fs.readdirSync(categoryDir);

      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(categoryDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data } = matter(content);

          articles.push({
            slug: `${year}/${category}/${file.replace('.md', '')}`,
            title: data.title,
            date: data.date,
            tags: data.tags ?? [],
          });
        }
      }
    }
  }

  // 日付で降順ソート
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export default getArticles;
