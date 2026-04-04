import { getApp, groupedRegistry, registry, IdeationApp } from './ideation-registry';

describe('getApp', () => {
  it('returns the correct entry for a known id', () => {
    const app = getApp('google');
    expect(app).toBeDefined();
    expect(app?.id).toBe('google');
  });

  it('returns undefined for an unknown id', () => {
    expect(getApp('does-not-exist')).toBeUndefined();
  });
});

describe('groupedRegistry', () => {
  it('groups apps by their group field', () => {
    const groups = groupedRegistry();
    const groupNames = Object.keys(groups);
    expect(groupNames.length).toBeGreaterThan(0);
    for (const [groupName, apps] of Object.entries(groups)) {
      expect(typeof groupName).toBe('string');
      expect(apps.length).toBeGreaterThan(0);
      apps.forEach((app) => expect(app.group).toBe(groupName));
    }
  });

  it('uses "Other" as fallback for entries without a group', () => {
    const appWithoutGroup = { id: 'test', name: 'Test', description: 'desc', url: '/apps/test' } as IdeationApp;
    const original = [...registry];
    registry.push(appWithoutGroup);
    const groups = groupedRegistry();
    expect(groups['Other']).toBeDefined();
    registry.splice(original.length);
  });
});

describe('registry integrity', () => {
  it('has no duplicate id values', () => {
    const ids = registry.map((a) => a.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('all entries satisfy the IdeationApp interface shape', () => {
    for (const app of registry) {
      expect(typeof app.id).toBe('string');
      expect(typeof app.name).toBe('string');
      expect(typeof app.description).toBe('string');
      expect(typeof app.group).toBe('string');
      expect(typeof app.url).toBe('string');
      if (app.devUrl !== undefined) {
        expect(typeof app.devUrl).toBe('string');
      }
    }
  });
});
