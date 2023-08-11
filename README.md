# BF2042 Portal Navigation Plugin

## About

This is a plugin for the [Battlefield Portal Browser Extension](https://github.com/LennardF1989/BF2042-Portal-Extensions) which adds the following features for navigational help:

* Change scroll behaviour to literally scroll instead of zooming (zooming is still possible by using `CTRl + Mouse Wheel`
* `Jump To` option, with which you can directly jump to a specific rule or subroutine

## Install

1. Install the [Battlefield Portal Browser Extension](https://github.com/LennardF1989/BF2042-Portal-Extensions)
   - Chrome: https://chrome.google.com/webstore/detail/bf2042-portal-extensions/ojegdnmadhmgfijhiibianlhbkepdhlj
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/bf2042-portal-extensions/
2. Pin the extension to be able to click on it
3. Click on the extension icon and a popup should appear
4. Click on `official extension manifest` in the text to automatically fill the "Manifest URL" and "Version" input.
5. Click confirm
6. Reload any Rules Editor Page and right-click in the Workspace
7. A context menu should appear which shows an `Options >` item (if not, reload the page again and check that the Portal browser extension is active)
8. Click on `Options >` and then `Plugin Manager`
9. In the Plugin Manager click on `Add Plugin` on the top-right corner
10. Enter the **Plugin Manifest URL** below and click `Review`, then click `Confirm` after seeing the sourcecode of the plugin.
11. After the plugin was added to the list of plugins, you need to reload the rules editor page in order to activate it

**Plugin manifest.json URL**
```txt
https://the0zzy.github.io/bf2042-portal-navigation-plugin/manifest.json
```

## How to use

### Change Scroll Behaviour

Right-click in the rules editor workspace and click the `Toogle Scroll Workspace` item.  
Now you should be able to literally scrolle the workspace vertically and horizontally with the mouse-wheel.  
In order to zoom in and out, just press the `CTRL` key + Mouse-Wheel

### Jump-To

In order to jump to a certain rule, subroutine or the top of the mod block, right-click in the rules editor workspace and select the `Jump To` item.  
The submenus will hold the single elements to which you can jump.
