# HOW TO CHANGE ICON

1. run `yarn pkg` first, it'll fail and this time pkg will download executable depending on `package.json`.pkg.targets, change directory to `.pkg-cache/v2.x` and we will find the executable like `fetched-vxxx-xxx-xxx`

2. unzip `res/resource_hacker.zip`, copy `./pkg-cache/v2.x/fetched-vxxx-xxx-xxx` to directory `res/resource_hacker`

3. open cmd.exe, execute the following command like
`ResourceHacker.exe -open fetched-v10.15.3-win-x86 -save fetched-v10.15.3-win-x86-icon -action addoverwrite -res Logo.ico -mask ICONGROUP,1`

4. delete `fetched-vxxx-xxx-xxx`, rename `fetched-vxxx-xxx-xxx-ico` to the original one, and copy back to `./pkg-cache/v2.x/` cover the original one.

5. execute `yarn pkg` again, and this time you'll get what you want.
