```jsx
<Popper
    trigger={<Icon type="more-vertical" />}
  >
  {close => (
     <Menu style={{ width: 200 }} onClick={close}>
      <MenuHeader>Account</MenuHeader>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Friends</MenuItem>
      <MenuItem>Notifications</MenuItem>
      <MenuDivider />
      <MenuItem>Settings</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  )}
</Popper>
```