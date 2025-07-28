import { ToWholeNumberPipe } from './to-whole-number-pipe';

describe('ToWholeNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ToWholeNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
