import incrementAsync from './sagas';

describe('incrementAsync Saga test', () => {
  const gen = incrementAsync();
  gen.next();
  // now what ?
  expect(gen.next()).toEqual({ example: 'elo' });
});
