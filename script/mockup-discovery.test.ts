import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { discoverMockupFiles } from '../artifacts/mockup-sandbox/mockupDiscovery';

describe('mockup file discovery without glob dependencies', () => {
  let root: string;

  beforeEach(async () => {
    root = await mkdtemp(path.join(tmpdir(), 'mockup-discovery-'));
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  async function file(name: string) {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, '');
  }

  it('finds nested TSX sources in deterministic order with portable paths', async () => {
    await file('z/Card.tsx');
    await file('a/Nested.tsx');
    await file('Root.tsx');
    await file('a/helper.ts');
    expect(await discoverMockupFiles(root)).toEqual([
      'Root.tsx', 'a/Nested.tsx', 'z/Card.tsx',
    ]);
  });

  it('excludes underscore-prefixed and hidden files and directories', async () => {
    await file('_private/Secret.tsx');
    await file('.hidden/Secret.tsx');
    await file('public/_Helper.tsx');
    await file('public/.Hidden.tsx');
    await file('public/Visible.tsx');
    expect(await discoverMockupFiles(root)).toEqual(['public/Visible.tsx']);
  });

  it('does not follow symlinks or recurse through directory cycles', async () => {
    await file('Real.tsx');
    await symlink(root, path.join(root, 'cycle'));
    await symlink(path.join(root, 'Real.tsx'), path.join(root, 'Link.tsx'));
    expect(await discoverMockupFiles(root)).toEqual(['Real.tsx']);
  });

  it('returns no files before the preview directory exists', async () => {
    expect(await discoverMockupFiles(path.join(root, 'missing'))).toEqual([]);
  });

  it('does not suppress filesystem errors other than missing directories', async () => {
    await file('not-a-directory');
    await expect(discoverMockupFiles(path.join(root, 'not-a-directory')))
      .rejects.toMatchObject({ code: 'ENOTDIR' });
  });
});
