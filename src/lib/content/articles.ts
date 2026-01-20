export type Frontmatter = {
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  tags?: string[];
  category?: string; // なければパスから指定
  draft?: boolean;
};

export type Article = Frontmatter & {
  key: string; // '2025/tech/slug'
  slug: string; // 'slug'
  year: string; // '2025'
  category: string; // 'tech' など
};

// 全てのMDをビルド時に読み込む
const modules = import.meta.glob('$lib/content/articles/**/*.md', { eager: true });

const PROD = process.env.NODE_ENV === 'production';

type MdModule = { metadata?: Frontmatter };
const toArticle = (path: string, mod: MdModule): Article | null => {
  // 例: /src/lib/content/articles/2025/tech/hello.md
  const md = path.match(/articles\/(\d{4})\/([^/]+)\/([^/]+)\.md$/);
  if (!md) return null;
  const [, year, cat, slug] = md;

  const meta = (mod?.metadata ?? {}) as Frontmatter;
  if (!meta.title || !meta.date) return null;
  if (PROD && meta.draft) return null;

  return {
    key: `${year}/${meta.category ?? cat}/${slug}`,
    slug,
    year,
    category: meta.category ?? cat,
    ...meta,
  };
};

const allArticles: Article[] = Object.entries(modules)
  .map(([p, m]) => toArticle(p, m as MdModule))
  .filter((x): x is Article => x !== null)
  .sort((a, b) => (a.date < b.date ? 1 : -1)); // 新しい順

const byCategory = (category: string): Article[] =>
  allArticles.filter((a) => a.category === category);

export { byCategory, allArticles };
