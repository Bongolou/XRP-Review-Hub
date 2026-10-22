import { readdir } from 'node:fs/promises';
import path from 'node:path';

/** Discover preview sources without parsing glob patterns or following symlinks. */
export async function discoverMockupFiles(directory: string): Promise<string[]> {
  async function walk(current: string, relative: string): Promise<string[]> {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch (error) {
      // The preview directory may not exist until the first mockup is created.
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw error;
    }

    const files = await Promise.all(entries.map(async (entry) => {
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) return [];
      const name = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isDirectory()) return walk(path.join(current, entry.name), name);
      return entry.isFile() && entry.name.endsWith('.tsx') ? [name] : [];
    }));
    return files.flat();
  }

  return (await walk(directory, '')).sort();
}
