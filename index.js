(function () {
  const pluginId = "bf2042-portal-navigation-plugin";
  const plugin = BF2042Portal.Plugins.getPlugin(pluginId);

  let pluginData = { scrollableWorkspace: false };

  function toggleScrollableWorkspace() {
    _Blockly.getMainWorkspace().options.moveOptions.wheel = !_Blockly.getMainWorkspace()
      .options.moveOptions.wheel;
    pluginData.scrollableWorkspace = _Blockly.getMainWorkspace().options.moveOptions.wheel;
    logInfo(
      "Scrollable Workspace set to " +
        (pluginData.scrollableWorkspace === true ? "TRUE" : "FALSE")
    );
    try {
      BF2042Portal.Shared.saveToLocalStorage(pluginId, pluginData);
      logInfo("Saved current setting in local storage.");
    } catch (error) {
      logError("Couldn't save current setting in local storage.", error);
    }
  }

  function buildJumpToMenu() {
    let jumpToMenu = plugin.createMenu(
      "jumpToMenu",
      "Jump To",
      _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE
    );
    plugin.registerMenu(jumpToMenu);
    jumpToMenu.options = [];

    let modBlocks = _Blockly
      .getMainWorkspace()
      .getBlocksByType("modBlock", false);
    let ruleBlocks = _Blockly
      .getMainWorkspace()
      .getBlocksByType("ruleBlock", true);
    let subroutines = _Blockly
      .getMainWorkspace()
      .getBlocksByType("subroutineBlock", false)
      .sort((a, b) =>
        a
          .getFieldValue("SUBROUTINE_NAME")
          .localeCompare(b.getFieldValue("SUBROUTINE_NAME"))
      );

    let blockIndex = 1;
    modBlocks.forEach((block) => {
      let blockItem = {
        displayText: blockIndex + " Mod",
        preconditionFn: () => "enabled",
        callback: () => {
          jumpTo(block);
        },
        scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
        id: block.id,
        weight: blockIndex,
      };
      jumpToMenu.options.push("items." + blockItem.id);
      plugin.registerItem(blockItem);
      blockIndex += 1;
    });
    blockIndex = 1;

    if (ruleBlocks.length > 0) {
      let rulesMenu = plugin.createMenu(
        "rulesMenu",
        "Rules",
        _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE
      );
      plugin.registerMenu(rulesMenu);
      rulesMenu.options = [];
      ruleBlocks.forEach((block) => {
        let blockItem = {
          displayText: blockIndex + " " + block.getFieldValue("NAME"),
          preconditionFn: () => "enabled",
          callback: () => {
            jumpTo(block);
          },
          scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
          id: block.id,
          weight: blockIndex,
        };
        rulesMenu.options.push("items." + blockItem.id);
        plugin.registerItem(blockItem);
        blockIndex += 1;
      });
      blockIndex = 1;
      jumpToMenu.options.push("menus." + rulesMenu.id);
    }

    if (subroutines.length > 0) {
      let subroutinesMenu = plugin.createMenu(
        "subroutineMenu",
        "Subroutines",
        _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE
      );
      plugin.registerMenu(subroutinesMenu);
      subroutinesMenu.options = [];
      subroutines.forEach((block) => {
        let blockItem = {
          displayText: block.getFieldValue("SUBROUTINE_NAME"),
          preconditionFn: () => "enabled",
          callback: () => {
            jumpTo(block);
          },
          scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
          id: block.id,
          weight: blockIndex,
        };
        subroutinesMenu.options.push("items." + blockItem.id);
        plugin.registerItem(blockItem);
        blockIndex += 1;
      });
      blockIndex = 1;
      jumpToMenu.options.push("menus." + subroutinesMenu.id);
    }

    jumpToMenu.weight = 99;

    if (_Blockly.ContextMenuRegistry.registry.getItem(jumpToMenu.id)) {
      _Blockly.ContextMenuRegistry.registry.unregister(jumpToMenu.id);
    }
    _Blockly.ContextMenuRegistry.registry.register(jumpToMenu);
  }

  function jumpTo(block) {
    var mWs = _Blockly.getMainWorkspace();
    var xy = block.getRelativeToSurfaceXY();
    var m = mWs.getMetrics();

    mWs.scrollbar.set(
      xy.x * mWs.scale + m.viewWidth * 0.4,
      xy.y * mWs.scale + m.viewHeight * 0.4
    );

    block.select();
  }

  const toggleScrollItem = {
    displayText: "Toggle Scroll Workspace",
    preconditionFn: () => "enabled",
    callback: toggleScrollableWorkspace,
    scopeType: _Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
    id: "toggleScrollItem",
    weight: 99,
  };

  plugin.initializeWorkspace = function () {
    logInfo("Initializing...");
    try {
      let loadedData = BF2042Portal.Shared.loadFromLocalStorage(pluginId);
      if (loadedData) {
        pluginData = loadedData;
      }
    } catch (exception) {
      logError("Couldn't load settings from local storage!", exception);
    }
    try {
      _Blockly.getMainWorkspace().options.moveOptions.wheel =
        pluginData.scrollableWorkspace;
      if (_Blockly.ContextMenuRegistry.registry.getItem(toggleScrollItem.id)) {
        _Blockly.ContextMenuRegistry.registry.unregister(toggleScrollItem.id);
      }
      _Blockly.ContextMenuRegistry.registry.register(toggleScrollItem);
      buildJumpToMenu();
      logInfo("Initialized!");
    } catch (exception) {
      logError("Failed to initialize!", exception);
    }
  };

  function getLogPrefix(messageType) {
    return "[" + pluginId + "] [" + messageType + "] - ";
  }

  function logInfo(message, data) {
    console.info(getLogPrefix("INFO") + message, data);
  }

  function logWarning(message, data) {
    console.warn(getLogPrefix("WARNING") + message, data);
  }

  function logError(message, data) {
    console.error(getLogPrefix("ERROR") + message, data);
  }
})();
