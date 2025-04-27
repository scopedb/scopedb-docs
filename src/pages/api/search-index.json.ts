import {getCollection} from 'astro:content';
import type {SearchResult} from '@/types/search';

export async function GET() {
  const referenceEntries = await getCollection('reference');
  const blogEntries = await getCollection('blogs');

  const documents: SearchResult[] = [
    ...referenceEntries.map(entry => ({
      id: `reference-${entry.id}`,
      title: entry.data.title || entry.id,
      content: entry.body,
      url: `/reference/${entry.slug}`,
      collection: 'reference',
    })),
    ...blogEntries.map(entry => ({
      id: `blogs-${entry.id}`,
      title: entry.data.title,
      content: entry.body,
      url: `/posts/${entry.slug}`,
      collection: 'blogs',
    })),
  ];

  return new Response(
    JSON.stringify(documents),
    {headers: {'Content-Type': 'application/json'}}
  );
}
