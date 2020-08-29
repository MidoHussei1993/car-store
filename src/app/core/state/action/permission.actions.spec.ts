import * as PermissionActions from './permission.actions';

describe('Permission', () => {
  it('should create an instance', () => {
    expect(new PermissionActions.LoadPermissions()).toBeTruthy();
  });
});
