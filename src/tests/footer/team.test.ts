import { describe, expect, it } from 'vitest';

import Team from '@/components/footer/team';

describe('Snapshot test of team section in footer', () => {
  it('should match the team section snapshot', () => {
    const team = new Team();
    const element = team.getElement();

    expect(element).toMatchSnapshot();
  });
});
