import Team from '@/components/footer/team';

describe('Footer team', () => {
  it('should match the snapshot', () => {
    const team = new Team();
    const element = team.getElement();

    expect(element).toMatchSnapshot();
  });
});
